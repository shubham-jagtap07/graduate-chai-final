// src/app/blog/page.tsx (repurposed as Distributorship)
"use client";

import { useState } from "react";
import { Coffee } from "lucide-react";

export default function DistributorshipPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Distributorship",
    message: "",
  });
  const [status, setStatus] = useState<"" | "sending" | "success" | "error">("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("sending");
    try {
      const res = await fetch('/api/backend/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: 'Distributorship',
          message: form.message.trim(),
          source: 'contact'
        })
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: "", email: "", phone: "", subject: "Distributorship", message: "" });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 via-amber-700 to-orange-700 text-white">
        <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <Coffee className="mr-4 h-12 w-12 text-amber-200" />
            <h1 className="text-5xl font-bold">Distributorship</h1>
          </div>
          <p className="mb-2 text-lg text-amber-100">
            Partner with Graduate Chai as an official distributor in your region.
          </p>
          <p className="text-amber-100">Fill the form below and we’ll contact you within 24 hours.</p>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-4 py-12">
        <section className="rounded-3xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 p-6 md:p-10 text-white shadow-2xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-center">Distributorship Enquiry</h2>
            <form onSubmit={handleSubmit} className="mx-auto space-y-4 rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:max-w-xl">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  required
                  className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-amber-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-amber-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-amber-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white backdrop-blur-sm focus:outline-none"
                >
                  <option value="Distributorship">Distributorship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Message (optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your location, experience, and interest."
                  className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-amber-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full transform rounded-lg bg-white px-6 py-3 font-bold text-amber-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber-50"
              >
                {isLoading ? 'Sending...' : 'Send Request'}
              </button>
              {status === 'success' && (
                <p className="text-green-100 text-center">Thank you! We'll contact you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-100 text-center">Something went wrong. Try again.</p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
