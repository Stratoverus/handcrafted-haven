'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
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
  User?: {
    name?: string;
    shopName?: string;
  };
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
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set(prev).add(imageId));
  };

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
      showToast(`You can only add ${product.stock - alreadyInCart} more of this item.`, 'error');
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

    showToast('Added to cart!', 'success');
  };

  const handleSubmitReview = async () => {
    if (!product || !session?.user?.id) {
      showToast('You must be logged in to submit a review.', 'error');
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setProduct(prev =>
        prev ? { ...prev, Review: [...prev.Review, data.review] } : prev
      );

      setNewRating(5);
      setNewComment('');
      setShowReviewModal(false);
      showToast('Review submitted successfully!', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to submit review', 'error');
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
              product.ProductImage.filter(img => !imageErrors.has(img.id)).length > 0 ? (
                product.ProductImage.map((img, index) => 
                  !imageErrors.has(img.id) ? (
                    <Image
                      key={img.id}
                      src={img.url}
                      alt={product.title}
                      width={600}
                      height={600}
                      style={{ width: '100%', height: '450px' }}
                      className="object-cover rounded"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      onError={() => handleImageError(img.id)}
                    />
                  ) : null
                )
              ) : (
                <div className="w-full h-[450px] bg-gray-200 rounded flex items-center justify-center">
                  <div className="text-center">
                    <svg className="h-24 w-24 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">Image unavailable</p>
                  </div>
                </div>
              )
            ) : (
              <div className="w-full h-[450px] bg-gray-200 rounded flex items-center justify-center">
                <div className="text-center">
                  <svg className="h-24 w-24 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No images available</p>
                </div>
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
              style={{ border: '2px solid #6B7280' }}
              className="w-20 rounded px-2 py-1 focus:ring-2 focus:ring-[var(--rust)] outline-none"
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
          product.Review.map(r => {
            const reviewerName = r.User?.name || 'Anonymous';
            const isVerified = true; // All reviews are verified purchases now
            
            return (
              <div key={r.id} className="mb-4 border-b pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{'⭐'.repeat(r.rating)} ({r.rating}/5)</p>
                  {isVerified && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Verified Purchase</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">By: {reviewerName}</p>
                {r.comment && <p className="text-gray-700">{r.comment}</p>}
              </div>
            );
          })
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
