import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Clock,
  Shield,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Play,
  Star,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { getCurrentLocation } from "../utils/geolocation";
import { motion } from "framer-motion";

export function LandingPage() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Try to get user's location on page load
    getCurrentLocation()
      .then((location) => {
        dispatch({ type: "SET_USER_LOCATION", payload: location });
      })
      .catch((error) => {
        console.log("Location access denied or unavailable");
      });
  }, [dispatch]);

  const features = [
    {
      icon: MapPin,
      title: "Real-time Location Tracking",
      description:
        "Auto-detect your location and find nearby volunteers and relief centers instantly.",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Clock,
      title: "Instant Response",
      description:
        "Get help within minutes through our rapid volunteer matching system.",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "AI-powered safety tips and real-time weather alerts keep you informed.",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Users,
      title: "Community Network",
      description:
        "Connect with trained volunteers and relief organizations in your area.",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  const stats = [
    { label: "Lives Saved", value: "12,847", icon: Heart },
    { label: "Active Volunteers", value: "3,421", icon: Users },
    { label: "Response Time", value: "< 8 min", icon: Clock },
    { label: "Coverage Area", value: "250+ cities", icon: MapPin },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Hurricane Survivor",
      content:
        "HelpHub connected me with volunteers who helped evacuate my family within 20 minutes. They saved our lives.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      name: "Mike Chen",
      role: "Volunteer Coordinator",
      content:
        "The platform makes it so easy to coordinate relief efforts. We can help more people faster than ever before.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      name: "Lisa Rodriguez",
      role: "Emergency Responder",
      content:
        "Real-time updates and location tracking have revolutionized how we respond to disasters in our community.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 opacity-10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-lg"
                ></motion.div>
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="relative h-20 w-20 text-red-500" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
            >
              Help When You Need It Most
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              HelpHub connects you with local volunteers and relief services
              during natural disasters. Get emergency assistance or volunteer to
              help others in your community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/emergency"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span>I Need Help</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/volunteer"
                  className={`border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center space-x-2 ${
                    state.theme === "dark" ? "hover:bg-red-500" : ""
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Volunteer</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Location status */}
            {state.userLocation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  state.theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <Navigation className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">
                  Location detected - Ready to help
                </span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-16 ${
          state.theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 rounded-full ${
                        state.theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-red-500" />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-red-500 mb-2"
                  >
                    {stat.value}
                  </motion.div>
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How HelpHub Works
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our platform uses cutting-edge technology to connect those in need
              with those who can help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`p-6 rounded-xl transition-all duration-300 glow-primary ${
                    state.theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:shadow-xl"
                  } shadow-lg`}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p
                    className={`${
                      state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`py-20 ${
          state.theme === "dark" ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stories of Hope
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Real stories from people whose lives were changed by our
              community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-xl glow-orange ${
                  state.theme === "dark" ? "bg-gray-700" : "bg-white"
                } shadow-lg`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p
                  className={`${
                    state.theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of volunteers helping their communities during
              disasters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/map"
                  className="bg-white text-red-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-5 w-5" />
                  <span>View Live Map</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/safety"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Shield className="h-5 w-5" />
                  <span>Safety Resources</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
