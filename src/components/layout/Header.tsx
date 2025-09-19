/* app/components/Header.tsx */
"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "../ThemeProvider";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: readonly NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Franchise", href: "/franchise" },
  { name: "Distributorship", href: "/blog" },
  { name: "News & Events", href: "/news&events" },
  { name: "Contact Us", href: "/contact" },
  { name: "Admin Login", href: "/admin" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { theme = "light", toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHashLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const [, hash] = href.split("#");
    if (!hash) return;

    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (pathname !== "/") {
      router.push(`/#${hash}`);
    }
    setMobileMenuOpen(false);
  };

  const safeToggleTheme = () => {
    try {
      toggleTheme();
    } catch {
      /* no-op in case ThemeProvider is missing */
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-amber-100 dark:border-amber-800"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Header Container with Better Layout */}
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo with Proper Right Margin */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 mr-8 lg:mr-12"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Graduate Chai Logo"
                  width={140}
                  height={70}
                  priority
                  className="h-12 lg:h-16 w-auto"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation - Centered and Spaced Properly */}
            <nav className="hidden lg:flex items-center gap-8 mx-auto">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/blog" && pathname.startsWith("/blog")) ||
                  (link.href === "/news&events" &&
                    pathname.startsWith("/news"));

                const linkEl = link.href.includes("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleHashLink(e, link.href)}
                    className={`relative px-4 py-2 font-semibold text-sm whitespace-nowrap rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-md"
                        : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 font-semibold text-sm whitespace-nowrap rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-md"
                        : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-200 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.3,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </Link>
                );

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {linkEl}
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Theme Toggle */}
              <button
                aria-label="Toggle dark mode"
                onClick={safeToggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-700 dark:text-amber-300 transition-colors duration-200"
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Mobile Menu Toggle */}
              <div className="flex lg:hidden items-center gap-2">
                <button
                  aria-label="Toggle mobile menu"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu with Better Styling */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-1 overflow-hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-md shadow-lg border-t border-gray-200 dark:border-gray-700 rounded-b-2xl"
              >
                <div className="px-4 py-5 space-y-2">
                  {navLinks.map((link, i) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href === "/blog" && pathname.startsWith("/blog")) ||
                      (link.href === "/news&events" &&
                        pathname.startsWith("/news"));

                    const commonClasses = `block px-4 py-3 text-base font-semibold rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-amber-600 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/20"
                        : "text-gray-700 dark:text-gray-100 hover:text-amber-600 hover:bg-gray-100 dark:hover:text-amber-300 dark:hover:bg-gray-800/60"
                    }`;

                    return link.href.includes("#") ? (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleHashLink(e, link.href)}
                        className={commonClasses}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {link.name}
                      </motion.a>
                    ) : (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={commonClasses}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Content spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}

// Icon components remain the same
function SunIcon({ small }: { small?: boolean } = {}) {
  const size = small ? "h-4 w-4" : "h-5 w-5";
  return (
    <svg
      className={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 19.778l-.707-.707M21 12h1M3 12H2m16.485 4.485l-.707-.707M4.222 4.222l-.707.707"
      />
    </svg>
  );
}

function MoonIcon({ small }: { small?: boolean } = {}) {
  const size = small ? "h-4 w-4" : "h-5 w-5";
  return (
    <svg
      className={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      />
    </svg>
  );
}

const MenuIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
