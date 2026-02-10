import { NextResponse } from 'next/server';
//import { db } from '@/lib/db'; // your DB client

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query) return NextResponse.json({ products: [] });

  //
  /*const products = await db.product.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
    },
    take: 10, // limit results to 10....change number as needed
  });
*/
  return NextResponse.json({ products });
}