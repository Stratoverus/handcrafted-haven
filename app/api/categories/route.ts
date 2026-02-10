import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" }
    });

    return NextResponse.json({
      categories: categories.map(c => c.category)
    });
  } catch (error) {
    console.error("Category API error:", error);
    return NextResponse.json({ categories: [] }, { status: 500 });
  }
}
