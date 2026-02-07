import postgres from "postgres";
import { Category } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function fetchCategories() {
//     try {
//         const categories = await sql<Category[]>`
//             SELECT DISTINCT category
//             FROM public."Product";
//         `;

//         return categories;

//     } catch (err) {
//         console.error('Database Error:', err);
//         throw new Error('Failed to fetch categories.');
//     }
// }

export async function fetchCategories(): Promise<Category[]> {
  try {
    const categories = await sql<Category[]>`
      SELECT category, COUNT(*) AS product_count
      FROM public."Product"
      GROUP BY category;
    `;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch categories.');
  }
}

