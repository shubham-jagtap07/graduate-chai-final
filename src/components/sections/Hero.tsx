"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import FloatingActions from "../FloatingActions";

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Config
  const DURATION_MS = 3000;
  const TRANSITION_S = 0.8;

  // Images
  const images = useMemo(
    () => [
      "/images/team/28.webp",
      "/images/team/29.webp",
      "/images/team/30.webp",
    ],
    [],
  );

  // Object position per slide
  const focalByIndex = useMemo(() => ["center", "50% 45%", "center 40%"], []);

  const [, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const backgroundImage = images[currentIndex];
  const objectPosition = focalByIndex[currentIndex] ?? "center";

  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

  const handleImageLoad = useCallback((e: any) => {
    if (e?.target?.naturalWidth && e?.target?.naturalHeight) {
      setAspectRatio(e.target.naturalWidth / e.target.naturalHeight);
    }
    setImageLoaded(true);
  }, []);

  // Preload images
  useEffect(() => {
    if (typeof window === "undefined") return;
    const preloaders: HTMLImageElement[] = [];
    images.forEach((src) => {
      const el = new window.Image();
      el.src = src;
      preloaders.push(el);
    });
    return () => {
      preloaders.forEach((el) => (el.src = ""));
    };
  }, [images]);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [backgroundImage]);

  useEffect(() => {
    const handleVisibility = () => setIsPlaying(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const nextSlide = useCallback(() => {
    setPrevIndex((p) => (p === null ? currentIndex : p));
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [currentIndex, images.length]);

  // Added prevSlide function for left arrow
  const prevSlide = useCallback(() => {
    setPrevIndex((p) => (p === null ? currentIndex : p));
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [currentIndex, images.length]);

  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    const shouldRun = isPlaying && !isHovered && inView && images.length > 1;
    if (!shouldRun) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = window.setInterval(nextSlide, DURATION_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isPlaying, isHovered, inView, images.length, nextSlide]);

  const [direction] = useState<-1 | 1>(-1);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir === -1 ? "100%" : "-100%",
      scale: 1.03,
      opacity: 1,
    }),
    center: { x: "0%", scale: 1, opacity: 1 },
    exit: (dir: number) => ({
      x: dir === -1 ? "-100%" : "100%",
      scale: 1,
      opacity: 1,
    }),
  };

  return (
    <header
      ref={ref}
      id="home"
      className="relative w-full overflow-hidden bg-black"
      style={{
        aspectRatio: aspectRatio,
        maxHeight: "100vh",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Background slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {prevIndex !== null && prevIndex !== currentIndex && !imageError && (
            <motion.div
              key={`prev-${prevIndex}`}
              className="absolute inset-0"
              custom={direction}
              variants={slideVariants}
              initial="center"
              animate="exit"
              exit="exit"
              transition={{
                x: {
                  type: "tween",
                  duration: TRANSITION_S,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <Image
                src={images[prevIndex]}
                alt={`Background slide ${prevIndex + 1}`}
                fill
                style={{ objectFit: "cover", objectPosition }}
                priority={prevIndex === 0}
                className="w-full h-full select-none pointer-events-none"
                draggable={false}
              />
            </motion.div>
          )}

          {!imageError && (
            <motion.div
              key={`curr-${currentIndex}`}
              className="absolute inset-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: "tween",
                  duration: TRANSITION_S,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              onAnimationStart={() => setImageLoaded(false)}
              onAnimationComplete={() => setPrevIndex(null)}
            >
              <Image
                src={backgroundImage}
                alt={`Background slide ${currentIndex + 1}`}
                fill
                style={{ objectFit: "cover", objectPosition }}
                onLoad={handleImageLoad}
                onError={() => setImageError(true)}
                draggable={false}
                priority={currentIndex === 0}
                className="w-full h-full select-none pointer-events-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {imageError && (
          <Image
            src="/images/chai-hero-fallback.jpg"
            alt="Fallback background"
            fill
            style={{ objectFit: "cover" }}
            draggable={false}
            priority
            className="absolute inset-0 w-full h-full"
          />
        )}

        {/* Uniform overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Arrow Navigation - Added Only This Section */}
      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm rounded-full p-3 md:p-4 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm rounded-full p-3 md:p-4 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
            type="button"
          >
            <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
          </button>
        </>
      )}

      <FloatingActions />

      {/* Content wrapper */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4 md:px-12 lg:px-20">
        <motion.div
          className="max-w-4xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Example heading */}
        </motion.div>
      </div>
    </header>
  );
}
