import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, GitBranch, Trophy, Volleyball } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Spring Boot",
    "TailwindCSS",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="text-center space-y-4" {...fadeIn}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t("codingAndFootball")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            {t("craftingDigitalExperiences")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <Card className="h-full bg-white dark:bg-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    {t("programmingJourney")}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("passionateDeveloper")}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="px-3 py-1 text-sm sm:text-base border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <Card className="h-full bg-white dark:bg-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Volleyball className="w-6 h-6 text-green-500 dark:text-green-400" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    {t("footballAnalytics")}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("footballAnalysis")}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {t("matchAnalysis")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {t("tacticalBreakdowns")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div className="text-center mt-12" {...fadeIn} transition={{ delay: 0.6 }}>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            {t("connectMessage")}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
