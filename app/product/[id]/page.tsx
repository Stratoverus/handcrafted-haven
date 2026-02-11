'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface ProductImage { //matches product image model in prisma schema
  id: string; 
  url: string;
}

interface Review { //matches review model in prisma schema
  id: string;
  rating: number;
  comment?: string;
}

interface Product { //matches product model is prisma schema
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sellerId: string;
  ProductImage: ProductImage[];
  Review: Review[];
}

interface CartItem { //matches cart item structure stored in localStorage
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export default function ProductPage() { //main product page component
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

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];

    const existingItem = existingCart.find(item => item.id === product.id);
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

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      {/* Product Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {product.ProductImage.length > 0 ? (
          product.ProductImage.map(img => (
            <Image
              key={img.id}
              src={img.url}
              alt={product.title}
              width={400}
              height={400}
              className="w-full h-[400px] object-cover rounded"
            />
          ))
        ) : (
          <div className="w-full h-[400px] bg-gray-200 rounded flex items-center justify-center">
            No images available
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4">{product.description}</p>

      <p className="text-xl font-semibold mb-2">Price: ${product.price.toFixed(2)}</p>
      <p className="mb-2">Quantity Available: {product.stock}</p>

      {/* Add to Cart & Message Seller */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={addToCart}
          className="bg-[#CF5C36] text-white px-6 py-3 rounded hover:bg-[#b84f2f] transition"
        >
          Add to Cart
        </button>

        <button
          onClick={() => alert('Messaging seller coming soon!')}
          className="text-sm text-[#CF5C36] border border-[#CF5C36] px-3 py-1 rounded hover:bg-[#CF5C36] hover:text-white transition"
        >
          Message Seller
        </button>
      </div>

      {/* Reviews */}
      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold mb-2">Reviews</h2>
        {product.Review.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.Review.map(r => (
            <div key={r.id} className="mb-2 border-b pb-2">
              <p>Rating: {r.rating}/5</p>
              {r.comment && <p>Comment: {r.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}