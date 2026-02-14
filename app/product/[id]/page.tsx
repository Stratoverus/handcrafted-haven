'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import MessageSellerModal from '@/components/MessageSellerModal';
import { useCart } from '@/context/CartContext';

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
  User: Seller;
}

interface Seller { // matches seller
  id: string;
  name?: string;
  email: string;
  shopName?: string;
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
  const [showMessageModal, setShowMessageModal] = useState(false);
  const viewTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${encodeURIComponent(id)}`);
        const data = await res.json();
        setProduct(data.product ?? null);

        // Track product view only once per product ID
        if (data.product && viewTracked.current !== id) {
          viewTracked.current = id;
          fetch(`/api/product/${encodeURIComponent(id)}/view`, {
            method: 'POST',
          }).catch(err => console.error('Failed to track view:', err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // const addToCart = () => {
  //   if (!product) return;

  //   const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];

  //   const existingItem = existingCart.find(item => item.id === product.id);
  //   if (existingItem) {
  //     existingItem.quantity += 1;
  //   } else {
  //     existingCart.push({
  //       id: product.id,
  //       title: product.title,
  //       price: product.price,
  //       quantity: 1,
  //     });
  //   }

  //   localStorage.setItem('cart', JSON.stringify(existingCart));
  //   alert('Added to cart!');
  // };
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
    alert('Added to cart!');
  };


  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* Top Section - Two Columns */}
      <div className="md:flex md:gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          {/* Product Images */}
          <div className="space-y-4 mb-6">
            {product.ProductImage.length > 0 ? (
              product.ProductImage.map(img => (
                <Image
                  key={img.id}
                  src={img.url}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-[450px] object-cover rounded"
                />
              ))
            ) : (
              <div className="w-full h-[450px] bg-gray-200 rounded flex items-center justify-center">
                No images available
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 flex flex-col justify-center border rounded-lg p-6 h-fit shadow-sm bg-white">

          {/* Description at top */}
          <p className="text-gray-700 mb-4">{product.description}</p>

          <p className="text-2xl font-bold mb-2">
            ${product.price.toFixed(2)}
          </p>

          <p className="mb-4 text-sm text-gray-600">
            {product.stock} available
          </p>

          {/* Seller Info Box */}
          <div className="mb-4 p-3 bg-white border rounded shadow-sm flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-500">Sold by </span>
              <span className="font-semibold">
                {product.User.shopName || product.User.name || 'Seller'}
              </span>
            </div>

            <button
              onClick={() => setShowMessageModal(true)}
              className="text-[#CF5C36] border border-[#CF5C36] px-3 py-1 rounded hover:bg-[#CF5C36] hover:text-white transition text-xs cursor-pointer"
            >
              Message Seller
            </button>
          </div>


          {/* Add to Cart */}
          {/* <button
            onClick={addToCart}
            className="w-full bg-[#CF5C36] text-white py-3 rounded hover:bg-[#b84f2f] transition cursor-pointer"
          >
            Add to Cart
          </button> */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#CF5C36] text-white py-3 rounded hover:bg-[#b84f2f] transition cursor-pointer"
          >
            Add to Cart
          </button>
        </div>

      </div>

      {/* Reviews Section */}
      <div className="mt-12 p-6 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>

        {product.Review.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.Review.map(r => (
            <div key={r.id} className="mb-4 border-b pb-3">
              <p className="font-medium">Rating: {r.rating}/5</p>
              {r.comment && <p className="text-gray-700">{r.comment}</p>}
            </div>
          ))
        )}
      </div>

      {/* Message Seller Modal */}
      <MessageSellerModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        sellerId={product.User.id}
        sellerName={product.User.shopName || product.User.name}
        productId={product.id}
        productTitle={product.title}
      />

    </div>
  );
}