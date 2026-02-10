import Image from "next/image";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sellerId: string;
  ProductImage: { id: string; url: string }[];
}

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, {
    cache: "no-store", // ensures fresh data
  });
  const data = await res.json();
  return data.products;
}

export default async function ProductListPage() {
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          {product.ProductImage.length > 0 && (
            <Image
              src={product.ProductImage[0].url}
              alt={product.title}
              width={300}
              height={300}
            />
          )}
          <h2 className="text-xl font-bold mt-2">{product.title}</h2>
          <p>{product.description}</p>
          <p className="font-semibold mt-1">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
