'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, Bell, User, X } from 'lucide-react';
import Logo from './logo';
import SearchNav from './search';
import UserActions from './userActions';

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

  return (
    <>
      <header>
        {/* TOP ROW */}
        <div className="px-4 bg-white/45">
          <div className="flex items-center justify-between gap-4 text-black">

            {/* Left */}
            <div className="flex items-center gap-4 shrink-0">
              <Logo />

              <button
                aria-label="Open categories"
                onClick={() => setMenuOpen(true)}
                className="block sm:hidden p-2 rounded hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Middle */}
            <SearchNav />

            {/* Right */}
            <UserActions />
            
          </div>
        </div>

        {/* BOTTOM BAR */}
        <nav className="border-t bg-[#fff]/60 text-[#050517]">
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
