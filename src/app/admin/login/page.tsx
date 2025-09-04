"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('[LOGIN] Attempting login with:', { email: formData.email });
      
      const response = await fetch(`/api/backend/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store',
        body: JSON.stringify(formData)
      });

      console.log('[LOGIN] Response status:', response.status);
      console.log('[LOGIN] Response headers:', Object.fromEntries(response.headers.entries()));

      let result: any = null;
      const text = await response.text();
      console.log('[LOGIN] Response text:', text);
      
      try {
        result = text ? JSON.parse(text) : null;
      } catch (parseError) {
        console.error('[LOGIN] JSON parse error:', parseError);
        result = null;
      }

      if (!response.ok) {
        const proxyTarget = response.headers.get('x-proxy-target');
        const proxyBase = response.headers.get('x-proxy-backend-base');
        const proxyError = response.headers.get('x-proxy-error');
        
        console.error('[LOGIN] Request failed:', {
          status: response.status,
          proxyTarget,
          proxyBase,
          proxyError,
          result
        });
        
        let errorMsg = result?.message || `Login failed (${response.status})`;
        if (response.status === 500 && proxyBase) {
          errorMsg += ` - Backend: ${proxyBase}`;
        }
        if (proxyError) {
          errorMsg += ` - ${proxyError}`;
        }
        
        throw new Error(errorMsg);
      }

      if (result?.success && result?.data?.token) {
        const token: string = result.data.token;
        console.log('[LOGIN] Login successful, storing token');
        
        // Clear any existing tokens first
        try {
          localStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminToken');
        } catch (e) {
          console.warn('[LOGIN] Error clearing existing tokens:', e);
        }
        
        // Store new token
        try {
          localStorage.setItem('adminToken', token);
          sessionStorage.setItem('adminToken', token);
        } catch (e) {
          console.error('[LOGIN] Error storing token:', e);
          throw new Error('Failed to store authentication token');
        }
        
        router.replace('/admin');
      } else {
        console.error('[LOGIN] Invalid response format:', result);
        setError(result?.message || 'Invalid login response');
      }
    } catch (err: any) {
      console.error('[LOGIN] Login error:', err);
      setError(err?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🫖</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Graduate Chai Admin
          </h2>
          <p className="text-gray-600">Sign in to manage your products</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900 placeholder-gray-400 bg-white dark:bg-gray-800 dark:text-white"
                placeholder="xyz@chaiwala.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900 placeholder-gray-400 bg-white dark:bg-gray-800 dark:text-white"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              {/* Default credentials: admin@chaiwala.com / admin123 */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
