import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


type ProductWithImage = {
  id: string;
  title: string;
  price: number;
  shopName: string;
  ProductImage: { url: string }[];
};

export async function GET(
  req: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params; // Extract category from URL params
    const categorySlug = category.toLowerCase();

    const products: ProductWithImage[] = await prisma.product.findMany({
      where: { 
        category: { 
          equals: categorySlug, 
          mode: "insensitive" // <- THIS makes it ignore case
        } 
      },
      select: {
        id: true,
        title: true,
        price: true,
        sellerId: true,
        User: {
          select: {
            shopName: true
          }
        },
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
        sellerId: product.sellerId,
        shopName: product.User?.shopName ?? null,
        imageUrl: product.ProductImage[0]?.url ?? null
      }))
    });
  } catch (error) {
    console.error("Category API error:", error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
