"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  length: number;
  angle: number;
  speed: number;
  delay: number;
  opacity: number;
}

export default function ShootingStars() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    // Generate shooting stars
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = [];
      const starCount = 5; // Number of shooting stars

      for (let i = 0; i < starCount; i++) {
        newShootingStars.push({
          id: i,
          startX: Math.random() * 100, // percentage of screen width
          startY: Math.random() * 50, // top half of the screen
          length: Math.random() * 100 + 50, // length of the shooting star trail
          angle: Math.random() * 60 - 30, // angle between -30 and 30 degrees
          speed: Math.random() * 2 + 1, // animation speed
          delay: Math.random() * 10, // random delay for each star
          opacity: Math.random() * 0.5 + 0.5, // opacity between 0.5-1
        });
      }

      setShootingStars(newShootingStars);
    };

    generateShootingStars();

    // Regenerate shooting stars periodically
    const interval = setInterval(() => {
      generateShootingStars();
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {shootingStars.map((star) => {
        // Calculate end position based on angle and length
        const radians = (star.angle * Math.PI) / 180;
        // These will be used for future animation enhancements
        // const endX = star.startX + Math.cos(radians) * star.length;
        // const endY = star.startY + Math.sin(radians) * star.length;

        return (
          <motion.div
            key={star.id}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: "0px",
              opacity: 0,
              rotate: `${star.angle}deg`,
              transformOrigin: "left center",
            }}
            animate={{
              width: [`0px`, `${star.length}px`, `0px`],
              opacity: [0, star.opacity, 0],
              x: [0, star.length * 0.5, star.length],
              y: [
                0,
                Math.sin(radians) * star.length * 0.5,
                Math.sin(radians) * star.length,
              ],
            }}
            transition={{
              duration: star.speed,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 10 + 5, // Random delay between 5-15 seconds
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
