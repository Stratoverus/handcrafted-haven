import { prisma } from "@/lib/prisma";

export async function GET() { // API route to fetch products 
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: true,
        Review: true,
      },
      orderBy: { // Order products by creation date, newest first
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify({ products }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}