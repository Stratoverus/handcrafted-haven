'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, Bell, User, X } from 'lucide-react';
import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: number;
  name: string;
}


const categories = [
  'Sweaters',
  'Skirts',
  'Shirts',
  'Hats',
  'Footwear',
  'Jewelry',
  'Accessories',
  'Leatherwork',
  'Quilts',
  'Misc',
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data } = authClient.useSession();
  const user = data?.user;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSearchResults(data.products || []);
        setShowResults(true);
      } catch {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);  //debounce search input so it doesn't fire on every keystroke
  }, [searchTerm]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setShowResults(false);
    }
  };


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
            <div className="flex-1 max-w-xl relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CF5C36]"
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)} // small delay for click
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border mt-1 rounded shadow z-50 max-h-64 overflow-auto">
                  {searchResults.map((product: any) => (
                    <li key={product.id} className="px-4 py-2 hover:bg-gray-100">
                      <Link href={`/product/${product.id}`} onClick={() => setShowResults(false)}>
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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

        {/* BOTTOM BAR - hidden on mobile devices */}
        <nav className="border-t bg-[#CF5C36] text-white hidden md:block">
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
