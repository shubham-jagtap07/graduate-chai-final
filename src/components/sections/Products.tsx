"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import SectionTransition from "../animations/SectionTransition";
import OrderForm from "../OrderForm";

/* ─────────────────── Types ─────────────────── */
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  popular: boolean;
  weight: string;
  features: string[];
  rating: number;
  reviews: number;
  tags: string[];
}

interface ProductWithDiscount extends Product {
  discountPercent: number;
  savings: number;
}

interface OrderModalState {
  open: boolean;
  product: string;
  image: string;
  price: number;
  originalPrice: number;
  weight: string;
}

/* ─────────────────── Component ─────────────────── */
export default function Products() {
  /* ── Raw data ── */
  const rawProducts: Product[] = useMemo(
    () => [
      {
        id: 1,
        name: "Chai Sukh",
        description:
          "Premium jaggery-sweetened blend crafted with finest tea leaves and pure gur for an authentic taste experience.",
        price: 225,
        originalPrice: 250,
        image: "/images/gram500.webp",
        popular: true,
        weight: "500g",
        features: ["Natural Jaggery", "Premium Quality", "Rich Flavor"],
        rating: 4.8,
        reviews: 156,
        tags: ["Bestseller", "Organic"],
      },
      {
        id: 2,
        name: "Jaggery Premix",
        description:
          "Signature premix delivering rich aroma and authentic taste in every cup. Perfect blend for tea connoisseurs.",
        price: 320,
        originalPrice: 400,
        image: "/images/gram900.webp",
        popular: true,
        weight: "900g",
        features: ["Premium Blend", "Rich Aroma", "Perfect Taste"],
        rating: 4.9,
        reviews: 203,
        tags: ["Large Pack", "Value"],
      },
    ],
    [],
  );

  /* ── Derived data ── */
  const products: ProductWithDiscount[] = useMemo(
    () =>
      rawProducts.map((p) => ({
        ...p,
        discountPercent: Math.round(
          ((p.originalPrice - p.price) / p.originalPrice) * 100,
        ),
        savings: p.originalPrice - p.price,
      })),
    [rawProducts],
  );

  /* ── Local state ── */
  const [orderModal, setOrderModal] = useState<OrderModalState>({
    open: false,
    product: "",
    image: "",
    price: 0,
    originalPrice: 0,
    weight: "",
  });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  /* ── Intersection observer ── */
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  /* ── Handlers ── */
  const openOrderForm = useCallback((product: ProductWithDiscount) => {
    setOrderModal({
      open: true,
      product: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      weight: product.weight,
    });
  }, []);

  const closeOrderForm = useCallback(() => {
    setOrderModal({
      open: false,
      product: "",
      image: "",
      price: 0,
      originalPrice: 0,
      weight: "",
    });
  }, []);

  /* ── Animation variants ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  /* ── Render ── */
  return (
    <section
      ref={ref}
      id="products"
      className="relative min-h-screen bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 py-20 md:py-28 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-[100px] bg-gradient-to-br from-amber-200/30 via-orange-200/20 to-yellow-200/30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-[120px] bg-gradient-to-tl from-amber-300/25 via-orange-300/20 to-yellow-300/25"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 270, 360],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-[80px] bg-gradient-to-r from-amber-100/20 to-orange-100/20"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <SectionTransition className="mb-16 text-center md:mb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Premium Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 rounded-full border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-3 shadow-lg backdrop-blur-sm"
            >
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-amber-700">
                Premium Collection
              </span>
              <div className="h-4 w-px bg-amber-300" />
              <span className="text-xs font-semibold text-amber-600">
                Limited Edition
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Our Signature{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                  Products
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1.2 }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-2xl text-lg font-medium text-amber-800 sm:text-xl md:text-2xl leading-relaxed"
            >
              Handcrafted Excellence in Every Cup
            </motion.p>

            {/* Stats Bar */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-8 pt-4"
            >
              {[
                { icon: "⭐", label: "4.9/5 Rating", color: "text-amber-600" },
                {
                  icon: "📦",
                  label: "Free Delivery",
                  color: "text-emerald-600",
                },
                {
                  icon: "🏆",
                  label: "Premium Quality",
                  color: "text-orange-600",
                },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg">{stat.icon}</span>
                  <span className={`text-sm font-semibold ${stat.color}`}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </SectionTransition>

        {/* Enhanced Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <article
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-xl transition-all duration-500 hover:border-amber-200 hover:shadow-2xl hover:-translate-y-2"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Enhanced Image Section - No Badges */}
                <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                  <div className="aspect-[4/3] w-full p-8">
                    <motion.div
                      animate={{
                        scale: hoveredId === product.id ? 1.1 : 1,
                        rotateY: hoveredId === product.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={product.image}
                        alt={`${product.name} package`}
                        fill
                        priority={idx < 2}
                        quality={95}
                        sizes="(max-width: 1024px) 90vw, 45vw"
                        className="object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </div>

                  {/* Glow Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-t-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Enhanced Content Section */}
                <div className="flex flex-1 flex-col p-8 space-y-6">
                  {/* Title & Weight */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {product.name}
                    </h3>
                    <span className="whitespace-nowrap rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 px-4 py-2 text-sm font-bold text-amber-700">
                      {product.weight}
                    </span>
                  </div>

                  {/* Enhanced Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.1 * i,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-amber-600">
                        {product.rating}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600 font-medium">
                        {product.reviews.toLocaleString()} reviews
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="flex-1 text-gray-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Enhanced Price & CTA */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-amber-600">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span className="text-xl text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                          Save ₹{product.savings.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => openOrderForm(product)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative flex items-center justify-center gap-3">
                        <svg
                          className="h-5 w-5 transition-transform group-hover:scale-110"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="text-lg">Order Now</span>
                        <motion.svg
                          className="h-5 w-5"
                          animate={{ x: hoveredId === product.id ? 4 : 0 }}
                          transition={{ duration: 0.2 }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </motion.svg>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-8 text-white shadow-2xl">
            <h3 className="mb-4 text-2xl font-bold">
              Can't decide? Try our bestseller combo!
            </h3>
            <p className="mb-6 text-amber-100">
              Get both products at a special bundle price
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-white px-8 py-3 font-bold text-amber-600 shadow-lg transition-all hover:shadow-xl"
            >
              View Bundle Offers
            </motion.button>
          </div>
        </motion.div>

        {/* Order Modal */}
        <AnimatePresence>
          {orderModal.open && (
            <OrderForm
              isOpen={orderModal.open}
              product={orderModal.product}
              image={orderModal.image}
              price={orderModal.price}
              originalPrice={orderModal.originalPrice}
              weight={orderModal.weight}
              onClose={closeOrderForm}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
