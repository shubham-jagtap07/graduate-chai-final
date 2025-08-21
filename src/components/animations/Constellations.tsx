"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
}

interface Constellation {
  id: number;
  stars: Star[];
  delay: number;
}

export default function Constellations() {
  const [constellations, setConstellations] = useState<Constellation[]>([]);

  useEffect(() => {
    // Generate constellations
    const generateConstellations = () => {
      const newConstellations: Constellation[] = [];
      const constellationCount = 3; // Small number of constellations

      for (let i = 0; i < constellationCount; i++) {
        // Generate a constellation with 3-6 stars
        const starCount = Math.floor(Math.random() * 4) + 3;
        const stars: Star[] = [];

        // Base position for this constellation
        const baseX = Math.random() * 80 + 10; // Between 10-90% of screen width
        const baseY = Math.random() * 80 + 10; // Between 10-90% of screen height

        // Generate stars in a relatively close proximity
        for (let j = 0; j < starCount; j++) {
          stars.push({
            id: j,
            x: baseX + (Math.random() * 20 - 10), // Within ±10% of base position
            y: baseY + (Math.random() * 20 - 10), // Within ±10% of base position
          });
        }

        newConstellations.push({
          id: i,
          stars,
          delay: Math.random() * 2, // Random delay for animation
        });
      }

      setConstellations(newConstellations);
    };

    generateConstellations();

    // Regenerate constellations on window resize
    const handleResize = () => {
      generateConstellations();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {constellations.map((constellation) => (
        <div key={constellation.id} className="absolute inset-0">
          {/* Draw stars */}
          {constellation.stars.map((star) => (
            <motion.div
              key={`star-${constellation.id}-${star.id}`}
              className="absolute rounded-full bg-amber-100"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: "3px",
                height: "3px",
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0.8, 0],
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: constellation.delay,
                repeat: Infinity,
                repeatDelay: 15, // Wait 15s before showing again
                times: [0, 0.1, 0.9, 1], // Control timing of opacity changes
              }}
            />
          ))}

          {/* Draw lines between consecutive stars */}
          {constellation.stars.slice(0, -1).map((star, index) => {
            const nextStar = constellation.stars[index + 1];

            // Calculate line properties
            const x1 = star.x;
            const y1 = star.y;
            const x2 = nextStar.x;
            const y2 = nextStar.y;

            // Calculate length and angle
            const length = Math.sqrt(
              Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2),
            );
            const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

            return (
              <motion.div
                key={`line-${constellation.id}-${index}`}
                className="absolute h-px bg-amber-100/30"
                style={{
                  left: `${x1}%`,
                  top: `${y1}%`,
                  width: 0,
                  transformOrigin: "left center",
                  rotate: `${angle}deg`,
                  opacity: 0,
                }}
                animate={{
                  width: [`0%`, `${length}%`, `${length}%`, `0%`],
                  opacity: [0, 0.3, 0.3, 0],
                }}
                transition={{
                  duration: 4,
                  delay: constellation.delay + 0.2, // Slight delay after stars appear
                  repeat: Infinity,
                  repeatDelay: 15, // Match star timing
                  times: [0, 0.15, 0.85, 1], // Control timing of opacity changes
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
