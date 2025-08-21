import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Graduate Chai & Products",
  description:
    "Review the legal terms that govern your use of Graduate Chai & Products' website and services.",
};

export default function TermsOfService() {
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
            <span className="text-sm font-bold tracking-wide">LEGAL TERMS</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-amber-900 dark:text-amber-50 mb-6 tracking-tight leading-none">
            Terms of Service
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-amber-800 dark:text-amber-100 leading-relaxed max-w-4xl mx-auto">
            Please read these terms carefully before using our site and
            services.
          </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Acceptance of Terms",
              "Account Responsibilities",
              "Intellectual Property",
              "Orders & Payment",
              "Prohibited Conduct",
              "Limitation of Liability",
              "Governing Law",
              "Changes to Terms",
              "Contact Information",
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Acceptance of Terms
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Agreement to be bound by our terms
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                By accessing or using the Graduate Chai & Products website you
                agree to be bound by these Terms of Service and all applicable
                laws and regulations.
              </p>
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Account Responsibilities
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Your duties as a user of our platform
                </p>
              </div>
            </header>
            <div className="space-y-4">
              {[
                "You must be at least 18 years old to create an account.",
                "You are responsible for maintaining the confidentiality of your password and restricting access to your device.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl border border-amber-300/30 dark:border-amber-700/50"
                >
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                    {item}
                  </p>
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Intellectual Property
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Protection of our content and trademarks
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                All content on this site—including logos, graphics and product
                images—is the property of Graduate Chai & Products and is
                protected by Indian and international copyright laws.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section
            id="section-4"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0h-8"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Orders & Payment
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Terms regarding purchases and transactions
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                Prices are listed in Indian Rupees and are subject to change
                without notice. We reserve the right to refuse or cancel any
                order at our sole discretion.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section
            id="section-5"
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
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Prohibited Conduct
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Activities that are not allowed on our platform
                </p>
              </div>
            </header>
            <div className="space-y-4">
              {[
                "Misusing the site to transmit malware or spam.",
                "Infringing on the intellectual-property rights of others.",
                "Attempting to reverse-engineer our software.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl border border-amber-300/30 dark:border-amber-700/50"
                >
                  <svg
                    className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                  <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 */}
          <section
            id="section-6"
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Limitation of Liability
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Our liability limits and disclaimers
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                Graduate Chai & Products will not be liable for any indirect,
                incidental or consequential damages arising out of your use of
                the site.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section
            id="section-7"
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
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-3m3 3l3-3"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Governing Law
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Legal jurisdiction and applicable law
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                These Terms are governed by the laws of India. Any dispute shall
                be subject to the exclusive jurisdiction of the courts of
                Shirdi, Maharashtra.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section
            id="section-8"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Changes to Terms
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  How we may update these terms
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                We may revise these Terms at any time. Continued use of the site
                constitutes acceptance of the revised Terms.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section
            id="section-9"
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Contact Information
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  How to reach us with questions
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                Questions? Email{" "}
                <a
                  href="mailto:support@graduatechai.com"
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline transition-colors"
                >
                  support@graduatechai.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>

        {/* Contact CTA - Amber Theme */}
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
              Questions About These Terms?
            </h2>
            <p className="text-amber-100 text-xl mb-10 leading-relaxed">
              Our legal team is here to help clarify any questions about our
              terms of service.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:support@graduatechai.com"
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
                support@graduatechai.com
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
