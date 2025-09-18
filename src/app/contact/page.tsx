"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  details: string[];
  link?: string;
  color: string;
  bgColor: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: PhoneIcon,
    title: "Phone Support",
    details: ["+91 9730636550", "Mon-Sat 9AM-8PM"],
    link: "tel:+919730636550",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  {
    icon: EnvelopeIcon,
    title: "Email Us",
    details: ["support@graduate.in", "24/7 Support"],
    link: "mailto:support@graduate.in",
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
  },
  {
    icon: MapPinIcon,
    title: "Our Location",
    details: ["Shirdi, Maharashtra", "India - 423109"],
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
  },
  {
    icon: ClockIcon,
    title: "Business Hours",
    details: ["Mon-Sat: 9AM-8PM", "Sun: 10AM-6PM"],
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
  },
];

const subjects = [
  {
    value: "General Inquiry",
    icon: QuestionMarkCircleIcon,
    color: "text-blue-500",
  },
  {
    value: "Product Information",
    icon: SparklesIcon,
    color: "text-purple-500",
  },
  {
    value: "Franchise Opportunity",
    icon: BuildingOfficeIcon,
    color: "text-green-500",
  },
  {
    value: "Order Support",
    icon: ChatBubbleLeftRightIcon,
    color: "text-orange-500",
  },
  { value: "Partnership", icon: UserIcon, color: "text-indigo-500" },
  { value: "Feedback", icon: CheckCircleIcon, color: "text-pink-500" },
  { value: "Other", icon: QuestionMarkCircleIcon, color: "text-gray-500" },
];

const faqs = [
  {
    question: "What are your business hours?",
    answer: "Monday-Saturday: 9AM-8PM, Sunday: 10AM-6PM. We're here to help!",
    icon: ClockIcon,
  },
  {
    question: "Do you offer franchise opportunities?",
    answer:
      "Yes! We have exciting franchise opportunities. Visit our franchise page for detailed information.",
    icon: BuildingOfficeIcon,
  },
  {
    question: "How can I place a bulk order?",
    answer:
      "Contact us directly for special bulk pricing and custom solutions for your business needs.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    question: "What's your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee on all our premium tea products.",
    icon: CheckCircleIcon,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch('/api/backend/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          source: 'contact'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: result.message || "Failed to send your message. Please try again.",
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus({
        type: "error",
        message:
          "Sorry, there was an error sending your message. Please try again or contact us directly.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900/10">
      {/* FIXED: Hero Section with proper top padding */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-32 left-10 w-20 h-20 bg-amber-200/20 rounded-full blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-52 right-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <SparklesIcon className="w-4 h-4" />
              We'd love to hear from you
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Get in{" "}
              <span className="relative inline-block">
                <span className="text-amber-600 dark:text-amber-400">
                  Touch
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Have questions about our premium tea products or franchise
              opportunities?
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                {" "}
                Let's start a conversation.
              </span>
            </p>

            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { number: "24hrs", label: "Response Time" },
                { number: "1000+", label: "Happy Customers" },
                { number: "99%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FIXED: Contact Info Cards with proper spacing */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
                className="group cursor-pointer"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 ${info.bgColor} dark:border-gray-700 p-6 text-center overflow-hidden transition-all duration-300 h-full`}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <info.icon className="w-full h-full" />
                  </div>

                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-700 rounded-xl shadow-md mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <info.icon
                      className={`w-7 h-7 ${info.color} dark:text-gray-300`}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {info.title}
                  </h3>

                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-gray-600 dark:text-gray-300 text-sm"
                      >
                        {info.link && idx === 0 ? (
                          <a
                            href={info.link}
                            className={`hover:${info.color} dark:hover:text-amber-400 transition-colors font-medium`}
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>

                  {info.link && (
                    <motion.div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRightIcon
                        className={`w-5 h-5 mx-auto ${info.color}`}
                      />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FIXED: Main Contact Section with increased spacing */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 relative overflow-hidden">
                {/* Form Header */}
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Fill out the form and we'll get back to you within 24
                      hours
                    </p>
                  </div>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-2 transition-colors ${
                          focusedField === "name"
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                          placeholder="Your full name"
                        />
                        <UserIcon
                          className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                            focusedField === "name"
                              ? "text-amber-500"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="relative">
                      <label
                        htmlFor="phone"
                        className={`block text-sm font-medium mb-2 transition-colors ${
                          focusedField === "phone"
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                          placeholder="Your phone number"
                        />
                        <PhoneIcon
                          className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                            focusedField === "phone"
                              ? "text-amber-500"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 transition-colors ${
                        focusedField === "email"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                      <EnvelopeIcon
                        className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                          focusedField === "email"
                            ? "text-amber-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Enhanced Subject Field */}
                  <div className="relative">
                    <label
                      htmlFor="subject"
                      className={`block text-sm font-medium mb-2 transition-colors ${
                        focusedField === "subject"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-2 transition-colors ${
                        focusedField === "message"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 resize-vertical"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-amber-400 disabled:to-orange-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status.type === "loading" ? (
                      <>
                        <motion.svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </motion.svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Enhanced Status Message */}
                <AnimatePresence>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className={`mt-6 p-4 rounded-xl border flex items-start ${
                        status.type === "success"
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200"
                          : status.type === "error"
                            ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200"
                            : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200"
                      }`}
                    >
                      {status.type === "success" ? (
                        <CheckCircleIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                      ) : status.type === "error" ? (
                        <ExclamationTriangleIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                      ) : null}
                      <p className="text-sm font-medium">{status.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* FIXED: Sidebar with better spacing */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <SparklesIcon className="w-5 h-5 text-amber-500 mr-2" />
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <motion.a
                    href="tel:+919730636550"
                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <PhoneIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-900 dark:text-white font-semibold block">
                        Call Now
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        +91 9730636550
                      </span>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-blue-500 ml-auto group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="https://wa.me/9730636550"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/30 dark:hover:to-green-700/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-900 dark:text-white font-semibold block">
                        WhatsApp
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        Chat with us
                      </span>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-green-500 ml-auto group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="mailto:support@graduate.in"
                    className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <EnvelopeIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-900 dark:text-white font-semibold block">
                        Email Us
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        support@graduate.in
                      </span>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-purple-500 ml-auto group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>

              {/* Enhanced FAQ */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-amber-500 mr-2" />
                  Frequently Asked
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                        className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <faq.icon className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" />
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {faq.question}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2"
                        >
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 pl-11">
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
