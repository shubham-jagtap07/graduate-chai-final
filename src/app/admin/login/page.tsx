"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: 'admin@chaiwala.com',
    password: 'admin123'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.groupCollapsed('[AdminLogin] submit');
      console.log('Request URL:', 'https://gtb-aq8n.onrender.com/api/auth/login');
      console.log('Request body:', { email: formData.email, passwordLen: formData.password?.length });
      const response = await fetch('https://gtb-aq8n.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('HTTP status:', response.status, response.statusText);
      const result = await response.json();
      console.log('Response JSON:', result);

      if (result.success && result.data && result.data.token) {
        console.log('Login success:', {
          hasToken: Boolean(result?.data?.token),
          admin: result?.data?.admin || null,
        });
        
        // Ensure token is properly formatted
        const token = result.data.token.startsWith('Bearer ') ? result.data.token : `Bearer ${result.data.token}`;
        const preview = token ? `${token.slice(0, 20)}...(${token.length})` : 'none';
        console.log('Saving token to localStorage as "adminToken". preview:', preview);
        
        try {
          // Store the token with Bearer prefix
          localStorage.setItem('adminToken', token);
          // Verify storage
          const stored = localStorage.getItem('adminToken');
          console.log('Token saved?', Boolean(stored), 'storedPreview:', stored ? `${stored.slice(0, 20)}...(${stored.length})` : null);
          
          // Also store in sessionStorage as backup
          sessionStorage.setItem('adminToken', token);
        } catch (e) {
          console.error('Failed to write token to storage:', e);
        }
        console.groupEnd();
        // Use replace to avoid navigating back to login with back button
        router.replace('/admin');
      } else {
        console.warn('Login failed:', result.message);
        console.groupEnd();
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login request error:', err);
      setError('Network error. Please try again.');
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
                // value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
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
                // value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
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
