import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


type ProductWithImage = {
  id: string;
  title: string;
  price: number;
  ProductImage: { url: string }[];
};

export async function GET(
  req: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params; // Extract category from URL params
    const categorySlug = category.toLowerCase();

    const products: ProductWithImage[] = await prisma.product.findMany({  // Query products by category slug
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


    return NextResponse.json({ // Map products to include imageUrl field
      products: products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.ProductImage[0]?.url ?? null
      }))
    });
  } catch (error) {
    console.error("Category API error:", error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
