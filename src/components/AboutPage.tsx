import React from "react";
import {
  Heart,
  Users,
  Globe,
  Award,
  Target,
  Zap,
  Shield,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { motion } from "framer-motion";

export function AboutPage() {
  const { state } = useApp();

  const stats = [
    {
      label: "Lives Saved",
      value: "12,847",
      icon: Heart,
      color: "text-red-500",
    },
    {
      label: "Active Volunteers",
      value: "3,421",
      icon: Users,
      color: "text-green-500",
    },
    {
      label: "Cities Covered",
      value: "250+",
      icon: MapPin,
      color: "text-blue-500",
    },
    {
      label: "Response Time",
      value: "< 8 min",
      icon: Clock,
      color: "text-purple-500",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion First",
      description:
        "Every action we take is driven by genuine care for human life and wellbeing.",
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description:
        "Speed saves lives. We prioritize quick, efficient emergency response systems.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      icon: Users,
      title: "Community Unity",
      description:
        "Bringing people together to support each other in times of greatest need.",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      icon: Shield,
      title: "Safety & Trust",
      description:
        "Maintaining the highest standards of safety and reliability in all operations.",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "Emergency medicine physician with 15+ years of disaster response experience.",
      image:
        "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Former Google engineer specializing in real-time systems and crisis technology.",
      image:
        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Lisa Rodriguez",
      role: "Head of Operations",
      bio: "Red Cross veteran with expertise in volunteer coordination and emergency logistics.",
      image:
        "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "David Kim",
      role: "Head of Safety",
      bio: "Former FEMA coordinator ensuring platform safety and compliance standards.",
      image:
        "https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "HelpHub Founded",
      description:
        "Started as a response to increasing natural disasters and the need for better coordination.",
    },
    {
      year: "2021",
      title: "First Major Deployment",
      description:
        "Successfully coordinated relief efforts during Hurricane Delta, saving over 500 lives.",
    },
    {
      year: "2022",
      title: "National Expansion",
      description:
        "Expanded to cover 50+ cities across the United States with 1,000+ volunteers.",
    },
    {
      year: "2023",
      title: "AI Integration",
      description:
        "Launched AI-powered safety recommendations and predictive disaster response.",
    },
    {
      year: "2024",
      title: "Global Reach",
      description:
        "Extended operations internationally, now serving 250+ cities worldwide.",
    },
    {
      year: "2025",
      title: "Next Generation Platform",
      description:
        "Launching advanced real-time coordination with enhanced mobile capabilities.",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-20 blur-lg"></div>
              <Heart className="relative h-16 w-16 text-red-500" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            About HelpHub
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              state.theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We're on a mission to revolutionize disaster response by connecting
            communities, empowering volunteers, and saving lives through
            technology.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`text-center p-6 rounded-xl glow-primary ${
                  state.theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      state.theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`p-8 rounded-xl mb-16 glow-blue ${
            state.theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="text-center mb-8">
            <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p
                className={`text-lg mb-4 ${
                  state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                HelpHub was born from the recognition that in times of crisis,
                the greatest resource we have is each other. Natural disasters
                are becoming more frequent and severe, but our response systems
                haven't kept pace with the need.
              </p>
              <p
                className={`text-lg ${
                  state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                We bridge the gap between those who need help and those ready to
                provide it, using real-time technology to coordinate rapid,
                effective disaster response at the community level.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6303773/pexels-photo-6303773.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Disaster response team"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              These core principles guide everything we do and every decision we
              make.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-6 rounded-xl text-center ${
                    state.theme === "dark" ? "bg-gray-800" : "bg-white"
                  } shadow-lg`}
                >
                  <div
                    className={`w-16 h-16 rounded-full ${value.bgColor} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p
                    className={`text-sm ${
                      state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Passionate professionals dedicated to making disaster response
              more effective and accessible.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-xl text-center ${
                  state.theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-500 font-medium mb-3">{member.role}</p>
                <p
                  className={`text-sm ${
                    state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              From a small idea to a global platform saving lives every day.
            </p>
          </div>
          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
                state.theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-xl ${
                        state.theme === "dark" ? "bg-gray-800" : "bg-white"
                      } shadow-lg`}
                    >
                      <div className="text-2xl font-bold text-blue-500 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {milestone.title}
                      </h3>
                      <p
                        className={`${
                          state.theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white"
        >
          <Globe className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Together, we can build more resilient communities and save more
            lives. Every volunteer makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Become a Volunteer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-red-500 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Partner With Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
