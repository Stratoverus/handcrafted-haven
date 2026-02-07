import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listCategories() {
	const data = await sql`
    SELECT DISTINCT category
    FROM public."Product";
  `;

	return data;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listCategories());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}