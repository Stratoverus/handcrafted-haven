import postgres from "postgres";
import { Category, Product } from "./definitions";
import { prisma } from '@/lib/prisma';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCategories(): Promise<Category[]> { //fetches distinct product categories with product count for each category
  try {
    const categories = await sql<Category[]>`
      SELECT LOWER(TRIM(category)) AS category, COUNT(*) AS product_count
      FROM public."Product"
      GROUP BY LOWER(TRIM(category))
      ORDER BY LOWER(TRIM(category)) ASC
    `;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch categories.');
  }
}

export async function fetchLatestProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        ProductImage: {
          select: {
            url: true
          },
          take: 1
        }
      }
    });

    return products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      // image: product.ProductImage[0]?.url || '/placeholder-product.jpg',
    }));
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch latest products.');
  }
}




// * Correct query to avoid upper and lower case between categories *
//  SELECT LOWER(TRIM(category)) AS category, COUNT(*) AS product_count
//  FROM public."Product"
//  GROUP BY LOWER(TRIM(category))
//  ORDER BY LOWER(TRIM(category)) ASC

//  previous
      // SELECT TRIM(category) AS category, COUNT(*) AS product_count
      // FROM public."Product"
      // GROUP BY TRIM(category)
      // ORDER BY LOWER(TRIM(category)) ASC;

