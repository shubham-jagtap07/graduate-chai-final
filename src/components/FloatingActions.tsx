"use client";

import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaPhoneAlt, FaArrowUp } from "react-icons/fa";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9730636550";
const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "9730636550";

export default function FloatingActions() {
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Format WhatsApp number for proper international format
  const formatWhatsAppNumber = (number: string) => {
    const cleanNumber = number.replace(/\D/g, "");
    if (cleanNumber.startsWith("91")) {
      return cleanNumber;
    } else {
      return `91${cleanNumber}`;
    }
  };

  // Enhanced WhatsApp handler for mobile compatibility
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWhatsAppLoading(true);

    const formattedNumber = formatWhatsAppNumber(whatsappNumber);
    const message = encodeURIComponent(
      "Hi! I'm interested in Graduate Chai products. Could you please provide more information?",
    );

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      const whatsappAppURL = `whatsapp://send?phone=${formattedNumber}&text=${message}`;
      const waWebURL = `https://wa.me/${formattedNumber}?text=${message}`;

      window.location.href = whatsappAppURL;

      setTimeout(() => {
        const fallbackWindow = window.open(waWebURL, "_blank");
        if (!fallbackWindow) {
          window.location.href = waWebURL;
        }
        setIsWhatsAppLoading(false);
      }, 1500);
    } else {
      const waWebURL = `https://wa.me/${formattedNumber}?text=${message}`;
      window.open(waWebURL, "_blank");
      setIsWhatsAppLoading(false);
    }
  };

  // Scroll detection
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // Show scroll button when user scrolled down 400px
          const hasScrolled = scrollTop > 400;

          // Auto-hide when scrolling down, show when scrolling up
          const isScrollingUp = scrollTop < lastScrollY;
          const isNearTop = scrollTop < 100;

          // Check if footer is visible
          const footer =
            document.querySelector("footer") ||
            document.querySelector("#footer") ||
            document.querySelector(".footer");

          let isFooterVisible = false;

          if (footer) {
            const footerRect = footer.getBoundingClientRect();
            isFooterVisible = footerRect.top <= windowHeight + 100;
          } else {
            isFooterVisible = scrollTop + windowHeight >= documentHeight - 500;
          }

          // Enhanced visibility logic
          setIsVisible(isScrollingUp || isNearTop || isFooterVisible);
          setShowScrollButton(
            hasScrolled && (isScrollingUp || isFooterVisible),
          );

          lastScrollY = scrollTop;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener with throttling
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-6 flex flex-col gap-3 z-[9999] transition-all duration-500 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
      }`}
    >
      {/* WhatsApp Chat - Original WhatsApp Green */}
      <div className="relative group">
        <button
          onClick={handleWhatsAppClick}
          disabled={isWhatsAppLoading}
          className="relative bg-[#25D366] hover:bg-[#1DB954] disabled:opacity-70 text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 transform hover:rotate-3"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-pulse scale-110" />

          <div className="relative z-10">
            {isWhatsAppLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaWhatsapp size={24} className="drop-shadow-sm animate-bounce" />
            )}
          </div>
        </button>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg transform group-hover:scale-105">
          Chat on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
        </div>
      </div>

      {/* Call Button - Original WhatsApp Green */}
      <div className="relative group">
        <a
          href={`tel:+91${phoneNumber}`}
          className="relative bg-[#25D366] hover:bg-[#1DB954] text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 transform hover:-rotate-3"
          title="Call Us"
          aria-label="Call Us"
        >
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping scale-110" />

          <div className="relative z-10">
            <FaPhoneAlt size={20} className="drop-shadow-sm" />
          </div>
        </a>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg transform group-hover:scale-105">
          Call: +91 {phoneNumber}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
        </div>
      </div>

      {/* Scroll to Top Button - Original WhatsApp Green */}
      {showScrollButton && (
        <div className="relative group animate-fadeInUp">
          <button
            onClick={handleScrollTop}
            className="relative bg-[#25D366] hover:bg-[#1DB954] text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 transform hover:rotate-6"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            {/* Pulse ring animation */}
            <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-pulse scale-110" />

            <div className="relative z-10 animate-bounce">
              <FaArrowUp size={20} className="drop-shadow-sm" />
            </div>
          </button>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg transform group-hover:scale-105">
            Back to Top
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </div>
        </div>
      )}

      {/* Background glow effect with original WhatsApp colors */}
      <div className="absolute inset-0 bg-[#25D366]/30 rounded-full blur-2xl scale-150 animate-pulse -z-10" />
    </div>
  );
}
