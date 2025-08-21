"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "border" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  index?: number;
}

export default function AnimatedCard({
  children,
  className = "",
  hoverEffect = "lift",
  delay = 0,
  duration = 0.5,
  once = true,
  index = 0,
}: AnimatedCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  // Base container class
  let containerClass = "relative overflow-hidden rounded-lg";

  // Add hover effect classes
  if (hoverEffect !== "none") {
    containerClass += " group";
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay + index * 0.1, // Stagger effect if used in a list
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Hover animations based on effect type
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "lift":
        return {
          y: -8,
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.2 },
        };
      case "glow":
        return {
          boxShadow: "0 0 15px 2px rgba(245, 158, 11, 0.3)",
          transition: { duration: 0.2 },
        };
      case "border":
        // Border effect is handled via CSS
        return {};
      case "none":
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`${containerClass} ${className} ${hoverEffect === "border" ? "border border-transparent group-hover:border-amber-500 transition-colors duration-300" : ""}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={getHoverAnimation()}
    >
      {children}

      {/* Glow overlay for glow effect */}
      {hoverEffect === "glow" && (
        <motion.div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      )}
    </motion.div>
  );
}
