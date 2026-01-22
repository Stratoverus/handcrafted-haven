import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { SellerCard } from "@/components/SellerCard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    include: {
      seller: true,
      images: true,
    }
  })

  const featuredSellers = await prisma.user.findMany({
    where: { role: 'SELLER' },
    take: 3
  })

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="bg-stone-100 py-20 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-stone-900">
            Discover Unique Handcrafted Goods
          </h1>
          <p className="text-xl text-stone-600 mb-8">
            Support independent creators and find treasures you won&apos;t see anywhere else.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products">
               <Button size="lg" className="rounded-full px-8">Shop Now</Button>
            </Link>
            <Link href="/dashboard/seller">
               <Button size="lg" variant="outline" className="rounded-full px-8">Sell Your Art</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {["Jewelry", "Home Decor", "Clothing", "Art"].map((cat) => (
             <Link href={`/products?category=${cat}`} key={cat} className="group">
               <div className="aspect-[4/3] bg-stone-200 rounded-lg flex items-center justify-center text-xl font-bold text-stone-700 group-hover:bg-stone-300 transition-colors">
                  {cat}
               </div>
             </Link>
           ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold">Featured Products</h2>
           <Link href="/products" className="text-sm font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
           {featuredProducts.map((p) => (
             <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                price={p.price}
                seller={p.seller.shopName || p.seller.name || "Unknown"}
                image={p.images[0]?.url || "https://placehold.co/400x400?text=No+Image"}
             />
           ))}
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="container mx-auto px-4 bg-stone-50 py-12 rounded-xl">
         <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold">Featured Sellers</h2>
           <Link href="/sellers" className="text-sm font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {featuredSellers.map((s) => (
             <SellerCard
                key={s.id}
                id={s.id}
                name={s.shopName || s.name || "Unknown"}
                bio={s.bio || ""}
                image={s.image || undefined}
             />
           ))}
        </div>
      </section>
    </div>
  );
}
