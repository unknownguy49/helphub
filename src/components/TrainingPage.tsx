import React, { useState } from "react";
import {
  GraduationCap,
  Play,
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Video,
  FileText,
  Star,
  ArrowRight,
  Download,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { motion } from "framer-motion";

export function TrainingPage() {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [completedCourses, setCompletedCourses] = useState<string[]>([
    "course-1",
    "course-3",
  ]);

  const categories = [
    { id: "all", label: "All Courses", icon: BookOpen },
    { id: "emergency", label: "Emergency Response", icon: Award },
    { id: "medical", label: "Medical Aid", icon: Users },
    { id: "safety", label: "Safety Protocols", icon: CheckCircle },
    { id: "communication", label: "Communication", icon: Video },
  ];

  const courses = [
    {
      id: "course-1",
      title: "Emergency Response Fundamentals",
      category: "emergency",
      duration: "2 hours",
      level: "Beginner",
      rating: 4.8,
      students: 1247,
      description:
        "Learn the basics of emergency response, including assessment, prioritization, and initial response protocols.",
      modules: [
        "Introduction to Emergency Response",
        "Scene Assessment and Safety",
        "Communication Protocols",
        "Basic First Aid",
        "Evacuation Procedures",
      ],
      instructor: "Dr. Sarah Johnson",
      certificate: true,
      type: "video",
      thumbnail:
        "https://images.pexels.com/photos/6303773/pexels-photo-6303773.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "course-2",
      title: "Advanced Medical Response",
      category: "medical",
      duration: "4 hours",
      level: "Advanced",
      rating: 4.9,
      students: 892,
      description:
        "Comprehensive medical response training for serious emergencies and trauma situations.",
      modules: [
        "Trauma Assessment",
        "Advanced First Aid",
        "CPR and AED",
        "Shock Management",
        "Medical Equipment Usage",
      ],
      instructor: "Dr. Michael Chen",
      certificate: true,
      type: "video",
      thumbnail:
        "https://images.pexels.com/photos/6303776/pexels-photo-6303776.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "course-3",
      title: "Disaster Communication Systems",
      category: "communication",
      duration: "1.5 hours",
      level: "Intermediate",
      rating: 4.7,
      students: 634,
      description:
        "Master communication protocols and systems used during disaster response operations.",
      modules: [
        "Radio Communication",
        "Digital Communication Tools",
        "Emergency Codes",
        "Information Management",
        "Coordination Protocols",
      ],
      instructor: "Captain Lisa Rodriguez",
      certificate: true,
      type: "interactive",
      thumbnail:
        "https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "course-4",
      title: "Psychological First Aid",
      category: "medical",
      duration: "3 hours",
      level: "Intermediate",
      rating: 4.6,
      students: 1089,
      description:
        "Learn to provide psychological support and mental health first aid during crisis situations.",
      modules: [
        "Understanding Trauma",
        "Active Listening",
        "De-escalation Techniques",
        "Self-Care for Responders",
        "Referral Resources",
      ],
      instructor: "Dr. Amanda Foster",
      certificate: true,
      type: "video",
      thumbnail:
        "https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "course-5",
      title: "Safety Protocols and Risk Assessment",
      category: "safety",
      duration: "2.5 hours",
      level: "Beginner",
      rating: 4.5,
      students: 756,
      description:
        "Essential safety protocols and risk assessment techniques for emergency responders.",
      modules: [
        "Risk Assessment Framework",
        "Personal Protective Equipment",
        "Environmental Hazards",
        "Team Safety Protocols",
        "Incident Documentation",
      ],
      instructor: "Chief Robert Martinez",
      certificate: true,
      type: "document",
      thumbnail:
        "https://images.pexels.com/photos/6303787/pexels-photo-6303787.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "course-6",
      title: "Community Disaster Preparedness",
      category: "emergency",
      duration: "1 hour",
      level: "Beginner",
      rating: 4.4,
      students: 2156,
      description:
        "Help communities prepare for disasters through education and planning initiatives.",
      modules: [
        "Community Assessment",
        "Emergency Planning",
        "Resource Mapping",
        "Public Education",
        "Drill Organization",
      ],
      instructor: "Maria Gonzalez",
      certificate: false,
      type: "interactive",
      thumbnail:
        "https://images.pexels.com/photos/6303790/pexels-photo-6303790.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "interactive":
        return Play;
      case "document":
        return FileText;
      default:
        return BookOpen;
    }
  };

  const handleStartCourse = (courseId: string) => {
    // In a real app, this would navigate to the course content
    console.log("Starting course:", courseId);
  };

  const handleDownloadCertificate = (courseId: string) => {
    // In a real app, this would download the certificate
    console.log("Downloading certificate for:", courseId);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full"
            >
              <GraduationCap className="h-12 w-12 text-blue-500" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Volunteer Training Center
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              state.theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Build your skills and earn certifications to become a more effective
            disaster response volunteer
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              label: "Courses Completed",
              value: completedCourses.length,
              icon: CheckCircle,
              color: "text-green-500",
            },
            {
              label: "Total Courses",
              value: courses.length,
              icon: BookOpen,
              color: "text-blue-500",
            },
            {
              label: "Certificates Earned",
              value: completedCourses.filter(
                (id) => courses.find((c) => c.id === id)?.certificate
              ).length,
              icon: Award,
              color: "text-yellow-500",
            },
            {
              label: "Study Hours",
              value: "12.5",
              icon: Clock,
              color: "text-purple-500",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-xl shadow-lg glow-green ${
                  state.theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : state.theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => {
            const TypeIcon = getTypeIcon(course.type);
            const isCompleted = completedCourses.includes(course.id);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 glow-purple ${
                  state.theme === "dark" ? "bg-gray-800" : "bg-white"
                } ${isCompleted ? "ring-2 ring-green-500" : ""}`}
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        course.level
                      )}`}
                    >
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div
                      className={`p-2 rounded-full ${
                        state.theme === "dark"
                          ? "bg-gray-800/80"
                          : "bg-white/80"
                      } backdrop-blur-sm`}
                    >
                      <TypeIcon className="h-4 w-4" />
                    </div>
                  </div>
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-4 right-4 p-2 bg-green-500 rounded-full"
                    >
                      <CheckCircle className="h-5 w-5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {course.title}
                    </h3>
                  </div>

                  <p
                    className={`text-sm mb-4 line-clamp-2 ${
                      state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {course.description}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">
                      Instructor: {course.instructor}
                    </p>
                    <p className="text-xs text-gray-500">
                      {course.modules.length} modules
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {isCompleted ? (
                      <>
                        <button
                          onClick={() => handleStartCourse(course.id)}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <Play className="h-4 w-4" />
                          <span>Review</span>
                        </button>
                        {course.certificate && (
                          <button
                            onClick={() => handleDownloadCertificate(course.id)}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => handleStartCourse(course.id)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Start Course</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p
              className={`${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Try selecting a different category to see more courses.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
