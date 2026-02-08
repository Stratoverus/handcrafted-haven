'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sellerId: string;
  comments: string;
  imageUrl?: string;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${encodeURIComponent(id)}`);
        const data = await res.json();
        setProduct(data.product ?? null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

    const addToCart = () => {
        if (!product) return;

        const existingCart = JSON.parse(
            localStorage.getItem('cart') || '[]'
        ) as CartItem[];

        const existingItem = existingCart.find(
            (item) => item.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            existingCart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        alert('Added to cart!');
    };

    
  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={800}
          height={400}
          className="w-full h-[400px] object-cover rounded mb-6"
        />
      )}

      <p className="text-gray-700 mb-4">{product.description}</p>

      <p className="text-xl font-semibold mb-2">
        Price: ${product.price.toFixed(2)}
      </p>
      {/* Add "Add to Cart" button */}
      <button onClick={addToCart} className="mt-4 bg-[#CF5C36] text-white px-6 py-3 rounded hover:bg-[#b84f2f] transition">
        Add to Cart
      </button>
      <p> </p>   
      <p className="mb-2"></p>
      <p className="mb-2">Quantity Available: {product.stock}</p>
      <div className="mb-4 flex items-center gap-3">
        <span className="font-medium">
            Seller: {product.sellerId}
        </span>

        <button
            onClick={() => alert('Messaging seller coming soon!')}
            className="text-sm text-[#CF5C36] border border-[#CF5C36] px-3 py-1 rounded hover:bg-[#CF5C36] hover:text-white transition"
        >
            Message Seller
        </button>
      </div>

      <div className="mt-4 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold mb-2">Comments</h2>
        <p>{product.comments}</p>
      </div>
    </div>
  );
}