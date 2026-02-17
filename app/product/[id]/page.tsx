'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import MessageSellerModal from '@/components/MessageSellerModal';
import ReviewModal from '@/components/ReviewModal';
import { authClient } from '@/lib/auth/client';

interface ProductImage {
  id: string;
  url: string;
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
  userId?: string;
}

interface Seller {
  id: string;
  name?: string;
  email: string;
  shopName?: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sellerId: string;
  ProductImage: ProductImage[];
  Review: Review[];
  User: Seller;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, cart } = useCart();
  const { data: session } = authClient.useSession();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // NEW: Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [quantity, setQuantity] = useState(1);

  // Review form states
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const viewTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${encodeURIComponent(id)}`);
        const data = await res.json();
        setProduct(data.product ?? null);

        if (data.product && viewTracked.current !== id) {
          viewTracked.current = id;
          fetch(`/api/product/${encodeURIComponent(id)}/view`, { method: 'POST' })
            .catch(err => console.error('Failed to track view:', err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  const currentCartItem = cart.find(item => item.id === product.id);
  const alreadyInCart = currentCartItem ? currentCartItem.quantity : 0;

  const handleAddToCart = () => {
    if (!product) return;
    const totalRequested = alreadyInCart + quantity;
    if (totalRequested > product.stock) {
      alert(`You can only add ${product.stock - alreadyInCart} more of this item.`);
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      stock: product.stock,
      imageUrl: product.ProductImage?.[0]?.url,
    });

    alert('Added to cart!');
  };

  const handleSubmitReview = async () => {
    if (!product || !session?.user?.id) {
      alert('You must be logged in to submit a review.');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/product/${product.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: newRating,
          comment: newComment,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit review');

      const data = await res.json();

      setProduct(prev =>
        prev ? { ...prev, Review: [...prev.Review, data.review] } : prev
      );

      setNewRating(5);
      setNewComment('');
      setShowReviewModal(false);
    } catch (err) {
      alert('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* Top Section */}
      <div className="md:flex md:gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

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

          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-2">${product.price.toFixed(2)}</p>
          <p className="mb-4 text-sm text-gray-600">{product.stock} available</p>

          {/* Seller Info */}
          <div className="mb-4 p-3 bg-white border rounded shadow-sm flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-500">Sold by </span>
              <Link
                href={`/seller/${product.User.id}`}
                className="font-semibold text-[#CF5C36] hover:underline"
              >
                {product.User.shopName || product.User.name || 'Seller'}
              </Link>
            </div>

            <button 
              onClick={() => setShowMessageModal(true)}
              className="text-[#CF5C36] border border-[#CF5C36] px-3 py-1 rounded hover:bg-[#CF5C36] hover:text-white transition text-xs cursor-pointer"
            >
              Message Seller
            </button>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium">Quantity:</span>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={alreadyInCart >= product.stock}
            className="w-full bg-[#CF5C36] text-white py-3 rounded hover:bg-[#b84f2f] transition cursor-pointer"
          >
            {alreadyInCart >= product.stock ? "Max In Cart" : "Add to Cart"}
          </button>
        </div>

      </div>

      {/* Reviews Section */}
      <div className="mt-12 p-6 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>

        {session?.user?.id && (
          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-[#CF5C36] text-white px-4 py-2 rounded hover:bg-[#b84f2f] mb-6"
          >
            Leave a Review
          </button>
        )}

        {product.Review.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.Review.map(r => (
            <div key={r.id} className="mb-4 border-b pb-3">
              <p className="font-medium">Rating: {'⭐'.repeat(r.rating)} ({r.rating}/5)</p>
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

      {/* NEW: Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        rating={newRating}
        setRating={setNewRating}
        comment={newComment}
        setComment={setNewComment}
        submitting={submittingReview}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
