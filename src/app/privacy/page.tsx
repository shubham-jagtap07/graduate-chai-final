// src/app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Graduate Chai & Products",
  description:
    "Learn how Graduate Chai & Products collects, uses, and protects your personal information when you visit our site or place an order.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── Hero Section with Amber Theme ─────────────────────── */}
      <section className="bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 dark:from-amber-900 dark:via-amber-800 dark:to-amber-700 py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-600 text-white rounded-full px-5 py-2 mb-8 shadow-lg">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-bold tracking-wide">
              100% TRANSPARENT
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-amber-900 dark:text-amber-50 mb-6 tracking-tight leading-none">
            Privacy Policy
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-amber-800 dark:text-amber-100 leading-relaxed max-w-4xl mx-auto mb-4">
            Your privacy matters to us. Learn how we protect your data.
          </p>

          {/* Last Updated */}
          <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-amber-900/30 rounded-full px-4 py-2 text-sm text-amber-800 dark:text-amber-200 backdrop-blur-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0v1a2 2 0 002 2h4a2 2 0 002-2V7m-6 0h6M9 12l2 2 4-4"
              />
            </svg>
            Last updated: August 8, 2025
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-6 py-20">
        {/* Quick Navigation - Amber Theme */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-3xl p-10 mb-20 border border-amber-300/30 dark:border-amber-700/50 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Information We Collect",
              "How We Use Your Information",
              "Cookies & Tracking",
              "Sharing of Information",
              "Data Retention & Security",
              "Your Choices & Rights",
              "Children's Privacy",
              "Changes to This Policy",
            ].map((item, idx) => (
              <a
                key={idx}
                href={`#section-${idx + 1}`}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-white/80 dark:bg-amber-900/20 hover:bg-amber-200/60 dark:hover:bg-amber-800/40 transition-all duration-300 border border-amber-200/50 dark:border-amber-700/30 shadow-sm hover:shadow-lg"
              >
                <span className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform shadow-md">
                  {idx + 1}
                </span>
                <span className="font-medium text-amber-900 dark:text-amber-100 text-sm">
                  {item}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-16">
          <div className="bg-amber-100/60 dark:bg-amber-900/20 border-l-4 border-amber-500 p-8 rounded-r-2xl">
            <p className="text-lg leading-relaxed text-amber-900 dark:text-amber-100">
              Graduate Chai & Products ("<strong>we</strong>", "
              <strong>our</strong>", "<strong>us</strong>") respects your
              privacy and is committed to protecting the personal information
              you share with us. This Privacy Policy explains what information
              we collect, why we collect it, how we use it, and the choices you
              have.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section
            id="section-1"
            className="bg-gradient-to-br from-white via-amber-50/30 to-amber-100/30 dark:from-gray-800 dark:via-amber-900/10 dark:to-amber-900/20 rounded-3xl p-12 shadow-xl border border-amber-200/40 dark:border-amber-700/30"
          >
            <header className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Information We Collect
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Data we gather to provide you the best service
                </p>
              </div>
            </header>
            <div className="space-y-6">
              {[
                {
                  title: "Information you provide directly",
                  desc: "Name, mailing address, phone number, email address, payment details, and any other information you choose to give us (e.g. while contacting customer support or filling out a form).",
                },
                {
                  title: "Device & usage data",
                  desc: "IP address, browser type, referring/exit pages, and date/time stamps, collected automatically via cookies and similar technologies.",
                },
                {
                  title: "Transactional information",
                  desc: "Order IDs, products purchased, delivery preferences, and associated payment confirmations.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-6 bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl border border-amber-300/30 dark:border-amber-700/50"
                >
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-lg text-amber-800 dark:text-amber-200 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section
            id="section-2"
            className="bg-gradient-to-br from-white via-amber-50/30 to-amber-100/30 dark:from-gray-800 dark:via-amber-900/10 dark:to-amber-900/20 rounded-3xl p-12 shadow-xl border border-amber-200/40 dark:border-amber-700/30"
          >
            <header className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  How We Use Your Information
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Ways we utilize your data to enhance your experience
                </p>
              </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Process and deliver your orders",
                "Respond to support enquiries and provide customer service",
                "Improve our products, services, and user experience (analytics)",
                "Send important updates, invoices, and promotional offers",
                "Detect, prevent, and address fraud, security, or technical issues",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-amber-200/40 dark:bg-amber-900/30 rounded-xl border border-amber-300/30 dark:border-amber-700/50"
                >
                  <svg
                    className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-amber-900 dark:text-amber-100 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section
            id="section-3"
            className="bg-gradient-to-br from-white via-amber-50/30 to-amber-100/30 dark:from-gray-800 dark:via-amber-900/10 dark:to-amber-900/20 rounded-3xl p-12 shadow-xl border border-amber-200/40 dark:border-amber-700/30"
          >
            <header className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Cookies & Tracking
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  How we use cookies to improve your experience
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                We use first- and third-party cookies (e.g. Google Analytics) to
                understand site traffic patterns and measure campaign
                performance. You may disable cookies in your browser settings,
                but the site may not function as intended.
              </p>
            </div>
          </section>

          {/* Continue with remaining sections following same pattern... */}
        </div>

        {/* Contact Section - Amber Theme */}
        <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-16 text-center text-white mt-20 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Questions About Your Privacy?
            </h2>
            <p className="text-amber-100 text-xl mb-10 leading-relaxed">
              We're here to help. Reach out to us for any privacy-related
              concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:privacy@graduatechai.com"
                className="inline-flex items-center gap-4 bg-white text-amber-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-amber-50 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                privacy@graduatechai.com
              </a>
              <a
                href="tel:+919730636550"
                className="inline-flex items-center gap-4 bg-amber-700/50 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-lg border-2 border-white/30 hover:bg-amber-800/50 transition-all duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (+91) 97306 36550
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
