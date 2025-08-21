"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

export default function CosmicDust() {
  const [particles, setParticles] = useState<DustParticle[]>([]);

  useEffect(() => {
    // Generate dust particles
    const generateParticles = () => {
      const newParticles: DustParticle[] = [];
      const particleCount = Math.floor(window.innerWidth / 20); // Responsive particle count

      const colors = [
        "bg-amber-200",
        "bg-amber-300",
        "bg-orange-200",
        "bg-yellow-100",
        "bg-amber-100",
        "bg-white",
      ];

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // percentage of screen width
          y: Math.random() * 100, // percentage of screen height
          size: Math.random() * 3 + 1, // size between 1-4px
          opacity: Math.random() * 0.3 + 0.1, // opacity between 0.1-0.4
          duration: Math.random() * 20 + 10, // animation duration between 10-30s
          delay: Math.random() * 5, // random delay for each particle
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      setParticles(newParticles);
    };

    generateParticles();

    // Regenerate particles on window resize for responsiveness
    const handleResize = () => {
      generateParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.color}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            x: [
              0,
              Math.random() * 20 - 10, // Move randomly within -10px to +10px
              0,
            ],
            y: [
              0,
              Math.random() * 20 - 10, // Move randomly within -10px to +10px
              0,
            ],
            opacity: [
              particle.opacity,
              particle.opacity * 1.5,
              particle.opacity,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
