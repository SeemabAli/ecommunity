import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  try {
    let imageUrl = '';
    if (req.body.image) {
      const uploadResponse = await uploadImage(req.body.image);
      imageUrl = uploadResponse.secure_url;
    }

    const slug = encodeURIComponent(
      req.body.title.toLowerCase().replace(/\s+/g, '-')
    );

    const newPost = new Post({
      ...req.body,
      image: imageUrl,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    // Allow admins to update any post, but users can only update their own
    if (!req.user.isAdmin && req.user.id !== post.userId.toString()) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }

    const updateData = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category || 'uncategorized',
    };

    if (req.body.image) {
      try {
        // Delete the existing Cloudinary image before uploading a new one
        if (post.image && post.image.includes('cloudinary')) {
          const publicId = post.image.split('/').pop().split('.')[0];
          await deleteImage(publicId);
        }

        const uploadResponse = await uploadImage(req.body.image);
        updateData.image = uploadResponse.secure_url;
      } catch (error) {
        console.error('Error handling image:', error);
        return next(errorHandler(500, 'Error uploading image'));
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filter = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const posts = await Post.find(filter)
      .populate("category", "name")
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(filter);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    // Allow admins to delete any post, but users can only delete their own
    if (!req.user.isAdmin && req.user.id !== post.userId.toString()) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }

    // Delete image from Cloudinary if it exists
    if (post.image && post.image.includes('cloudinary')) {
      const publicId = post.image.split('/').pop().split('.')[0];
      await deleteImage(publicId);
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};
