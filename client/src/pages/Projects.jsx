import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Code, ShoppingCart, LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";

const projects = [
  {
    id: 1,
    title: "Project One",
    description:
      "A modern web application built with React and Tailwind CSS. It features a responsive design, user authentication, and real-time data updates.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    link: "/projects/1",
    icon: <Code className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
    tags: ["React", "Tailwind", "Authentication"],
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "An e-commerce platform developed using Next.js and Node.js. It includes product listings, a shopping cart, and secure payment integration.",
    image: "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    link: "/projects/2",
    icon: <ShoppingCart className="w-6 h-6 text-green-500 dark:text-green-400" />,
    tags: ["Next.js", "Node.js", "Payments"],
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "A mobile-friendly portfolio website designed for creatives. Built with Gatsby and GraphQL, it showcases work samples and client testimonials.",
    image: "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    link: "/projects/3",
    icon: <LayoutDashboard className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
    tags: ["Gatsby", "GraphQL", "Portfolio"],
  },
  {
    id: 4,
    title: "Project Three",
    description:
      "A mobile-friendly portfolio website designed for creatives. Built with Gatsby and GraphQL, it showcases work samples and client testimonials.",
    image: "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    link: "/projects/3",
    icon: <LayoutDashboard className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
    tags: ["Gatsby", "GraphQL", "Portfolio"],
  },
];

export default function ProjectsPage() {
  const { t } = useTranslation();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <motion.div
        className="max-w-5xl mx-auto space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="text-center space-y-4" {...fadeIn}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t("Our Projects")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            {t("Explore Innovative Solutions")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, index) => (
            <motion.div key={project.id} {...fadeIn} transition={{ delay: 0.2 * index }}>
              <Card className="h-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-xl transition duration-300">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    {project.icon}
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="px-3 py-1 text-sm sm:text-base border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    to={project.link}
                    className="inline-block mt-4 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-300"
                  >
                    {t("Learn More")}
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12" {...fadeIn} transition={{ delay: 0.6 }}>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            {t("discoverMoreProjects")}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
