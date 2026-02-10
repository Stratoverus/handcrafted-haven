'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, Bell, User, X } from 'lucide-react';
import { authClient } from '../app/lib/auth/client';

const categories = [
  'Sweaters',
  'Shirts',
  'Hats',
  'Footwear',
  'Quilts',
  'Other',
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = authClient.useSession();
  const user = data?.user;

  return (
    <>
      <header>
        {/* TOP ROW */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4 text-black">
            {/* Left */}
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo_4.jpg"
                  alt="Handcrafted Haven logo"
                  width={180}
                  height={60}
                  priority
                />
              </Link>

              <button
                aria-label="Open categories"
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Middle */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full border px-4 py-2 pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 shrink-0">
              <Link 
                href={user ? "/account/profile" : "/auth/sign-in"} 
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
              >
                <User />
                {user && (
                  <span className="text-sm font-medium">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded">
                <ShoppingCart />
              </Link>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Bell />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <nav className="border-t bg-[#CF5C36] text-white">
          <div className="px-6 py-3 flex justify-center gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="font-medium hover:underline"
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SLIDE-OUT MENU */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              {category}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
