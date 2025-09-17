"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const txnid = searchParams.get('txnid');
    const amount = searchParams.get('amount');
    const status = searchParams.get('status');
    const productinfo = searchParams.get('productinfo');

    if (txnid && status === 'success') {
      // Verify payment status with backend
      fetch(`/api/backend/payment/status/${txnid}`)
        .then(res => res.json())
        .then(data => {
          setPaymentDetails({
            txnid,
            amount,
            productinfo,
            status: data.status,
            orderId: data.order_id
          });
        })
        .catch(error => {
          console.error('Error verifying payment:', error);
          setPaymentDetails({
            txnid,
            amount,
            productinfo,
            status: 'success',
            orderId: null
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600">
            Your order has been placed successfully
          </p>
        </div>

        {paymentDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Order Details:</h3>
            <div className="space-y-2 text-sm">
              {paymentDetails.orderId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{paymentDetails.orderId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{paymentDetails.txnid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{paymentDetails.productinfo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{paymentDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 capitalize">
                  {paymentDetails.status}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            We'll contact you within 24 hours to confirm your order and arrange delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/products"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            For any queries, contact us at support@graduatechai.in
          </p>
        </div>
      </div>
    </div>
  );
}
