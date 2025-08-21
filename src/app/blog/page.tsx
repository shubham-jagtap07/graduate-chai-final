// src/app/blog/page.tsx
"use client";

import { Search, Calendar, ArrowRight, Coffee } from "lucide-react";
import { useState } from "react";

/* ────────────────────────────────────────────────────────────────── */
/*  Types                                                            */
/* ────────────────────────────────────────────────────────────────── */
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  language: "en" | "hi" | "mr" | "kn";
  featured?: boolean;
}

/* ────────────────────────────────────────────────────────────────── */
/*  Featured-post data                                               */
/* ────────────────────────────────────────────────────────────────── */
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Chai Culture & Lifestyle",
    excerpt:
      "Why Chai is More Than Just a Drink India : Chai isn’t just a beverage—it’s an emotion. Across India, from college campuses to corporate offices, chai unites people, sparks conversations (Chai Pe Charcha!), and marks both beginnings and endings of every day. Discover why the tradition of chai is central to Indian lifestyle and how Graduate Chai celebrates this beautiful culture in every cup",
    category: "franchise",
    readTime: "5 min read",
    language: "en",
    featured: true,
  },
  {
    id: "2",
    title: "Student & Youth-Oriented Content",
    excerpt:
      "Best Study Hacks with a Cup of Chai : Struggling with late-night study sessions? See why students swear by the magic of chai to boost focus and refresh their minds. Graduate Chai’s special brews are scientifically proven to help you stay awake and motivated during crunch time.",
    category: "franchise",
    readTime: "3 min read",
    language: "en",
    featured: true,
  },
  // …add or remove featured posts as needed
];

const featuredPosts = blogPosts.filter((p) => p.featured);

/* ────────────────────────────────────────────────────────────────── */
/*  Component                                                        */
/* ────────────────────────────────────────────────────────────────── */
export default function BlogPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* ▸ Hero header */}
      <header className="bg-gradient-to-r from-amber-800 via-amber-700 to-orange-700 text-white">
        <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Coffee className="mr-4 h-12 w-12 text-amber-200" />
            <h1 className="text-5xl font-bold">Graduate Chai Blog</h1>
          </div>

          <p className="mb-8 text-xl text-amber-100">
            Delve into the world of tea – your gateway to authentic chai culture
            and franchise success.
          </p>

          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-full py-3 pl-12 pr-4 text-gray-800 focus:outline-none focus:ring-4 focus:ring-amber-300"
            />
          </div>
        </div>
      </header>

      {/* ▸ Featured cards (heading removed) */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl border-2 border-amber-100 bg-white shadow-lg transition-all duration-300 hover:border-amber-300 hover:shadow-2xl"
            >
              <div className="h-2 bg-gradient-to-r from-amber-600 to-orange-500" />

              <div className="p-8">
                <div className="mb-4 flex items-center">
                  <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                    {post.category[0].toUpperCase() + post.category.slice(1)}
                  </span>
                  <span className="ml-auto flex items-center text-sm text-amber-600">
                    <Calendar className="mr-1 h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mb-4 text-xl font-bold text-gray-800 transition-colors group-hover:text-amber-700">
                  {post.title}
                </h3>

                <p className="mb-6 leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>

                <button className="group flex items-center font-semibold text-amber-700 transition-colors hover:text-amber-800">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* optional CTA button */}
        <div className="mt-16 text-center">
          <button className="rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-amber-700 hover:to-orange-700 hover:shadow-xl">
            View All Articles
          </button>
        </div>

        {/* ▸ Franchise CTA */}
        <section className="mt-24 rounded-3xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 p-8 text-center text-white shadow-2xl md:p-12">
          <div className="mx-auto max-w-3xl">
            <Coffee className="mx-auto mb-6 h-16 w-16 text-amber-200" />
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Start Your Tea Franchise Journey?
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-amber-100">
              We’ll guide you through selection, prerequisites, and investment
              details. Fill out the form below and we’ll reach out.
            </p>

            <form className="mx-auto space-y-4 rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:max-w-md">
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-amber-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-amber-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-amber-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="w-full transform rounded-lg bg-white px-6 py-3 font-bold text-amber-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber-50"
              >
                GET A FRANCHISE
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
