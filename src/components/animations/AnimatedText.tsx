"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  type?: "words" | "chars" | "lines";
}

// Animation variants
const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function AnimatedText({
  text,
  className = "",
  once = true,
  tag = "p",
  type = "words",
}: AnimatedTextProps) {
  const [isClient, setIsClient] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // On server and first render, render plain text to avoid hydration mismatch
  if (!isClient) {
    const Tag = tag;
    return <Tag className={className}>{text}</Tag>;
  }

  // On client, render animated text
  const Tag = tag;
  let content = null;
  if (type === "chars") {
    content = text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        custom={i}
        variants={charVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  } else {
    content = text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        className="inline-block mr-1"
        custom={i}
        variants={wordVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {word + "\u00A0"}
      </motion.span>
    ));
  }
  return (
    <Tag className={className} ref={ref}>
      {content}
    </Tag>
  );
}
