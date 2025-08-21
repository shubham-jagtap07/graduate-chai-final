"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  external?: boolean;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = "left",
  animateOnHover = true,
  animateOnTap = true,
  external = false,
}: AnimatedButtonProps) {
  // Base button styles
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2";

  // Size styles
  const sizeStyles = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-6 py-3 text-lg",
  };

  // Variant styles
  const variantStyles = {
    primary: "bg-amber-600 text-white hover:bg-amber-700 disabled:bg-amber-300",
    secondary:
      "bg-amber-100 text-amber-900 hover:bg-amber-200 disabled:bg-amber-50 disabled:text-amber-400",
    outline:
      "border border-amber-600 text-amber-600 hover:bg-amber-50 disabled:border-amber-300 disabled:text-amber-300",
    ghost: "text-amber-600 hover:bg-amber-50 disabled:text-amber-300",
  };

  // Width style
  const widthStyle = fullWidth ? "w-full" : "";

  // Combine all styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  // Animation variants
  const buttonVariants = {
    hover: animateOnHover
      ? {
          scale: 1.03,
          transition: { duration: 0.2 },
        }
      : {},
    tap: animateOnTap
      ? {
          scale: 0.97,
          transition: { duration: 0.1 },
        }
      : {},
  };

  // Icon animation variants
  const iconVariants = {
    hover: iconPosition === "right" ? { x: 3 } : { x: -3 },
    initial: { x: 0 },
  };

  // Button content with icon
  const buttonContent = (
    <>
      {icon && iconPosition === "left" && (
        <motion.span
          className="mr-2"
          initial="initial"
          whileHover="hover"
          variants={iconVariants}
        >
          {icon}
        </motion.span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <motion.span
          className="ml-2"
          initial="initial"
          whileHover="hover"
          variants={iconVariants}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  // If disabled, return a simple button
  if (disabled) {
    return (
      <button disabled className={buttonStyles} aria-disabled="true">
        {buttonContent}
      </button>
    );
  }

  // If href is provided, return a Link
  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          className={buttonStyles}
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          {buttonContent}
        </motion.a>
      );
    }

    return (
      <Link href={href} passHref>
        <motion.a
          className={buttonStyles}
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          {buttonContent}
        </motion.a>
      </Link>
    );
  }

  // Otherwise, return a button
  return (
    <motion.button
      onClick={onClick}
      className={buttonStyles}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      {buttonContent}
    </motion.button>
  );
}
