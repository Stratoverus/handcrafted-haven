'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const categoryHeros: Record<string, string> = { //mapping of category slugs to images
  quilts: '/quilts.png',
  hats: '/hats.png',
  sweaters: '/sweaters.png',
  shirts: '/shirts.png',
  footwear: '/footwear.png',
  accessories: '/accessories.png',
  leatherwork: '/leatherwork.png',
  skirts: '/skirts.png',
  jewelry: '/jewelry.png',  
}

const defaultHero = '/default.png';

interface Product {
  id: string;
  title: string;
  price?: number;
  imageUrl?: string;
}

export default function CategoryPage() { //main category page component - displays products in a given category
  const { category } = useParams<{ category: string }>();
  const categorySlug = category
    ? decodeURIComponent(category).toLowerCase()
    : undefined;

  const [heroSrc, setHeroSrc] = useState(defaultHero);

  useEffect(() => {
    if (!categorySlug) return;
    setHeroSrc(categoryHeros[categorySlug] || defaultHero);
  }, [categorySlug]);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/category/${encodeURIComponent(categorySlug)}`
        );
        const data = await res.json();
        setProducts(data.products ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const displayName = categorySlug
  ? categorySlug
      .split(/[\s-]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  : '';

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-semibold mb-2">
        {displayName}
      </h1>

      <Image
        src={heroSrc}
        onError={() => setHeroSrc(defaultHero)}  //if image fails to load, use the default image - default.png
        alt={`${displayName} hero image`}
        width={400}
        height={250}

        className="w-full max-w-[400px] h-[250px] object-cover rounded mb-6 mx-auto"
      />
      <p className="text-gray-600 mb-6">
        Welcome to the {displayName} page.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="border p-4 rounded hover:shadow"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
              )}
              <h2 className="font-medium">{product.title}</h2>
              {product.price !== undefined && (
                <p className="text-sm text-gray-700">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}