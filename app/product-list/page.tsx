'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";

interface Product { //matches product model is prisma schema
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sellerId: string;
  ProductImage: { id: string; url: string }[];
}

export default function ProductListPage() { //main product listing page component
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product', {
          cache: "no-store", // ensures fresh data
        });
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--rust)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="h-8 w-8 text-[var(--rust)]" />
        <h1 className="text-3xl font-bold text-[var(--navy)]">All Products</h1>
      </div>

      {products.length === 0 ? (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--navy)] mb-3">
            No products available
          </h2>
          <p className="text-gray-600">
            Check back later for new handcrafted items.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {product.ProductImage.length > 0 && !imageErrors.has(product.id) ? (
                <div className="relative h-56 bg-gray-100">
                  <Image
                    src={product.ProductImage[0].url}
                    alt={product.title}
                    width={300}
                    height={300}
                    style={{ width: '100%', height: '100%' }}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                    onError={() => handleImageError(product.id)}
                  />
                </div>
              ) : (
                <div className="h-56 bg-gray-100 flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-300" />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[var(--navy)] mb-2 line-clamp-2 group-hover:text-[var(--rust)] transition-colors">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-[var(--rust)]">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.stock > 0 ? (
                    <span className="text-xs text-green-600 font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs text-red-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
