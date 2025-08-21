"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/FloatingActions";
import StickyActions from "@/components/sections/StickyActions";
import ThemeProvider from "@/components/ThemeProvider";
import PopupForm from "@/components/PopupForm";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // show popup whenever route changes
    setShowPopup(true);
  }, [pathname]);

  return (
    <>
      <ThemeProvider>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main
            id="main-content"
            role="main"
            className="flex-grow bg-white dark:bg-gray-900 pb-16 xs:pb-16 sm:pb-20 md:pb-0 lg:pb-0"
          >
            {children}
          </main>
          <Footer />
          <FloatingActions />
          <StickyActions
            position="bottom"
            franchiseHref="/franchise"
            productHref="/products"
          />
        </div>
      </ThemeProvider>

      {/* Popup Form */}
      {showPopup && (
        <PopupForm
          onClose={() => setShowPopup(false)} // close only when user clicks close
        />
      )}

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
