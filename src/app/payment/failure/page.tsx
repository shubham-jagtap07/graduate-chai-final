"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentFailurePage() {
  const router = useRouter();
  const search = useSearchParams();
  const order = search.get("order");
  const txn = search.get("txn");
  const error = search.get("error");

  useEffect(() => {
    const t = setTimeout(() => router.replace("/products"), 5000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-red-50 via-rose-50 to-white">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center border border-red-100">
        <div className="text-5xl mb-3">❌</div>
        <h1 className="text-xl font-bold text-red-700">Payment Failed</h1>
        <p className="text-gray-600 mt-2">Your transaction couldnt be completed.</p>
        <div className="mt-4 text-sm text-gray-700 space-y-1">
          {order && (
            <p><span className="font-semibold">Order No:</span> {order}</p>
          )}
          {txn && (
            <p><span className="font-semibold">Txn ID:</span> {txn}</p>
          )}
          {error && (
            <p><span className="font-semibold">Error:</span> {error}</p>
          )}
        </div>
        <p className="mt-5 text-sm text-gray-500">Redirecting to products in a moment</p>
        <button
          className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
          onClick={() => router.replace("/products")}
        >
          Go to Products
        </button>
      </div>
    </main>
  );
}
