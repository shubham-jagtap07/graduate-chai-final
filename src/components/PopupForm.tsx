"use client";
import { useEffect, useRef, useState } from "react";

interface PopupFormProps {
  onClose: () => void;
}

type Field = "name" | "phone" | "city" | "message";

export default function PopupForm({ onClose }: PopupFormProps) {
  // ─────────────────────────────────── FORM STATE
  const [data, setData] = useState<Record<Field, string>>({
    name: "",
    phone: "",
    city: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const liveRef = useRef<HTMLParagraphElement>(null);

  // ─────────────────────────────────── HELPERS
  const validate = () => {
    const next: Partial<Record<Field, string>> = {};

    // Only phone is required per your earlier logic
    if (!data.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(data.phone.trim())) {
      next.phone = "Please enter a 10-digit number.";
    }

    return next;
  };

  // ─────────────────────────────────── HANDLERS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target as { name: Field; value: string };
    setData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setSuccess(false); // hide success if user starts typing again
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      liveRef.current?.focus(); // announce first error
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // ✅ Do NOT auto-close
      setSuccess(true);
      setData({ name: "", phone: "", city: "", message: "" });
    } catch {
      // You can surface an error toast here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────────── UX ENHANCEMENTS
  // close on ⎋ or outside-click
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const click = (e: MouseEvent) =>
      (e.target as HTMLElement).dataset.overlay && onClose();
    window.addEventListener("keydown", key);
    window.addEventListener("mousedown", click);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("mousedown", click);
    };
  }, [onClose]);

  // trap focus inside modal
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      "button, input, textarea, [href], [tabindex]:not([tabindex='-1'])",
    );
    const focusableArray = Array.from(focusable);
    const firstFocusable = focusableArray[0];
    const lastFocusable = focusableArray[focusableArray.length - 1];

    // Focus first element when modal opens
    firstFocusable?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        (lastFocusable as HTMLElement | undefined)?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        (firstFocusable as HTMLElement | undefined)?.focus();
      }
    };

    el.addEventListener("keydown", trap);
    return () => el.removeEventListener("keydown", trap);
  }, []);

  // ─────────────────────────────────── RENDER
  return (
    <div
      data-overlay
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/60 backdrop-blur-sm px-2 sm:px-3 pt-10 pb-4"
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full 
                   max-w-[240px] xs:max-w-xs sm:max-w-sm md:max-w-md
                   overflow-y-auto max-h-[75vh]
                   rounded-lg sm:rounded-xl
                   bg-gradient-to-br from-white via-amber-50/30 to-orange-50/40 
                   dark:from-gray-900 dark:via-amber-950/30 dark:to-orange-950/40
                   backdrop-blur-md
                   border border-amber-200/50 dark:border-amber-800/50
                   shadow-xl shadow-amber-500/20 dark:shadow-amber-900/40
                   p-3 sm:p-4 md:p-5
                   animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 
                     text-gray-400 hover:text-amber-600 dark:text-gray-500 dark:hover:text-amber-400
                     transition-colors duration-200 
                     p-1.5 rounded-full hover:bg-amber-100/80 dark:hover:bg-amber-900/40
                     disabled:opacity-50 z-10"
          aria-label="Close dialog"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Live regions */}
        <p ref={liveRef} aria-live="assertive" className="sr-only">
          {Object.values(errors)[0]}
        </p>

        {success && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-3 rounded-md bg-green-100 dark:bg-green-900/60 
                       text-green-800 dark:text-green-100 text-sm px-3 py-2"
          >
            ✅ Your message has been sent successfully.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Enter your full name"
              className="w-full px-2.5 py-2 text-sm 
                         bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                         border border-amber-200 dark:border-amber-800
                         rounded-md
                         text-gray-900 dark:text-white
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="phone"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              inputMode="numeric"
              pattern="[0-9]{10}"
              value={data.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Enter 10-digit number"
              className={`w-full px-2.5 py-2 text-sm rounded-md
                         bg-white/90 dark:bg-gray-800/90 
                         border ${
                           errors.phone
                             ? "border-red-500 focus:ring-red-500"
                             : "border-amber-200 dark:border-amber-800"
                         }
                         text-gray-900 dark:text-white`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="city"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={data.city}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Enter your city"
              className="w-full px-2.5 py-2 text-sm 
                         bg-white/90 dark:bg-gray-800/90 
                         border border-amber-200 dark:border-amber-800
                         rounded-md text-gray-900 dark:text-white
                         placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="message"
            >
              Message{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              value={data.message}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Type your message..."
              className="w-full px-2.5 py-2 text-sm resize-none
                         bg-white/90 dark:bg-gray-800/90 
                         border border-amber-200 dark:border-amber-800
                         rounded-md text-gray-900 dark:text-white
                         placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-3 py-2 text-sm font-medium
                         text-gray-700 dark:text-gray-200
                         bg-gray-100 dark:bg-gray-700
                         border border-gray-300 dark:border-gray-600
                         rounded-md hover:bg-gray-200 dark:hover:bg-gray-600
                         disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-3 py-2 text-sm font-semibold
                         text-white rounded-md
                         bg-gradient-to-r from-amber-500 via-orange-500 to-red-500
                         hover:from-amber-600 hover:via-orange-600 hover:to-red-600
                         disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
