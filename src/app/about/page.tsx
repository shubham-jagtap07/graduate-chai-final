"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/20 flex flex-col items-center py-10 px-4">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl ring-1 ring-amber-200/50 dark:ring-amber-700/40 px-6 py-10 md:px-12 md:py-14 mb-12"
      >
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-amber-700 mb-3 font-serif">
            "Discover Our Essence: Unveiling Graduate&nbsp;Chai!"
          </h1>
          <p className="text-xl font-bold tracking-wide text-amber-600 font-serif">
            Graduate&nbsp;Chai!
          </p>
        </header>

        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg font-serif">
          Rooted in a humble village, Graduate Chai sprouted from the dreams of
          a small community. From a modest beginning, we've blossomed into
          Maharashtra's leading premium tea brand and grown our journey
          nationwide. Driven by a spirit of resilience and a strong business
          ethic, the path we've walked is one of inspiration. Our journey
          includes moments of adversity, learning, and triumph, resulting in a
          thriving business, creating job opportunities, and warm connections
          across India. Join us in celebrating the memory of resilience, hope,
          and the power of dreams.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed font-serif mb-10"
        >
          <p className="text-base">
            Belonging to a Poor and labourer simple Maharashtrian family, We
            always wanted to help our families financially. We tried every
            possible job, losing in mind only earning, having long working
            hours, food and taking rest little but brains full of creative but
            big goals. The spark was always there. Sometimes frustration,
            struggle, food, work, and the right time for that one big shot. But
            couldn't manage the wheel of finance fully. Business was risky and
            had the work was not satisfactory.
          </p>
          <p className="text-base">
            So then something unique, different and creative. The KAKA
            (Founder), We decided to launch our own tea business, with an online
            ordering system and a special digital discount offer. "Kaka Graduate
            Chai" (Founder Kaka) behind the business. We aimed to create an
            impact, not just with our tea, but with our story and vision.
          </p>
          <p className="text-base">
            As we grew, we realized we could create jobs and support other
            families. We believe in the power of dreams and the love that goes
            into every cup. We're grateful for the support of our customers, our
            team, and our families. Our journey is a testament to the strength
            of community and the belief that anything is possible when you work
            together.
          </p>
          <p className="text-base">
            Today, Graduate Chai has expanded to 3 cities and continues to grow.
            If obstacles try to keep us fixed in one place, we rise above and
            find new ways to serve. Our mission is to spread love and flavor,
            one cup at a time. For all the people who supported us, we are
            forever grateful. Our story is just beginning, and we invite you to
            be a part of it.
          </p>
          <p className="text-base font-medium text-amber-800 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border-l-4 border-amber-600">
            If you are also concerned with this story, then support us and
            together, let's do something unique, unafraid, absolute passion, and
            a burning desire for financial stability and success. If you have
            any queries or ideas for the future, don't hesitate to reach out.
            Make your dreams come true.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link href="/contact" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-serif text-lg"
              aria-label="Go to Contact page"
            >
              Book A Call
            </motion.a>
          </Link>
        </motion.div>
      </motion.article>
    </section>
  );
}
