import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  AlertCircle,
  CheckCircle,
  Globe,
  Heart,
  Users,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function ContactPage() {
  const { state } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "general",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      description: "24/7 emergency assistance",
      contact: "911",
      action: "tel:911",
      urgent: true,
    },
    {
      icon: Mail,
      title: "General Support",
      description: "For non-urgent inquiries",
      contact: "support@helphub.org",
      action: "mailto:support@helphub.org",
      urgent: false,
    },
    {
      icon: Phone,
      title: "Volunteer Coordination",
      description: "Join our volunteer network",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      urgent: false,
    },
    {
      icon: Globe,
      title: "Media & Press",
      description: "For media inquiries",
      contact: "press@helphub.org",
      action: "mailto:press@helphub.org",
      urgent: false,
    },
  ];

  const officeLocations = [
    {
      name: "Global Headquarters",
      address: "123 Relief Street, Crisis City, CC 12345",
      phone: "+1 (555) 100-0001",
      hours: "24/7 Emergency Operations",
    },
    {
      name: "Regional Office - East",
      address: "456 Hope Avenue, Disaster Town, DT 67890",
      phone: "+1 (555) 100-0002",
      hours: "Mon-Fri: 8AM-6PM EST",
    },
    {
      name: "Regional Office - West",
      address: "789 Aid Boulevard, Relief City, RC 54321",
      phone: "+1 (555) 100-0003",
      hours: "Mon-Fri: 8AM-6PM PST",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        state.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We're here to help 24/7. Whether you need immediate assistance or
              have questions about our platform, our team is ready to support
              you.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-500">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">System Operational</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-500">
                <Users className="h-5 w-5" />
                <span className="font-medium">24/7 Support Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between text-white">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <AlertCircle className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Emergency Situation?</h3>
                  <p className="text-sm opacity-90">
                    For immediate life-threatening emergencies, call 911
                    immediately
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="tel:911"
                  className="bg-white text-red-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Call 911
                </a>
                <a
                  href="/emergency"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-red-500 transition-colors"
                >
                  Request Help
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Contact Methods
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className={`relative p-6 rounded-xl border transition-all duration-300 glow-primary ${
                    method.urgent
                      ? "bg-gradient-to-br from-red-500 to-orange-500 text-white border-transparent"
                      : state.theme === "dark"
                      ? "bg-gray-800 border-gray-700 hover:border-red-500"
                      : "bg-white border-gray-200 hover:border-red-500 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`p-3 rounded-lg ${
                        method.urgent
                          ? "bg-white/20"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{method.title}</h3>
                      <p
                        className={`text-sm ${
                          method.urgent
                            ? "text-white/80"
                            : state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {method.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href={method.action}
                    className={`block font-medium hover:underline ${
                      method.urgent ? "text-white" : "text-red-500"
                    }`}
                  >
                    {method.contact}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        state.theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white focus:border-red-500"
                          : "bg-white border-gray-300 focus:border-red-500"
                      } focus:outline-none`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        state.theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white focus:border-red-500"
                          : "bg-white border-gray-300 focus:border-red-500"
                      } focus:outline-none`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type of Inquiry
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      state.theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white focus:border-red-500"
                        : "bg-white border-gray-300 focus:border-red-500"
                    } focus:outline-none`}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="volunteer">Volunteer Interest</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="media">Media/Press</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      state.theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white focus:border-red-500"
                        : "bg-white border-gray-300 focus:border-red-500"
                    } focus:outline-none`}
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                      state.theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white focus:border-red-500"
                        : "bg-white border-gray-300 focus:border-red-500"
                    } focus:outline-none`}
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Our Offices</h3>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <motion.div
                    key={office.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-6 rounded-lg border glow-blue ${
                      state.theme === "dark"
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-red-100 text-red-500 rounded-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2">
                          {office.name}
                        </h4>
                        <p
                          className={`mb-2 ${
                            state.theme === "dark"
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {office.address}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-red-500" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-red-500" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className={`mt-8 p-6 rounded-lg glow-green ${
                  state.theme === "dark" ? "bg-gray-800" : "bg-blue-50"
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="h-6 w-6 text-red-500" />
                  <h4 className="font-bold text-lg">Our Commitment</h4>
                </div>
                <p
                  className={`text-sm ${
                    state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  We're committed to responding to all inquiries within 24
                  hours. For emergency situations, please use our emergency
                  hotline or the emergency request feature for immediate
                  assistance.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
