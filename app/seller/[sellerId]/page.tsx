'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Product { //matches product model in prisma schema
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
}

interface Seller { // matches seller model in prisma schema
  id: string;
  name?: string;
    shopName?: string;
    bio?: string;
  products: Product[];
}

export default function SellerPage() { //seller page component - fetches seller data and products and displays them in a grid
  const params = useParams(); //  get full params object
  const sellerId = params?.sellerId as string; //  cast to string

  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => { // fetch seller data when sellerId changes
      console.log("sellerId:", sellerId);
      if (!sellerId) return;
      

    const fetchSeller = async () => { //fetches seller info and products from API route
      try {
        const res = await fetch(`/api/seller/${sellerId}`);
        const data = await res.json();
        setSeller(data.seller ?? null);
      } catch (err) {
        console.error("Failed to fetch seller:", err);
        setSeller(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [sellerId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!seller) return <p className="p-6">Seller not found.</p>;

  const displayName = seller.shopName || seller.name || "Seller";

  return ( // main seller page content - seller name, bio, products
    <div className="px-6 py-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{displayName} - Products Page</h1>
        {seller.bio && (
              <p className="text-gray-700 mb-6">About "{displayName}" - {seller.bio}</p>)}
      {seller.products.length === 0 ? (
        <p>No products from this seller yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {seller.products.map((product) => ( //maps over products and displays them in a grid with links to product pages
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="border p-4 rounded hover:shadow"
            >
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={400}
                  height={250}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
              )}
              <h2 className="font-medium">{product.title}</h2>
              <p className="text-sm text-gray-700">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
