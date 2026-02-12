import postgres from "postgres";
import { Category } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCategories(): Promise<Category[]> { //fetches distinct product categories with product count for each category
  try {
    const categories = await sql<Category[]>`
      SELECT TRIM(category) AS category, COUNT(*) AS product_count
      FROM public."Product"
      GROUP BY TRIM(category)
      ORDER BY LOWER(TRIM(category)) ASC;
    `;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch categories.');
  }
}

// * Correct query to avoid upper and lower case between categories *
//  SELECT LOWER(TRIM(category)) AS category, COUNT(*) AS product_count
//  FROM public."Product"
//  GROUP BY LOWER(TRIM(category))
//  ORDER BY LOWER(TRIM(category)) ASC

