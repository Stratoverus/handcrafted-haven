import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  const { category } = await context.params; // Extract category from URL params

  try {
    const products = await prisma.product.findMany({ // query products by category
      where: { category },
      include: {
        ProductImage: true,
        Review: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify({ products }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch products by category" }), { status: 500 });
  }
}