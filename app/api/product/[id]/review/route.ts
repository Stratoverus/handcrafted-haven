import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth/server';

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await context.params;

    const sessionData = await auth.getSession();
    const userId = sessionData?.data?.session?.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { rating, comment } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if the product exists and get seller info
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { sellerId: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Prevent users from reviewing their own products
    if (product.sellerId === userId) {
      return NextResponse.json(
        { error: 'You cannot review your own products' },
        { status: 403 }
      );
    }

    // Check if user has purchased this product
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId: productId,
        Order: {
          userId: userId,
        },
      },
    });

    if (!hasPurchased) {
      return NextResponse.json(
        { error: 'You can only review products you have purchased' },
        { status: 403 }
      );
    }

    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        productId,
      },
    });

    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
