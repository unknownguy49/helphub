import { Link } from "react-router-dom";
import {
  Heart,
  Phone,
  Twitter,
  Facebook,
  Instagram,
  Github,
  ArrowUp,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { motion } from "framer-motion";

export function Footer() {
  const { state } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    platform: [
      { label: "Live Map", path: "/map" },
      { label: "Emergency Request", path: "/emergency" },
      { label: "Volunteer", path: "/volunteer" },
      { label: "Safety Resources", path: "/safety" },
      { label: "Training", path: "/training" },
      { label: "Analytics", path: "/analytics" },
    ],
    company: [
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
  };

  const socialLinks = [
    {
      icon: Twitter,
      href: "https://x.com/UnknownGuy149",
      label: "X (Twitter)",
    },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    {
      icon: Instagram,
      href: "https://instagram.com/_.unknownguy49._/",
      label: "Instagram",
    },
    { icon: Github, href: "https://github.com/unknownguy49", label: "GitHub" },
  ];

  return (
    <footer
      className={`relative overflow-hidden ${
        state.theme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      } border-t`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center space-x-2 group mb-4">
                <div className="relative">
                  <Heart className="h-8 w-8 text-red-500 transition-transform group-hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="font-bold text-xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  HelpHub
                </div>
              </Link>
              <p
                className={`text-sm mb-4 ${
                  state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Connecting communities in times of crisis. Real-time disaster
                relief coordination platform.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span
                  className={
                    state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  System Operational
                </span>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`text-sm transition-colors hover:text-red-500 ${
                          state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between text-white">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Phone className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">24/7 Emergency Hotline</h3>
                <p className="text-sm opacity-90">
                  For immediate assistance call 911 or use our platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="tel:911"
                className="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Call 911
              </a>
              <Link
                to="/emergency"
                className="border-2 border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors"
              >
                Request Help
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div
          className={`pt-8 border-t ${
            state.theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`text-sm mb-4 md:mb-0 ${
                state.theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © 2025 HelpHub. All rights reserved. Built with ❤️ for humanity.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                      state.theme === "dark"
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
}
