"use client";

import React from "react";
import Link from "next/link";

type Position = "bottom" | "left" | "right";

type StickyActionsProps = {
  onOpenFranchise?: () => void;
  onOpenShop?: () => void;
  franchiseHref?: string; // defaults to "/franchise"
  productHref?: string; // defaults to "/products"
  position?: Position; // defaults to "bottom"
  zIndexClass?: string; // e.g., "z-[300]"; defaults to "z-50"
};

export default function StickyActions({
  onOpenFranchise,
  onOpenShop,
  franchiseHref = "/franchise",
  productHref = "/products",
  position = "bottom",
  zIndexClass = "z-50",
}: StickyActionsProps) {
  const posClass =
    position === "bottom"
      ? "left-2 right-2 bottom-2 sm:left-3 sm:right-3 sm:bottom-3 md:left-4 md:right-4 md:bottom-4 w-auto max-w-xs sm:max-w-sm mx-auto"
      : position === "left"
        ? "left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 w-10 xs:w-12 sm:w-40 md:w-44"
        : "right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 w-10 xs:w-12 sm:w-40 md:w-44";

  const stackClass = position === "bottom" ? "flex-row" : "flex-col";

  const roundedClass =
    position === "bottom"
      ? "rounded-lg sm:rounded-xl"
      : position === "left"
        ? "rounded-r-lg sm:rounded-r-xl"
        : "rounded-l-lg sm:rounded-l-xl";

  const shellClass = `
    fixed ${zIndexClass} ${posClass} ${roundedClass}
    overflow-hidden shadow-md sm:shadow-lg 
    border border-black/10 dark:border-white/10
    backdrop-blur-sm bg-white/90 dark:bg-black/60
    pb-[max(env(safe-area-inset-bottom),2px)] sm:pb-[max(env(safe-area-inset-bottom),3px)]
    pt-0.5 px-0.5 sm:pt-1 sm:px-1 md:pt-1.5 md:px-1.5
  `;

  return (
    <aside
      className={shellClass}
      role="complementary"
      aria-label="Quick actions"
    >
      <nav
        className={`flex ${stackClass} w-full gap-0.5 sm:gap-1 md:gap-1.5`}
        aria-label="Sticky action modules"
      >
        <ActionButton
          label="Get Franchise"
          ariaLabel="Open franchise inquiry form"
          icon={
            <svg
              className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l8 4v5c0 5-3.5 9.74-8 11-4.5-1.26-8-6-8-11V6l8-4zm0 2.2L6 6.5v4.5c0 4.17 2.78 8.1 6 9.24 3.22-1.14 6-5.07 6-9.24V6.5l-6-2.3zM11 7h2v5h-2V7zm0 6h2v2h-2v-2z" />
            </svg>
          }
          bg="bg-neutral-900"
          bgHover="hover:bg-neutral-800"
          text="text-white"
          ring="focus:ring-white/40"
          borderSide="none"
          onClick={onOpenFranchise}
          href={!onOpenFranchise ? franchiseHref : undefined}
        />

        <ActionButton
          label="Buy Product"
          ariaLabel="Browse and buy products"
          icon={
            <svg
              className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-2h10V6H7v10zm10-12c1.1 0 2 .9 2 2v10c0 1.11-.9 2-2 2H7c-1.11 0-2-.89-2-2V6c0-1.1.89-2 2-2h10zM17 18c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2z" />
            </svg>
          }
          bg="bg-amber-500"
          bgHover="hover:bg-amber-600"
          text="text-white"
          ring="focus:ring-amber-200"
          borderSide="none"
          onClick={onOpenShop}
          href={!onOpenShop ? productHref : undefined}
        />
      </nav>
    </aside>
  );
}

type ActionButtonProps = {
  label: string;
  ariaLabel: string;
  icon: React.ReactNode;
  bg: string;
  bgHover: string;
  text: string;
  ring: string;
  borderSide?: "r" | "b" | "none";
  onClick?: () => void; // when provided → render <button>
  href?: string; // when provided (and no onClick) → render <Link>
};

function ActionButton({
  label,
  ariaLabel,
  icon,
  bg,
  bgHover,
  text,
  ring,
  borderSide = "none",
  onClick,
  href,
}: ActionButtonProps) {
  const base = `
    group flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2
    px-1.5 py-1.5 xs:px-2 xs:py-2 sm:px-2.5 sm:py-2.5 md:px-3 md:py-3
    ${text} ${bg} ${bgHover}
    transition-all duration-200 
    rounded-md sm:rounded-lg
    flex-1 min-h-[32px] sm:min-h-[36px] md:min-h-[40px]
    hover:scale-105 active:scale-95 transform
  `;

  const border =
    borderSide === "r"
      ? "border-r border-white/10"
      : borderSide === "b"
        ? "border-b border-white/10"
        : "";

  const focus = `focus:outline-none focus:ring-1 ${ring} focus:ring-offset-1 focus:ring-offset-transparent`;

  const content = (
    <>
      <span aria-hidden="true" className="shrink-0">
        {icon}
      </span>
      <span className="font-medium sm:font-semibold leading-tight text-xs sm:text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
    </>
  );

  const common = `${base} ${border} ${focus}`;

  if (onClick) {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className={common}
      >
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={common}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={ariaLabel} className={common}>
      {content}
    </button>
  );
}
