"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

/* --------------------------------------------------------
   Types
-------------------------------------------------------- */
interface Member {
  name: string;
  role: string;
  image: string;
  objectPosition?: string;
}

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  name: string;
  className?: string;
  priority?: boolean;
}

/* --------------------------------------------------------
   ImageWithFallback - Production Optimized
-------------------------------------------------------- */
function ImageWithFallback({
  src,
  alt,
  name,
  className = "",
  priority = false,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const initials = useMemo(() => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, [name]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  if (error) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xl font-bold rounded-full`}
        role="img"
        aria-label={`${name} profile image placeholder`}
      >
        {initials}
      </div>
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 320px) 100vw,
               (max-width: 480px) 100vw,
               (max-width: 640px) 100vw,
               (max-width: 768px) 50vw,
               (max-width: 1024px) 33vw,
               (max-width: 1280px) 25vw,
               (max-width: 1920px) 20vw,
               20vw"
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJiv/Z"
        quality={85}
        onLoad={handleLoad}
        onError={handleError}
      />

      {!loaded && !error && (
        <div
          className={`${className} bg-amber-100 animate-pulse rounded-full`}
          aria-label="Loading image..."
        />
      )}
    </>
  );
}

/* --------------------------------------------------------
   Mastermind - Modern Card Design with Founder First Row
-------------------------------------------------------- */
export default function Mastermind() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px 0px",
  });

  const teamMembers: Member[] = useMemo(
    () => [
      {
        name: "Nilesh Jadhav",
        role: "Founder",
        image: "/images/team/nilesh-jadhav-founder.jpeg",
        objectPosition: "50% 18%",
      },
      {
        name: "Gaurav Lute",
        role: "COO",
        image: "/images/team/gaurav-lute-coo.jpeg",
        objectPosition: "50% 18%",
      },
      {
        name: "Pratik Khilari",
        role: "CMO",
        image: "/images/team/pratik-khilari-cmo.jpeg",
        objectPosition: "50% 20%",
      },
      {
        name: "Nitin Kolekar",
        role: "CSO",
        image: "/images/team/nitin-kolekar-cso.jpeg",
        objectPosition: "50% 18%",
      },
      {
        name: "Kiran Mali",
        role: "Executive Assistant",
        image: "/images/team/kiran-mali-ea.jpeg",
        objectPosition: "50% 22%",
      },
    ],
    [],
  );

  const handleViewOpenings = useCallback(() => {
    // Handle view openings click
  }, []);

  const handleLearnMore = useCallback(() => {
    // Handle learn more click
  }, []);

  // Separate founder from other team members
  const founder = teamMembers[0];
  const otherMembers = teamMembers.slice(1);

  return (
    <section
      ref={ref}
      id="mastermind"
      aria-labelledby="mastermind-heading"
      className="relative py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Subtle Inline SVG Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns%3D%27http%3A//www.w3.org/2000/svg%27 width%3D%2740%27 height%3D%2740%27 viewBox%3D%270 0 40 40%27%3E%3Cpath d%3D%27M0 0h40v40H0z%27 fill%3D%27none%27/%3E%3Cpath d%3D%27M0 0h40v40%27 fill%3D%27none%27 stroke%3D%27%23d1d5db%27 stroke-width%3D%270.5%27/%3E%3C/svg%3E')",
          backgroundRepeat: "repeat",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-16 relative z-10">
        {/* --------------- Header --------------- */}
        <header className="text-center mb-10 xs:mb-12 sm:mb-14 md:mb-16 lg:mb-18 xl:mb-20 2xl:mb-24 3xl:mb-28">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 rounded-full border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 xs:px-4 xs:py-1.5 sm:px-5 sm:py-2 shadow-md backdrop-blur-sm">
            <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-xs xs:text-xs sm:text-sm font-bold uppercase tracking-wider xs:tracking-widest text-amber-700">
              Leadership Team
            </span>
          </div>

          <h2
            id="mastermind-heading"
            className="mt-4 xs:mt-5 sm:mt-6 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 drop-shadow-sm leading-tight"
          >
            The Masterminds
          </h2>

          <p className="mt-3 xs:mt-4 text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-amber-800 dark:text-amber-300 font-medium leading-relaxed max-w-xs xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto">
            Meet the team behind your favorite cup of chai
          </p>

          <p className="mt-5 xs:mt-6 sm:mt-7 md:mt-8 text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-3xl text-amber-700 dark:text-amber-300 leading-relaxed bg-white/60 dark:bg-gray-800/60 p-4 xs:p-5 sm:p-6 md:p-7 rounded-xl xs:rounded-2xl border border-amber-200/50 backdrop-blur-sm shadow-lg max-w-sm xs:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto">
            Behind every perfect cup of Graduate Chai is a team of passionate
            individuals who live and breathe tea. From our master blenders who
            craft each unique flavor profile to our operations experts who
            ensure consistency across all outlets, our team is the heart and
            soul of Graduate Chai.
          </p>
        </header>

        {/* --------------- First Row: Founder (Centered) --------------- */}
        <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
          <div
            className={`bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl border border-amber-200 dark:border-amber-800/40 transition-all duration-500 hover:-translate-y-2 p-8 text-center w-80 sm:w-96 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Larger Founder Image */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-200 shadow-lg">
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={founder.image}
                  alt={`${founder.name}, ${founder.role} at Graduate Chai`}
                  name={founder.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  priority={true}
                />
              </div>
            </div>

            {/* Founder Content */}
            <div className="text-center">
              <h3 className="font-bold text-2xl sm:text-3xl text-amber-800 dark:text-amber-200 mb-2">
                {founder.name}
              </h3>
              <div className="text-amber-600 dark:text-amber-400 text-lg font-semibold mb-4">
                {founder.role}
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* --------------- Second Row: Other Team Members Grid --------------- */}
        <div
          className={`grid gap-6 sm:gap-8 md:gap-10 
                      grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4
                      transition-all duration-700 ${
                        inView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
        >
          {otherMembers.map((member, idx) => (
            <div
              key={member.name}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl border border-amber-100 dark:border-amber-800/40 transition-all duration-300 hover:-translate-y-1 p-6 text-center flex flex-col items-center"
              style={{
                transitionDelay: `${idx * 100}ms`, // Staggered animation
              }}
            >
              {/* Regular Team Member Image */}
              <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-2 border-gray-100 shadow">
                <div className="relative w-full h-full">
                  <ImageWithFallback
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Graduate Chai`}
                    name={member.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                    priority={false}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h4 className="font-semibold text-lg text-amber-800 dark:text-amber-200">
                  {member.name}
                </h4>
                <div className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --------------- CTA --------------- */}
        <div className="mt-16 xs:mt-18 sm:mt-20 md:mt-22 lg:mt-24 xl:mt-28 2xl:mt-32 3xl:mt-36 text-center">
          <div className="relative overflow-hidden rounded-2xl xs:rounded-3xl p-6 xs:p-7 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16 3xl:p-20 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-lg md:shadow-xl">
            {/* decorative blobs */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-10 pointer-events-none"
            >
              <div className="absolute -top-6 -left-6 xs:-top-8 xs:-left-8 sm:-top-10 sm:-left-10 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-white rounded-full" />
              <div className="absolute -bottom-8 -right-8 xs:-bottom-10 xs:-right-10 sm:-bottom-12 sm:-right-12 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 bg-white rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>

            <h3 className="relative z-10 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-black text-white drop-shadow-sm leading-tight">
              Join Our Team
            </h3>
            <p className="relative z-10 mt-3 xs:mt-4 sm:mt-4 md:mt-5 text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-amber-100 max-w-xs xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              We're always looking for passionate people to join our growing
              family.
            </p>

            <div className="relative z-10 mt-5 xs:mt-6 sm:mt-7 md:mt-8 flex flex-col xs:flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center">
              <button
                onClick={handleViewOpenings}
                className="w-full xs:w-full sm:w-auto px-5 xs:px-6 sm:px-7 md:px-8 lg:px-9 py-2.5 xs:py-3 sm:py-3 md:py-4 bg-white text-amber-600 rounded-full font-bold text-sm xs:text-sm sm:text-base md:text-base lg:text-lg hover:bg-amber-50 transition-colors shadow-lg md:shadow-xl"
              >
                View Openings
              </button>
              <button
                onClick={handleLearnMore}
                className="w-full xs:w-full sm:w-auto px-5 xs:px-6 sm:px-7 md:px-8 lg:px-9 py-2.5 xs:py-3 sm:py-3 md:py-4 border-2 border-white text-white rounded-full font-bold text-sm xs:text-sm sm:text-base md:text-base lg:text-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
