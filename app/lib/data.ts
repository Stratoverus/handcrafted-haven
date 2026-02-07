import postgres from "postgres";
import { Category } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCategories() {
    try {
        const categories = await sql<Category[]>`
            SELECT DISTINCT category
            FROM public."Product";
        `;

        return categories;

    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch categories.');
    }
}
