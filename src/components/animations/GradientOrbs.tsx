"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color1: string;
  color2: string;
  duration: number;
  delay: number;
}

export default function GradientOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    // Generate orbs
    const generateOrbs = () => {
      const newOrbs: Orb[] = [];
      const orbCount = 5; // Small number of orbs to avoid overwhelming the UI

      const colorPairs = [
        ["from-amber-200/20", "to-orange-300/10"],
        ["from-yellow-200/20", "to-amber-300/10"],
        ["from-orange-100/20", "to-amber-200/10"],
        ["from-amber-100/20", "to-yellow-200/10"],
        ["from-amber-50/20", "to-orange-100/10"],
      ];

      for (let i = 0; i < orbCount; i++) {
        const colorPair =
          colorPairs[Math.floor(Math.random() * colorPairs.length)];
        newOrbs.push({
          id: i,
          x: Math.random() * 100, // percentage of screen width
          y: Math.random() * 100, // percentage of screen height
          size: Math.random() * 200 + 100, // size between 100-300px
          color1: colorPair[0],
          color2: colorPair[1],
          duration: Math.random() * 30 + 20, // animation duration between 20-50s
          delay: Math.random() * 5, // random delay for each orb
        });
      }

      setOrbs(newOrbs);
    };

    generateOrbs();

    // Regenerate orbs on window resize for responsiveness
    const handleResize = () => {
      generateOrbs();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full bg-gradient-to-r ${orb.color1} ${orb.color2} blur-3xl mix-blend-soft-light`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
          }}
          animate={{
            x: [
              0,
              Math.random() * 100 - 50, // Move randomly within -50px to +50px
              0,
            ],
            y: [
              0,
              Math.random() * 100 - 50, // Move randomly within -50px to +50px
              0,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
