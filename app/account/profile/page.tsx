'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, Store } from 'lucide-react';
import { authClient } from '@/lib/auth/client';

export default function ProfilePage() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const [checkComplete, setCheckComplete] = useState(false);
  
  useEffect(() => {
    // Set a timeout to mark check as complete
    const timeout = setTimeout(() => {
      setCheckComplete(true);
    }, 500);

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

  // Mock user data - need to connect db at some point
  const user = {
    name: 'Keith Eberhard',
    email: 'keith.eberhard@example.com',
    phone: '+1 (123) 123-4567',
    location: 'Mesa, AZ',
    isSeller: true, // Temporary: change to true/false to see the other button
    memberSince: 'January 2025',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[var(--navy)]">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[var(--rust)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[var(--navy)]">{user.name}</h2>
                <p className="text-gray-600">Member since {user.memberSince}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="h-5 w-5 text-[var(--rust)]" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="h-5 w-5 text-[var(--rust)]" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="h-5 w-5 text-[var(--rust)]" />
              <span>{user.location}</span>
            </div>
          </div>

          {user.isSeller && (
            <div className="mt-6 pt-6 border-t">
              <Link 
                href="/account/dashboard"
                className="flex items-center gap-3 bg-[var(--rust)] text-white px-6 py-3 rounded-lg hover:bg-[#b84f2e] transition-colors"
              >
                <Store className="h-5 w-5" />
                <span className="font-semibold">Go to Seller Dashboard</span>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-[var(--navy)] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                href="/account/profile/orders"
                className="flex items-center gap-3 text-gray-700 hover:text-[var(--rust)] transition-colors"
              >
                <Package className="h-5 w-5" />
                <span>My Orders</span>
              </Link>
              <Link 
                href="/account/profile/favorites"
                className="flex items-center gap-3 text-gray-700 hover:text-[var(--rust)] transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <form action="/auth/sign-out" method="POST" className="w-full">
                <button 
                  type="submit"
                  className="flex items-center gap-3 text-gray-700 hover:text-[var(--rust)] transition-colors w-full text-left cursor-pointer"
                >
                  <Settings className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </form>
            </div>
          </div>

          {!user.isSeller && (
            <div className="bg-[var(--beige)] rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-[var(--navy)] mb-2">Become a Seller</h3>
              <p className="text-sm text-gray-700 mb-4">
                Start selling your handcrafted items on Handcrafted Haven!
              </p>
              <button className="w-full bg-[var(--rust)] text-white px-4 py-2 rounded hover:bg-[#b84f2e] transition-colors">
                Apply Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-[var(--navy)] mb-4">Recent Orders</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Order #12345</p>
              <p className="text-sm text-gray-600">2 days ago</p>
              {/* Need to hook this into db as well, see below and above*/}
            </div>
            <Link href="/account/profile/orders/12345" className="text-[var(--rust)] hover:underline text-sm">
              View Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
