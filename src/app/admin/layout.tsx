"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

        // If no token and not already on login page -> redirect
        if (!token) {
          setIsAuthenticated(false);
          setAdminName('');
          setLoading(false);
          if (pathname !== '/admin/login') router.replace('/admin/login');
          return;
        }

        // Validate token by calling proxy profile endpoint
        const res = await fetch(`/api/backend/auth/profile`, {
          headers: {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          },
          cache: 'no-store',
        });

        if (res.ok) {
          const json = await res.json();
          setIsAuthenticated(true);
          setAdminName(json?.data?.name || 'Admin');
          setLoading(false);
        } else {
          // Invalid token -> clear and redirect
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
          setAdminName('');
          setLoading(false);
          if (pathname !== '/admin/login') router.replace('/admin/login');
        }
      } catch (_) {
        setIsAuthenticated(false);
        setAdminName('');
        setLoading(false);
        if (pathname !== '/admin/login') router.replace('/admin/login');
      }
    };

    checkAuth();
    // re-check on path changes (nav) to ensure guard holds
  }, [pathname, router]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('adminToken');
    } catch (_) {}
    setIsAuthenticated(false);
    router.replace('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-amber-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  // Allow access to the login route without header/nav wrapper
  if (!isAuthenticated && pathname === '/admin/login') {
    return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">{children}</div>;
  }

  // If unauthenticated and not on login, we've already redirected; render nothing
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🫖</span>
              <h1 className="text-xl font-bold">Graduate Chai Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-amber-100">Welcome, {adminName}</span>
              <button
                onClick={handleLogout}
                className="bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <NavLink href="/admin" label="Dashboard" />
            <NavLink href="/admin/products" label="Products" />
            <NavLink href="/admin/orders" label="Orders" />
            <NavLink href="/admin/inquiries" label="Inquiries" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`inline-flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium transition-colors ${
        isActive
          ? 'border-amber-500 text-amber-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
    </a>
  );
}
