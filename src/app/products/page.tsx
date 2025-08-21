"use client";

import React from "react";
import Products from "@/components/sections/Products";

export default function ProductsPage() {
  // Optional: wrap with a simple boundary in case the section throws
  return (
    <React.Suspense
      fallback={
        <main className="min-h-[60vh] grid place-items-center">
          <p className="text-gray-600">Loading products…</p>
        </main>
      }
    >
      <Products />
    </React.Suspense>
  );
}
