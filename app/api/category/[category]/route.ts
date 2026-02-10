import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ category: string }> }
) {
  const { category } = await context.params; // IMPORTANT
  const categorySlug = category.toLowerCase();

  try {
    const products = await prisma.product.findMany({
      where: { category: categorySlug },
      select: {
        id: true,
        title: true,
        price: true,
        ProductImage: {
          select: { url: true },
          take: 1
        }
      }
    });

    return NextResponse.json({
      products: products.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        imageUrl: p.ProductImage[0]?.url ?? null
      }))
    });
  } catch (error) {
    console.error("Category API error:", error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
