"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircleIcon, HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const txnid = searchParams.get('txnid');
    const amount = searchParams.get('amount');
    const status = searchParams.get('status');
    const productinfo = searchParams.get('productinfo');
    const error_Message = searchParams.get('error_Message');

    setPaymentDetails({
      txnid,
      amount,
      productinfo,
      status,
      error_Message
    });
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Failed 😞
          </h1>
          <p className="text-gray-600">
            Your payment could not be processed
          </p>
        </div>

        {paymentDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Transaction Details:</h3>
            <div className="space-y-2 text-sm">
              {paymentDetails.txnid && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">{paymentDetails.txnid}</span>
                </div>
              )}
              {paymentDetails.productinfo && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium">{paymentDetails.productinfo}</span>
                </div>
              )}
              {paymentDetails.amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₹{paymentDetails.amount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-red-600 capitalize">
                  {paymentDetails.status || 'Failed'}
                </span>
              </div>
              {paymentDetails.error_Message && (
                <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
                  <span className="text-xs text-red-700">
                    Error: {paymentDetails.error_Message}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Don't worry! No amount has been deducted from your account.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>What you can do:</strong>
            </p>
            <ul className="text-xs text-blue-700 mt-1 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Verify your card/UPI details</li>
              <li>• Try a different payment method</li>
              <li>• Contact your bank if the issue persists</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Try Again
            </Link>
            <Link
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              Or choose Cash on Delivery (COD) for a hassle-free experience!
            </p>
            <Link
              href="/products"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
            >
              Order with COD
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact us at support@graduatechai.in
          </p>
        </div>
      </div>
    </div>
  );
}
