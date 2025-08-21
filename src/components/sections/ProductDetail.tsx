"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  HeartIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";

/* ─────────────────── Types ─────────────────── */
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category?: string;
  rating?: number;
  reviews?: number;
  weight?: string;
  features?: string[];
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  street: string;
  landmark: string;
  city: string;
  pincode: string;
}

interface ProductDetailProps {
  isOpen?: boolean;
  onClose?: () => void;
  product?: Product | null;
}

/* ─────────────────── Constants ─────────────────── */
const FORM_FIELDS = [
  {
    label: "Full Name",
    name: "name" as keyof FormData,
    type: "text",
    placeholder: "Enter your complete name",
    required: true,
    icon: "👤",
  },
  {
    label: "Mobile Number",
    name: "mobile" as keyof FormData,
    type: "tel",
    placeholder: "10-digit mobile number",
    required: true,
    icon: "📱",
  },
  {
    label: "Email Address",
    name: "email" as keyof FormData,
    type: "email",
    placeholder: "your.email@example.com",
    required: false,
    icon: "📧",
  },
  {
    label: "Street Address",
    name: "street" as keyof FormData,
    type: "text",
    placeholder: "House no., Street, Area",
    required: true,
    icon: "🏠",
  },
  {
    label: "Landmark",
    name: "landmark" as keyof FormData,
    type: "text",
    placeholder: "Near famous location (optional)",
    required: false,
    icon: "📍",
  },
] as const;

/* ─────────────────── Component ─────────────────── */
export default function ProductDetail({
  isOpen = false,
  onClose = () => {},
  product = null,
}: ProductDetailProps) {
  /* State Management */
  const [qty, setQty] = useState<number>(1);
  const [form, setForm] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    street: "",
    landmark: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  /* Effects */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset state when modal opens
      setQty(1);
      setForm({
        name: "",
        mobile: "",
        email: "",
        street: "",
        landmark: "",
        city: "",
        pincode: "",
      });
      setErrors({});
      setSuccess(false);
      setActiveStep(1);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /* Event Handlers */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      // Clear specific field error
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const handleQtyChange = useCallback((delta: number) => {
    setQty((prev) => Math.max(1, Math.min(10, prev + delta)));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Partial<FormData> = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Mobile validation
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile = "Enter valid 10-digit Indian mobile number";
    }

    // Email validation (optional but if provided should be valid)
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Enter valid email address";
    }

    // Address validations
    if (!form.street.trim()) {
      newErrors.street = "Street address is required";
    } else if (form.street.trim().length < 10) {
      newErrors.street = "Please provide complete address";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    } else if (form.city.trim().length < 2) {
      newErrors.city = "Enter valid city name";
    }

    // Pincode validation
    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[1-9][0-9]{5}$/.test(form.pincode.trim())) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validate()) {
        // Scroll to first error field
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const element = document.querySelector(
            `[name="${firstErrorField}"]`,
          ) as HTMLElement;
          element?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      setLoading(true);

      try {
        // Simulate API call with realistic delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSuccess(true);
        setActiveStep(3);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Order submission failed:", error);
      } finally {
        setLoading(false);
      }
    },
    [validate, errors],
  );

  const handleClose = useCallback(() => {
    if (!loading) {
      onClose();
      // Reset success state after modal closes
      setTimeout(() => {
        setSuccess(false);
        setActiveStep(1);
      }, 300);
    }
  }, [loading, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && !loading) {
        handleClose();
      }
    },
    [handleClose, loading],
  );

  const toggleWishlist = useCallback(() => {
    setWishlist((prev) => !prev);
  }, []);

  // Calculate discount percentage (commented out as it's not currently used)
  // const discountPercent = product?.originalPrice
  //   ? Math.round(
  //       ((product.originalPrice - product.price) / product.originalPrice) * 100,
  //     )
  //   : 0;

  // Render stars helper
  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 * i }}
      >
        {i < Math.floor(rating) ? (
          <StarIconSolid className="h-5 w-5 text-amber-400" />
        ) : (
          <StarIcon className="h-5 w-5 text-gray-300" />
        )}
      </motion.div>
    ));
  };

  /* Main Render */
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Enhanced Backdrop with Amber Tint */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-7xl mx-4 sm:mx-8 max-h-[95vh] overflow-hidden"
            initial={{ scale: 0.85, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
              duration: 0.6,
            }}
          >
            {/* Modal Card - Amber Theme */}
            <div
              className="relative bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 rounded-3xl shadow-2xl border-2 border-amber-200/50 overflow-hidden backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Amber Theme */}
              <motion.button
                onClick={handleClose}
                disabled={loading}
                className="absolute right-4 top-4 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 border-2 border-amber-200 shadow-lg hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close modal"
              >
                <XMarkIcon className="h-6 w-6 text-amber-700 group-hover:text-amber-800 transition-colors" />
              </motion.button>

              {/* Progress Steps - Amber Theme */}
              <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 border-b-2 border-amber-200 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4">
                  {[
                    { step: 1, label: "Product", icon: "🛍️" },
                    { step: 2, label: "Details", icon: "📝" },
                    { step: 3, label: "Success", icon: "✅" },
                  ].map(({ step, label, icon }) => (
                    <div key={step} className="flex items-center">
                      <motion.div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          activeStep >= step
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white shadow-lg"
                            : "bg-white/80 border-amber-300 text-amber-600"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        animate={{
                          scale: activeStep === step ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-sm font-bold">
                          {activeStep >= step ? icon : step}
                        </span>
                      </motion.div>
                      <span
                        className={`ml-2 text-sm font-bold ${
                          activeStep >= step
                            ? "text-amber-700"
                            : "text-amber-500"
                        }`}
                      >
                        {label}
                      </span>
                      {step < 3 && (
                        <motion.div
                          className={`mx-4 w-8 h-1 rounded-full ${
                            activeStep > step
                              ? "bg-gradient-to-r from-amber-400 to-orange-400"
                              : "bg-amber-200"
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeStep > step ? 1 : 0.3 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                {success ? (
                  /* Success State - Amber Theme */
                  <motion.div
                    className="p-12 text-center bg-gradient-to-br from-amber-50 to-orange-50"
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.div
                      className="relative mx-auto w-24 h-24 mb-8"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full animate-pulse" />
                      <CheckCircleIcon className="w-24 h-24 text-amber-600 relative z-10" />
                    </motion.div>

                    <motion.h3
                      className="text-4xl font-black text-amber-900 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Order Placed Successfully! 🎉
                    </motion.h3>

                    <motion.p
                      className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Thank you for ordering{" "}
                      <span className="font-bold text-amber-600">
                        {product?.name}
                      </span>
                      . Our team will contact you within 24 hours to confirm
                      your order and arrange delivery.
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap items-center justify-center gap-6 mb-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {[
                        {
                          icon: <ShieldCheckIcon className="h-5 w-5" />,
                          text: "Secure & Protected",
                        },
                        {
                          icon: <TruckIcon className="h-5 w-5" />,
                          text: "Fast Delivery",
                        },
                        {
                          icon: <StarIcon className="h-5 w-5" />,
                          text: "Quality Guaranteed",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-amber-700 bg-white/60 px-3 py-2 rounded-full border border-amber-200"
                        >
                          {item.icon}
                          <span className="font-medium">{item.text}</span>
                        </div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <motion.button
                        onClick={handleClose}
                        className="px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white rounded-2xl font-bold text-lg shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue Shopping
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ) : (
                  /* Main Content */
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Product Display - Amber Theme */}
                    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-r-2 border-amber-200 p-8 lg:p-12">
                      {/* Product Image */}
                      <motion.div
                        className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl bg-white shadow-xl border-2 border-amber-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Image
                          src={product?.image || "/images/placeholder.png"}
                          alt={product?.name || "Product"}
                          fill
                          className="object-contain p-8"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/placeholder.png";
                          }}
                        />

                        {/* Wishlist Button - Amber Theme */}
                        <motion.button
                          onClick={toggleWishlist}
                          className="absolute top-4 right-4 w-12 h-12 bg-white/90 border-2 border-amber-200 rounded-full flex items-center justify-center shadow-lg hover:border-red-300 hover:bg-red-50 transition-colors backdrop-blur-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {wishlist ? (
                            <HeartIconSolid className="h-6 w-6 text-red-500" />
                          ) : (
                            <HeartIcon className="h-6 w-6 text-amber-600" />
                          )}
                        </motion.button>
                      </motion.div>

                      {/* Product Info - Amber Theme */}
                      <motion.div
                        className="mt-8 space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.3,
                        }}
                      >
                        <div className="text-center">
                          <h3 className="text-3xl font-black text-amber-900 mb-2">
                            {product?.name || "Product Name"}
                          </h3>

                          {product?.category && (
                            <p className="text-amber-700 font-semibold text-lg bg-amber-100 inline-block px-4 py-1 rounded-full">
                              {product.category}
                            </p>
                          )}

                          {/* Rating */}
                          {product?.rating && (
                            <div className="flex items-center justify-center gap-2 mt-2">
                              <div className="flex gap-1">
                                {renderStars(product.rating)}
                              </div>
                              <span className="text-sm text-amber-700 font-medium">
                                {product.rating} ({product.reviews || 0}{" "}
                                reviews)
                              </span>
                            </div>
                          )}

                          <p className="text-amber-800 leading-relaxed max-w-lg mx-auto mt-4 bg-white/60 p-4 rounded-xl border border-amber-200">
                            {product?.description ||
                              "Premium quality product crafted with care."}
                          </p>
                        </div>

                        {/* Features - Amber Theme */}
                        {product?.features && product.features.length > 0 && (
                          <div className="flex flex-wrap gap-2 justify-center">
                            {product.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 text-amber-700 px-3 py-1 rounded-full font-medium"
                              >
                                ✓ {feature}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price & Quantity - Amber Theme */}
                        <div className="bg-white/80 border-2 border-amber-200 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                          <div className="flex items-center justify-between mb-6">
                            <div className="text-left">
                              <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-4xl font-black text-amber-600">
                                  ₹{(product?.price ?? 0).toLocaleString()}
                                </span>
                                {product?.originalPrice &&
                                  product.originalPrice > product.price && (
                                    <span className="text-xl text-gray-500 line-through">
                                      ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                              </div>
                              {product?.weight && (
                                <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
                                  Price per {product.weight}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center rounded-xl border-2 border-amber-200 overflow-hidden bg-white shadow-md">
                              <motion.button
                                onClick={() => handleQtyChange(-1)}
                                disabled={qty === 1}
                                className="p-3 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                whileHover={qty > 1 ? { scale: 1.1 } : {}}
                                whileTap={qty > 1 ? { scale: 0.9 } : {}}
                              >
                                <MinusIcon className="h-5 w-5 text-amber-700" />
                              </motion.button>
                              <div className="px-6 py-3 font-bold text-lg min-w-[60px] text-center text-amber-900 bg-amber-50">
                                {qty}
                              </div>
                              <motion.button
                                onClick={() => handleQtyChange(1)}
                                disabled={qty >= 10}
                                className="p-3 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                whileHover={qty < 10 ? { scale: 1.1 } : {}}
                                whileTap={qty < 10 ? { scale: 0.9 } : {}}
                              >
                                <PlusIcon className="h-5 w-5 text-amber-700" />
                              </motion.button>
                            </div>
                          </div>

                          <div className="text-center border-t border-amber-200 pt-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3">
                            <span className="text-2xl font-bold text-amber-700">
                              Total: ₹
                              {((product?.price ?? 0) * qty).toLocaleString()}
                            </span>
                            {qty > 1 && (
                              <p className="text-sm text-amber-600 mt-1">
                                ₹{(product?.price ?? 0).toLocaleString()} ×{" "}
                                {qty} items
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Order Form - Amber Theme */}
                    <div className="p-8 lg:p-12 bg-white">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.4,
                        }}
                      >
                        <div className="mb-8">
                          <h3 className="text-3xl font-black text-amber-900 mb-2">
                            Delivery Information
                          </h3>
                          <p className="text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                            Please provide your details for fast and secure
                            delivery
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Form Fields - Amber Theme */}
                          {FORM_FIELDS.map((field, index) => (
                            <motion.div
                              key={field.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.05 }}
                            >
                              <label className="block text-sm font-bold text-amber-800 mb-2">
                                <span className="flex items-center gap-2">
                                  <span>{field.icon}</span>
                                  {field.label}
                                  {field.required && (
                                    <span className="text-red-500">*</span>
                                  )}
                                </span>
                              </label>
                              <div className="relative">
                                <input
                                  type={field.type}
                                  name={field.name}
                                  placeholder={field.placeholder}
                                  value={form[field.name]}
                                  onChange={handleChange}
                                  className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white ${
                                    errors[field.name]
                                      ? "border-red-300 bg-red-50"
                                      : "border-amber-200 hover:border-amber-300"
                                  }`}
                                  required={field.required}
                                  autoComplete={
                                    field.name === "email"
                                      ? "email"
                                      : field.name === "mobile"
                                        ? "tel"
                                        : "on"
                                  }
                                />
                              </div>
                              <AnimatePresence>
                                {errors[field.name] && (
                                  <motion.p
                                    className="mt-2 text-xs text-red-600 flex items-center gap-1 bg-red-50 p-2 rounded-lg"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                  >
                                    <span>⚠️</span>
                                    {errors[field.name]}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}

                          {/* City & Pincode Grid - Amber Theme */}
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              {
                                label: "City",
                                name: "city" as keyof FormData,
                                placeholder: "Your city",
                                icon: "🏙️",
                              },
                              {
                                label: "Pincode",
                                name: "pincode" as keyof FormData,
                                placeholder: "6-digit code",
                                icon: "📮",
                              },
                            ].map((field, index) => (
                              <motion.div
                                key={field.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                              >
                                <label className="block text-sm font-bold text-amber-800 mb-2">
                                  <span className="flex items-center gap-2">
                                    <span>{field.icon}</span>
                                    {field.label}{" "}
                                    <span className="text-red-500">*</span>
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name={field.name}
                                  placeholder={field.placeholder}
                                  value={form[field.name]}
                                  onChange={handleChange}
                                  className={`w-full rounded-xl border-2 px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white ${
                                    errors[field.name]
                                      ? "border-red-300 bg-red-50"
                                      : "border-amber-200 hover:border-amber-300"
                                  }`}
                                  required
                                />
                                <AnimatePresence>
                                  {errors[field.name] && (
                                    <motion.p
                                      className="mt-2 text-xs text-red-600 flex items-center gap-1 bg-red-50 p-2 rounded-lg"
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                    >
                                      <span>⚠️</span>
                                      {errors[field.name]}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            ))}
                          </div>

                          {/* Submit Button - Amber Theme */}
                          <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold text-lg shadow-xl hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            onClick={() => !loading && setActiveStep(2)}
                          >
                            {/* Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out" />

                            {loading ? (
                              <>
                                <svg
                                  className="h-6 w-6 animate-spin"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.3 0 .1 5.3.1 12H4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                                  />
                                </svg>
                                <span>Processing Order...</span>
                              </>
                            ) : (
                              <>
                                <span>🛒 Place Order Now</span>
                                <motion.span
                                  className="text-xl"
                                  animate={{ x: [0, 4, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  →
                                </motion.span>
                              </>
                            )}
                          </motion.button>

                          {/* Security & Info - Amber Theme */}
                          <motion.div
                            className="space-y-4 mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                          >
                            {/* Security Note */}
                            <div className="flex items-center justify-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                              <ShieldCheckIcon className="h-4 w-4" />
                              <span className="font-medium">
                                Your information is secure and encrypted
                              </span>
                            </div>

                            {/* Delivery Info */}
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
                              <div className="flex items-center gap-3 text-sm">
                                <TruckIcon className="h-5 w-5 text-amber-600" />
                                <div>
                                  <p className="font-bold text-amber-800">
                                    Free Delivery Available
                                  </p>
                                  <p className="text-amber-600">
                                    On orders above ₹999 • Delivery in 3-5
                                    business days
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </form>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
