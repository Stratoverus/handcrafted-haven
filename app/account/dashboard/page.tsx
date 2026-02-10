'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ShoppingBag, DollarSign, TrendingUp, Plus, ArrowLeft, Eye, Edit, Trash2 } from 'lucide-react';
import { authClient } from '../../lib/auth/client';

export default function DashboardPage() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const [checkComplete, setCheckComplete] = useState(false);
  
  useEffect(() => {
    // Set a timeout to mark check as complete
    const timeout = setTimeout(() => {
      setCheckComplete(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Redirect if check is complete and no session
    if (checkComplete && !data?.session) {
      router.push('/auth/sign-in');
    }
  }, [checkComplete, data, router]);

  // Don't show anything until we have a confirmed session
  if (!data?.session) {
    return null;
  }

  // Mock sales data - will be replaced with actual data later
  const stats = {
    totalProducts: 24,
    activeOrders: 8,
    monthlyRevenue: 1250.50,
    viewsThisWeek: 342,
  };

  const recentOrders = [
    { id: '10231', customer: 'Sarah Johnson', item: 'Hand-knit Sweater', amount: 89.99, status: 'Pending' },
    { id: '10230', customer: 'Mike Chen', item: 'Quilted Throw', amount: 125.00, status: 'Shipped' },
    { id: '10229', customer: 'Emily Davis', item: 'Wool Hat', amount: 35.00, status: 'Delivered' },
  ];

  const products = [
    { id: '1', name: 'Hand-knit Sweater', price: 89.99, stock: 5, views: 127 },
    { id: '2', name: 'Quilted Throw', price: 125.00, stock: 3, views: 89 },
    { id: '3', name: 'Wool Hat', price: 35.00, stock: 12, views: 203 },
  ];
  // End of mock sales data.
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link 
            href="/account/profile"
            className="flex items-center gap-2 text-[var(--rust)] hover:underline mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Profile</span>
          </Link>
          <h1 className="text-3xl font-bold text-[var(--navy)]">Seller Dashboard</h1>
        </div>
        <Link
          href="/account/dashboard/add-product"
          className="flex items-center gap-2 bg-[var(--rust)] text-white px-6 py-3 rounded-lg hover:bg-[#b84f2e] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Add New Product</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Total Products</h3>
            <ShoppingBag className="h-5 w-5 text-[var(--rust)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--navy)]">{stats.totalProducts}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Active Orders</h3>
            <Package className="h-5 w-5 text-[var(--rust)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--navy)]">{stats.activeOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Monthly Revenue</h3>
            <DollarSign className="h-5 w-5 text-[var(--rust)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--navy)]">${stats.monthlyRevenue}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Views This Week</h3>
            <TrendingUp className="h-5 w-5 text-[var(--rust)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--navy)]">{stats.viewsThisWeek}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[var(--navy)] mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-[var(--navy)]">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.item}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[var(--navy)]">${order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link 
            href="/account/dashboard/orders"
            className="block mt-4 text-center text-[var(--rust)] hover:underline font-medium"
          >
            View All Orders
          </Link>
        </div>

        {/* Your Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[var(--navy)] mb-4">Your Products</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-[var(--navy)]">{product.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>${product.price}</span>
                    <span>Stock: {product.stock}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {product.views}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded" title="Edit">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded" title="Delete">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link 
            href="/account/dashboard/products"
            className="block mt-4 text-center text-[var(--rust)] hover:underline font-medium"
          >
            Manage All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
