"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import SectionTransition from "../animations/SectionTransition";
import AnimatedText from "../animations/AnimatedText";

export default function Network() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [showQr, setShowQr] = useState(false);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 dark:from-gray-900 dark:to-gray-800 py-20 md:py-24"
    >
      {/* Enhanced Background decorations with Amber Theme */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-[120px] bg-gradient-to-br from-amber-300/30 via-orange-300/20 to-yellow-300/30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-[150px] bg-gradient-to-tl from-amber-400/25 via-orange-400/20 to-yellow-400/25"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 left-10 w-32 h-32 bg-amber-200/30 dark:bg-amber-800/20 rounded-full blur-2xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Hero block with Amber Theme */}
        <SectionTransition className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="w-full text-center md:text-left space-y-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-800 dark:text-amber-100">
              Shirdi's Most Loved{" "}
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                Graduate Chai!
              </span>
            </h1>
            <motion.h6
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl font-semibold text-amber-700 dark:text-amber-300 md:ml-20"
            >
              We are an Educated Startup In Tea Industry...
            </motion.h6>
          </motion.div>
        </SectionTransition>

        {/* Enhanced Mascot + Content Card with Amber Theme */}
        <SectionTransition className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full flex flex-col md:flex-row items-stretch justify-center"
          >
            <div className="bg-gradient-to-br from-white/95 via-amber-50/30 to-orange-50/20 dark:from-gray-900/95 dark:via-amber-900/10 rounded-3xl shadow-2xl border-2 border-amber-100/60 dark:border-amber-800/40 flex flex-col md:flex-row items-stretch w-full hover:shadow-2xl hover:border-amber-200/80 transition-all duration-500 backdrop-blur-sm overflow-hidden">
              {/* Enhanced Mascot area */}
              <div className="flex-shrink-0 flex items-center justify-center md:justify-start p-8 md:p-12 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-900/30 dark:to-orange-900/20 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-amber-300 rounded-full blur-xl" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-orange-300 rounded-full blur-lg" />
                </div>
                <div className="relative w-32 md:w-72 h-40 md:h-72 z-10">
                  <Image
                    src="/images/shirdiarea.png"
                    alt="Graduate Chai Mascot"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 128px, 288px"
                    priority
                  />
                </div>
              </div>

              {/* Enhanced Divider */}
              <div className="hidden md:block w-px bg-gradient-to-b from-amber-200 via-orange-200 to-amber-200 my-8" />

              {/* Enhanced Content area */}
              <div className="flex-1 flex flex-col justify-center text-left p-8 md:p-12">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-700 dark:text-gray-200 text-base md:text-lg leading-relaxed w-full"
                >
                  Welcome to{" "}
                  <span className="font-bold text-amber-700 dark:text-amber-400">
                    Graduate Chai
                  </span>
                  , where every cup tells a story of India's diverse tea
                  culture. With a nationwide presence, our tea stalls bring
                  together the authentic flavors of chai, from the snow-capped
                  mountains to the sun-drenched coasts. As a franchise-driven
                  venture, we take pride in creating local tea experiences while
                  upholding the highest quality standards. Join us in
                  celebrating the rich tapestry of Indian tea traditions as we
                  continue to brew moments of warmth and connection in every
                  sip. Discover the essence of{" "}
                  <span className="font-bold text-amber-700 dark:text-amber-400">
                    Graduate Chai
                  </span>
                  , where tradition meets innovation, one chai at a time.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </SectionTransition>

        {/* Enhanced Meet the Mastermind Section with Amber Theme */}
        <SectionTransition className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/10 rounded-3xl shadow-2xl border-2 border-amber-200/60 dark:border-amber-700/40 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Enhanced Decorative grid background (CSS pattern to avoid external asset) */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
            </div>

            {/* Enhanced Left: Text Content */}
            <div className="flex-1 z-10 text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-amber-100 mb-3">
                  Meet the{" "}
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Mastermind
                  </span>
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-300 mb-6">
                  Mr. Nilesh Jadhav
                </h3>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl"
              >
                Meet the visionary behind{" "}
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  Graduate Chai, Mr. Nilesh Jadhav
                </span>
                . With an unwavering passion for tea and a dream to redefine
                India's chai culture,{" "}
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  Mr. Nilesh
                </span>{" "}
                embarked on this flavorful journey. Inspired by the diverse
                regional tea traditions, they envisioned creating a brand that
                not only served exceptional chai but also became a cultural
                bridge across the nation.{" "}
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  Mr. Nilesh's
                </span>{" "}
                commitment to quality, innovation, and community engagement has
                been the driving force behind the success of{" "}
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  Graduate Chai
                </span>
                , making it a cherished destination for tea enthusiasts
                nationwide. Join us in raising a cup to the founder's
                dedication, shaping a legacy steeped in aromatic tales and
                flavorful experiences.
              </motion.p>
            </div>

            {/* Enhanced Right: YouTube Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex-1 z-10 flex items-center justify-center w-full md:w-auto"
            >
              <div className="w-full md:w-[400px] lg:w-[450px] aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300 dark:border-amber-600 bg-black hover:scale-105 transition-transform duration-300">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/A3Sq8VmElX8?start=8"
                  title="Graduate Chai Mastermind"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        </SectionTransition>

        {/* COMPLETELY STATIC Map Visualization Section */}
        <SectionTransition className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-gradient-to-br from-white/90 via-amber-50/20 to-orange-50/20 dark:from-gray-900/90 dark:via-amber-900/10 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-2xl border-2 border-amber-100/60 dark:border-amber-800/40 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 overflow-hidden"
          >
            {/* STATIC Image Container - NO ANIMATIONS */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[420px]">
                <div className="relative w-full h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-2xl shadow-lg">
                  {/* Audio removed to prevent 404 when file is absent */}

                  {/* Static overlay - no animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-orange-100/20 z-10 pointer-events-none" />

                  {/* Static indicator - no animation */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-amber-400/30 border-3 border-amber-500/50 shadow-xl" />
                  </div>

                  {/* COMPLETELY STATIC IMAGE - ALL ANIMATIONS REMOVED */}
                  <Image
                    src="/images/network.jpeg"
                    alt="Graduate Chai Global Network"
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 768px) 350px, (max-width: 1024px) 400px, 420px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Text - right side */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-amber-100 leading-tight"
              >
                A Network of{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Happiness!
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed"
              >
                At{" "}
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  Graduate Chai
                </span>
                , we take immense pride in our journey of bringing the rich and
                aromatic flavors of tea to every nook and corner of India. What
                started as a humble tea stall in Shirdi has now evolved into a
                thriving franchise network that spans the length and breadth of
                the country.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-8 w-full justify-center md:justify-start"
              >
                <div className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    750+
                  </div>
                  <div className="text-base md:text-lg text-gray-800 dark:text-gray-200 font-bold mt-1">
                    Branches across India
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    30L+
                  </div>
                  <div className="text-base md:text-lg text-gray-800 dark:text-gray-200 font-bold mt-1">
                    Happy Customers
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced CTA Background Banner with Amber Theme */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="relative mt-16 w-full flex flex-col items-center justify-center py-16 px-4 md:px-8 rounded-3xl overflow-hidden"
            style={{
              backgroundImage: "url(/images/network.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60 z-0" />
            <div className="relative z-10 flex flex-col items-center w-full text-center space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight">
                Let's Join hands together and you may be the next franchise
                owner of{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Graduate Chai
                </span>{" "}
                in your town!
              </h2>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white font-bold text-lg rounded-full shadow-2xl transition-all duration-300"
                onClick={() => setShowQr(true)}
                aria-label="Book a call to become a franchise owner"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Book A Call
              </motion.button>

              {/* Enhanced QR Modal with Amber Theme */}
              <AnimatePresence>
                {showQr && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, y: 40 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 rounded-3xl p-8 shadow-2xl relative w-[320px] flex flex-col items-center border-2 border-amber-200"
                    >
                      <button
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => setShowQr(false)}
                        aria-label="Close QR code modal"
                      >
                        &#10005;
                      </button>
                      <div className="text-center mb-6 text-gray-800 font-bold text-lg">
                        Scan the QR code to
                        <br />
                        book a call.
                      </div>
                      <Image
                        src="/images/qr.png"
                        alt="Book a call QR code"
                        width={192}
                        height={192}
                        className="w-48 h-48 object-contain mx-auto rounded-xl shadow-lg"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Enhanced Social Media Stats with Amber Theme */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="w-full py-8 px-4 md:px-8 mt-16 flex justify-center bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
              {/* Enhanced Instagram */}
              <motion.a
                href={
                  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
                  "https://www.instagram.com/nilesh_graduatechaiwala/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl flex flex-col items-center py-8 px-6 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">
                  221K+
                </div>
                <div className="text-gray-600 mb-3 text-center font-medium">
                  Instagram Followers
                </div>
                <span className="text-pink-600 font-bold group-hover:text-pink-700">
                  Follow Me
                </span>
              </motion.a>

              {/* Enhanced Facebook */}
              <motion.a
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl flex flex-col items-center py-8 px-6 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">
                  9.1K+
                </div>
                <div className="text-gray-600 mb-3 text-center font-medium">
                  Facebook Followers
                </div>
                <span className="text-blue-600 font-bold group-hover:text-blue-700">
                  Follow Me
                </span>
              </motion.a>

              {/* Enhanced YouTube */}
              <motion.a
                href={
                  process.env.NEXT_PUBLIC_YOUTUBE_URL ||
                  "https://www.youtube.com/@graduate_chai_"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl flex flex-col items-center py-8 px-6 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">
                  2.38K+
                </div>
                <div className="text-gray-600 mb-3 text-center font-medium">
                  YouTube Subscribers
                </div>
                <span className="text-red-600 font-bold group-hover:text-red-700">
                  Subscribe Me
                </span>
              </motion.a>

              {/* Enhanced Tea Sold */}
              <Link href="/#products">
                <motion.div
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl flex flex-col items-center py-8 px-6 transition-all duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div className="text-3xl font-black text-gray-800 mb-2">
                    50K+
                  </div>
                  <div className="text-gray-600 mb-3 text-center font-medium">
                    Tea Sold
                  </div>
                  <span className="text-amber-600 font-bold group-hover:text-amber-700">
                    Buy Now
                  </span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </SectionTransition>

        {/* Enhanced Franchise CTA with Amber Theme */}
        <SectionTransition className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-center bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20" />
            </div>

            <div className="relative z-10 space-y-8">
              <AnimatedText
                text="Join the Graduate Chai Family"
                tag="h3"
                className="text-3xl md:text-4xl font-black"
              />
              <AnimatedText
                text="Interested in opening a Graduate Chai franchise in your area?"
                className="text-xl text-amber-100 leading-relaxed"
              />
              <Link
                href="/franchise"
                target="_blank"
                rel="noopener noreferrer"
                passHref
                legacyBehavior
              >
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-600 rounded-full font-bold text-lg hover:bg-amber-50 transition-colors shadow-xl"
                >
                  Franchise Opportunities
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </motion.svg>
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </SectionTransition>
      </div>
    </section>
  );
}
