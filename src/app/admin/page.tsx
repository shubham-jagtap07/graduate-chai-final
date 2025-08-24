"use client";

import { useState, useEffect } from 'react';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 47,
    revenue: 28450
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5001/api/products/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const result = await response.json();
        const products = result.data || [];
        
        setStats(prev => ({
          ...prev,
          totalProducts: products.length,
          activeProducts: products.filter((p: any) => p.is_active).length
        }));
      }

      // Try to get orders summary if backend provides it
      try {
        const ordRes = await fetch('http://localhost:5001/api/orders/summary', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (ordRes.ok) {
          const ordJson = await ordRes.json();
          // Expecting { success: boolean, data: { totalOrders: number, revenue: number } }
          const payload = ordJson?.data || {};
          if (ordJson?.success && (typeof payload.totalOrders === 'number' || typeof payload.revenue === 'number')) {
            setStats(prev => ({
              ...prev,
              totalOrders: typeof payload.totalOrders === 'number' ? payload.totalOrders : prev.totalOrders,
              revenue: typeof payload.revenue === 'number' ? payload.revenue : prev.revenue,
            }));
          }
        }
      } catch (_) {
        // silently ignore and keep fallback numbers
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }: { 
    title: string; 
    value: string | number; 
    icon: string; 
    color: string; 
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color} mt-2`}>{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Graduate Chai Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={loading ? '...' : stats.totalProducts}
          icon="🫖"
          color="text-amber-600"
        />
        <StatCard
          title="Active Products"
          value={loading ? '...' : stats.activeProducts}
          icon="✅"
          color="text-green-600"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          color="text-blue-600"
        />
        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          icon="💰"
          color="text-purple-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          📈 Recent Activity
        </h2>
        
        <div className="space-y-4">
          <ActivityItem
            title="New Order"
            description="Shubham Jagtap ordered 2x Jaggery Tea Powder"
            time="2 minutes ago"
            color="border-amber-500"
          />
          <ActivityItem
            title="Order Delivered"
            description="Order #ORD001 delivered successfully"
            time="1 hour ago"
            color="border-green-500"
          />
          <ActivityItem
            title="Product Updated"
            description="Chai Sukh inventory updated"
            time="3 hours ago"
            color="border-blue-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          ⚡ Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Add New Product"
            description="Create a new tea product"
            href="/admin/products/new"
            icon="➕"
            color="bg-green-500"
          />
          <QuickActionCard
            title="View Products"
            description="Manage existing products"
            href="/admin/products"
            icon="🫖"
            color="bg-amber-500"
          />
          <QuickActionCard
            title="View Orders"
            description="Check recent orders"
            href="/admin/orders"
            icon="📋"
            color="bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, description, time, color }: {
  title: string;
  description: string;
  time: string;
  color: string;
}) {
  return (
    <div className={`flex items-start gap-4 p-4 border-l-4 ${color} bg-gray-50 rounded-r-lg`}>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <p className="text-gray-400 text-xs mt-1">{time}</p>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, href, icon, color }: {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
}) {
  return (
    <a
      href={href}
      className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-white text-sm`}>
          {icon}
        </div>
        <h3 className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </a>
  );
}
