import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {

    const { category } = await context.params;
    const categorySlug = category.toLowerCase();

    const products = await prisma.product.findMany({
      where: { category: categorySlug },
      include: {
        ProductImage: true,
        Review: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error('Category API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch products by category' },
      { status: 500 }
    );
  }
}
