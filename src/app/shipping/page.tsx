import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Graduate Chai & Products",
  description:
    "Understand our shipping timelines, charges and delivery coverage across India.",
};

export default function ShippingPolicy() {
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="text-sm font-bold tracking-wide">
              FAST DELIVERY
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-amber-900 dark:text-amber-50 mb-6 tracking-tight leading-none">
            Shipping Policy
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-amber-800 dark:text-amber-100 leading-relaxed max-w-4xl mx-auto">
            Everything you need to know about how your chai reaches you.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Serviceable Locations",
              "Processing Time",
              "Delivery Timelines",
              "Shipping Charges",
              "Order Tracking",
              "Damaged Parcels",
              "International Shipping",
              "Contact Support",
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Serviceable Locations
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Where we deliver across India
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                We currently ship to all major cities and towns across India via
                leading courier partners. Remote areas may have extended
                delivery times.
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Processing Time
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  How quickly we prepare your order
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                Orders are processed within{" "}
                <strong className="text-amber-800 dark:text-amber-200">
                  24 hours
                </strong>{" "}
                on business days (Mon – Sat). Orders placed after 4 PM are
                rolled to the next business day.
              </p>
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Delivery Timelines
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Expected delivery times by location
                </p>
              </div>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  region: "Maharashtra & Adjoining States",
                  time: "2-4 working days",
                  icon: "⚡",
                },
                {
                  region: "Metro Cities",
                  time: "3-6 working days",
                  icon: "🏙️",
                },
                {
                  region: "Rest of India",
                  time: "5-8 working days",
                  icon: "🚚",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl border border-amber-300/30 dark:border-amber-700/50 text-center"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                    {item.region}
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 font-semibold">
                    {item.time}
                  </p>
                </div>
              ))}
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Shipping Charges
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Transparent pricing for deliveries
                </p>
              </div>
            </header>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-8 bg-green-100 dark:bg-green-900/30 rounded-2xl border border-green-300/30 dark:border-green-700/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                    FREE Shipping
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    On orders ≥ ₹499
                  </p>
                </div>
              </div>
              <div className="p-8 bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl border border-amber-300/30 dark:border-amber-700/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">₹40</span>
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    Standard Rate
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200">
                    Orders below ₹499
                  </p>
                </div>
              </div>
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
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Order Tracking
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Stay updated on your shipment
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                A tracking link is emailed/SMSed once your parcel is handed over
                to the courier. Delay beyond 48 hours? Contact us and we'll
                escalate.
              </p>
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
                  Damaged or Lost Parcels
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  We've got you covered
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                If your package arrives damaged, photograph the parcel and
                contact us within 48 hours for a replacement or refund, as
                applicable.
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  International Shipping
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Coming soon to global markets
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                We do not ship internationally at this time. Sign up to our
                newsletter for future updates.
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
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  Contact Support
                </h2>
                <p className="text-lg text-amber-700 dark:text-amber-300">
                  Get help with shipping questions
                </p>
              </div>
            </header>
            <div className="bg-amber-200/40 dark:bg-amber-900/30 rounded-2xl p-8 border border-amber-300/30 dark:border-amber-700/50">
              <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                Shipping queries? Email{" "}
                <a
                  href="mailto:shipping@graduatechai.com"
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline transition-colors"
                >
                  shipping@graduatechai.com
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+919730636550"
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline transition-colors"
                >
                  +91 97306 36550
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Questions About Shipping?
            </h2>
            <p className="text-amber-100 text-xl mb-10 leading-relaxed">
              Our shipping team is here to help with tracking, delivery times,
              and any concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:shipping@graduatechai.com"
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
                shipping@graduatechai.com
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
