"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  hoverEffect?: "scale" | "rotate" | "shine" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  hoverEffect = "scale",
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimatedImageProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  // Base container class
  let containerClass = "relative overflow-hidden";

  // Add hover effect classes
  if (hoverEffect === "scale") {
    containerClass += " group";
  } else if (hoverEffect === "rotate") {
    containerClass += " group";
  } else if (hoverEffect === "shine") {
    containerClass += " group";
  }

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Hover animations based on effect type
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "scale":
        return {
          scale: 1.05,
          transition: { duration: 0.3 },
        };
      case "rotate":
        return {
          scale: 1.02,
          rotate: 2,
          transition: { duration: 0.3 },
        };
      case "none":
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`${containerClass} ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={imageVariants}
    >
      <motion.div whileHover={getHoverAnimation()} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Shine effect overlay */}
      {hoverEffect === "shine" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
          initial={{ x: "-100%" }}
          whileHover={{
            x: "100%",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        />
      )}
    </motion.div>
  );
}
