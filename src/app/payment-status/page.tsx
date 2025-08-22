"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface PaymentStatusProps {
  status: 'success' | 'failed' | 'pending';
  message: string;
  details: Record<string, string>;
}

export default function PaymentStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusProps | null>(null);
  
  useEffect(() => {
    if (!searchParams) return;

    // Collect all URL parameters
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    console.log('Payment Status - All Parameters:', params);
    // Log all URL parameters individually for debugging
    Object.keys(params).forEach(key => {
      console.log(`Parameter ${key}:`, params[key]);
    });

    // Determine payment status based on Razorpay response parameters
    const determineStatus = (): PaymentStatusProps => {
      // Check for success indicators
      const paymentId = params['razorpay_payment_id'] || params['payment_id'];
      const status = (params['status'] || '').toLowerCase();
      
      // Common success indicators
      const isSuccess = status === 'success' || 
                       status === 'paid' || 
                       !!paymentId ||
                       status === 'captured';
      
      // Common failure indicators
      const isFailed = status === 'failed' || 
                      status === 'cancelled' || 
                      status === 'cancelled_by_user' ||
                      status === 'expired' ||
                      params['error_code'] ||
                      params['error_description'] ||
                      params['error_reason'] ||
                      params['error_source'] ||
                      params['error_step'];
      
      // Log specific failure information if available
      if (isFailed) {
        console.log('Payment Failed - Details:', {
          error_code: params['error_code'],
          error_description: params['error_description'],
          error_reason: params['error_reason'],
          error_source: params['error_source'],
          error_step: params['error_step']
        });
        
        // Add more robust error handling
        if (params['error_code']) {
          console.error(`Payment error code: ${params['error_code']}`);
        }
        
        // Track specific error types for analytics
        const errorReason = params['error_reason'] || 'unknown';
        console.warn(`Payment failed reason: ${errorReason}`);
      }

      if (isSuccess) {
        return {
          status: 'success',
          message: 'Payment Successful!',
          details: params
        };
      } else if (isFailed) {
        return {
          status: 'failed',
          message: 'Payment Failed',
          details: params
        };
      } else {
        return {
          status: 'pending',
          message: 'Payment Status Unknown',
          details: params
        };
      }
    };

    const status = determineStatus();
    setPaymentStatus(status);
    
    // Log the status to console
    console.log('Payment Status:', status);
  }, [searchParams]);

  // Auto-redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [router]);

  if (!paymentStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment status...</p>
        </div>
      </div>
    );
  }

  const { status, message, details } = paymentStatus;
  const paymentId = details['razorpay_payment_id'] || details['payment_id'];
  const orderId = details['razorpay_order_id'] || details['order_id'];
  const amount = details['amount'] || details['amount_paid'] || '0';
  const currency = details['currency'] || 'INR';

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-amber-200 bg-white p-8 shadow-xl">
        {/* Status Header */}
        <div className="text-center mb-8">
          {status === 'success' ? (
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="h-12 w-12 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : status === 'failed' ? (
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="h-12 w-12 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          ) : (
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="h-12 w-12 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{message}</h1>
          <p className="text-gray-600">
            {status === 'success' 
              ? 'Thank you for your purchase! Your order has been confirmed.'
              : status === 'failed'
              ? 'We couldn\'t process your payment. Please try again.'
              : 'We\'re checking your payment status. This may take a moment.'
            }
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h2>
          
          <div className="space-y-3">
            {paymentId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-medium text-gray-900">{paymentId}</span>
              </div>
            )}
            
            {orderId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium text-gray-900">{orderId}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-gray-900">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: currency,
                  minimumFractionDigits: 2
                }).format(Number(amount) / 100)}
              </span>
            </div>
            
            {details['product'] && (
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium text-gray-900 capitalize">
                  {details['product'].replace('-', ' ')}
                </span>
              </div>
            )}

            {/* Display error details if payment failed */}
            {status === 'failed' && details['error_reason'] && (
              <div className="flex justify-between text-red-600">
                <span>Error Reason:</span>
                <span className="font-medium">{details['error_reason']}</span>
              </div>
            )}
            
            {status === 'failed' && details['error_description'] && (
              <div className="flex justify-between text-red-600">
                <span>Error Details:</span>
                <span className="font-medium">{details['error_description']}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          {status === 'success' ? (
            <>
              <Link 
                href="/#products" 
                className="block w-full text-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link 
                href="/orders" 
                className="block w-full text-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                View My Orders
              </Link>
            </>
          ) : status === 'failed' ? (
            <>
              <Link 
                href="/#products" 
                className="block w-full text-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Try Again
              </Link>
              <Link 
                href="/contact" 
                className="block w-full text-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Need Help?
              </Link>
            </>
          ) : (
            <>
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Please wait while we verify your payment...</p>
              </div>
              <Link 
                href="/" 
                className="block w-full text-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </Link>
            </>
          )}
        </div>

        {/* Debug Info (visible in development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 pt-4 border-t border-gray-200">
            <summary className="text-sm text-gray-500 cursor-pointer">Debug Information</summary>
            <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs overflow-auto max-h-48">
              {JSON.stringify(details, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
