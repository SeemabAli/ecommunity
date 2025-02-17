import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusCircle, Pencil, Trash2, ChevronDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category/get');
        const data = await res.json();
        if (res.ok) {
          setCategories(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchCategories();
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!currentUser.isAdmin) {
    return <div className="p-4 text-center text-gray-500">You don't have permission to view this page.</div>;
  }

  const getCategoryName = (categoryId) => {
    if (!categoryId || typeof categoryId !== 'string') return 'Uncategorized';
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <div className="w-full p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light text-gray-800">Manage Posts</h1>
        <Link to="/create-post">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white transition-colors duration-300">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
          </Button>
        </Link>
      </div>

      {userPosts.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 w-full">
          <ScrollArea className="h-[600px] w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[180px] text-gray-600 font-normal">Date Updated</TableHead>
                  <TableHead className="text-gray-600 font-normal">Post Image</TableHead>
                  <TableHead className="text-gray-600 font-normal">Title</TableHead>
                  <TableHead className="text-gray-600 font-normal">Category</TableHead>
                  <TableHead className="text-right text-gray-600 font-normal">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userPosts.map((post) => (
                  <TableRow key={post._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="text-gray-700">
                      {new Date(post.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-12 object-cover rounded-md transition-transform duration-300 hover:scale-105"
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        className="font-medium text-teal-600 hover:text-teal-800 transition-colors duration-200"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full text-xs">
                        {getCategoryName(post.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/update-post/${post._id}`}>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-teal-600 transition-colors duration-200">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowModal(true);
                            setPostIdToDelete(post._id);
                          }}
                          className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          {showMore && (
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={handleShowMore}
                className="w-full text-gray-600 hover:text-teal-600 transition-colors duration-200"
              >
                Show More <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-white shadow-sm rounded-lg border border-gray-100">
          <p className="text-gray-600 text-lg">You have no posts yet.</p>
        </div>
      )}

      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowModal(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
