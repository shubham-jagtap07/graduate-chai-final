"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function FranchiseForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Distributorship",
    message: "",
  });
  const [status, setStatus] = useState<"" | "sending" | "success" | "error">(
    "",
  );
  const [isLoading, setIsLoading] = useState(false);

  // YouTube video IDs extracted from the URLs provided
  const youtubeVideos = [
    "PTWvki3-hhE",
    "NvmI9KkRywk",
    "Kd6Fjr3L8g4",
    "cjAUviwVm1M",
    "m5e2cl_jN0k",
    "eFcdl__eLIg",
    "fF9kfZEQRVY",
    "rP7QuktCbQ4",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("sending");
    try {
      // Save to DB via centralized inquiries endpoint (used by Admin > Inquiries)
      const res = await fetch('/api/backend/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim() || 'Franchise Opportunity',
          message: form.message.trim(),
          // Use same source as Contact to match existing DB constraints
          source: 'contact'
        })
      });

      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  // YouTube Video Component
  const YoutubeEmbed = ({ videoId }: { videoId: string }) => (
    <div className="flex-shrink-0 relative aspect-video w-80 sm:w-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`YouTube video ${videoId}`}
        className="rounded-lg"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/20">
      {/* Form Section */}
      <section className="flex items-center justify-center p-2 sm:p-4 pt-20 relative overflow-hidden">
        {/* subtle blobs */}
        <motion.div
          className="absolute -top-10 -left-10 h-40 w-40 rounded-full blur-[80px] bg-gradient-to-br from-amber-300/20 via-orange-300/10 to-yellow-300/20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-12 -right-12 h-52 w-52 rounded-full blur-[100px] bg-gradient-to-tl from-amber-400/20 via-orange-400/10 to-yellow-400/20"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        />

        {/* FORM CARD */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md sm:max-w-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-amber-200/50 dark:ring-amber-700/40 p-4 sm:p-6"
        >
          {/* header */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 font-serif">
              Distributorship Enquiry
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-serif">
              We'll reach out within 24 hours.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                icon: FaUser,
                placeholder: "Enter your name",
              },
              {
                label: "Email Address",
                name: "email",
                type: "email",
                icon: FaEnvelope,
                placeholder: "you@example.com",
              },
              {
                label: "Phone Number",
                name: "phone",
                type: "tel",
                icon: FaPhone,
                placeholder: "+91 9876543210",
              },
            ].map(({ label, name, type, icon: Icon, placeholder }) => (
              <div key={name} className="space-y-1">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-serif">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 text-sm" />
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    required
                    className="input-field pl-10 text-sm sm:text-base"
                  />
                </div>
              </div>
            ))}

            {/* subject */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-serif">
                Subject
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="input-field text-sm sm:text-base"
              >
                <option value="Distributorship">Distributorship</option>
              </select>
            </div>

            {/* message */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-serif">
                Tell Us About Yourself
              </label>
              <div className="relative">
                <FaCommentDots className="absolute left-3 top-4 text-amber-500 text-sm" />
                <textarea
                  name="message"
                  placeholder="Share your experience and interest..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="input-field pl-10 resize-none text-sm sm:text-base"
                />
              </div>
            </div>

            {/* submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="btn-primary w-full text-sm sm:text-base mt-2"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Request
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* status */}
          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-4 p-3 sm:p-4 rounded-lg border text-sm ${
                  status === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : status === "error"
                      ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {status === "success" && (
                    <FaCheckCircle className="text-green-600" />
                  )}
                  {status === "error" && (
                    <FaExclamationTriangle className="text-red-600" />
                  )}
                  {status === "sending" && (
                    <div className="animate-spin w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full" />
                  )}
                  {status === "success" && (
                    <span>Thank you! We'll contact you soon.</span>
                  )}
                  {status === "error" && (
                    <span>Something went wrong. Try again.</span>
                  )}
                  {status === "sending" && <span>Sending your request...</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* What Our Franchise Owner's Say About Us Section - Reduced spacing */}
      <section className="py-4 sm:py-6">
        <div className="text-center mb-3 sm:mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 font-serif mb-2"
          >
            What Our Franchise Owner's Say About Us!
          </motion.h2>
        </div>
      </section>

      {/* YouTube Videos Marquee Section - Reduced top spacing */}
      <section className="pb-8 sm:pb-12 overflow-hidden">
        {/* Marquee Container */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex space-x-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 80,
                  ease: "linear",
                },
              }}
            >
              {/* First set of videos */}
              {youtubeVideos.map((videoId, index) => (
                <YoutubeEmbed key={`first-${index}`} videoId={videoId} />
              ))}
              {/* Duplicate set for seamless loop */}
              {youtubeVideos.map((videoId, index) => (
                <YoutubeEmbed key={`second-${index}`} videoId={videoId} />
              ))}
            </motion.div>
          </div>
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-amber-50 via-orange-50/30 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-amber-50 via-orange-50/30 to-transparent pointer-events-none z-10"></div>
        </div>
      </section>
    </div>
  );
}
