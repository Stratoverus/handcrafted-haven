import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      seller: true,
      images: true,
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold mb-8">All Products</h1>

       <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-8">
             <div>
                <h3 className="font-semibold mb-4">Search</h3>
                <div className="relative">
                   <Input placeholder="Search..." />
                   <Search className="absolute right-3 top-2.5 h-4 w-4 text-stone-500" />
                </div>
             </div>

             <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2 text-sm text-stone-600">
                   <label className="flex items-center gap-2">
                      <input type="checkbox" /> Jewelry
                   </label>
                   <label className="flex items-center gap-2">
                      <input type="checkbox" /> Home Decor
                   </label>
                   <label className="flex items-center gap-2">
                      <input type="checkbox" /> Clothing
                   </label>
                   <label className="flex items-center gap-2">
                      <input type="checkbox" /> Art
                   </label>
                </div>
             </div>

             <div>
                <h3 className="font-semibold mb-4">Price</h3>
                 <div className="space-y-2 text-sm text-stone-600">
                   <label className="flex items-center gap-2">
                      <input type="radio" name="price" /> Under $25
                   </label>
                   <label className="flex items-center gap-2">
                      <input type="radio" name="price" /> $25 - $50
                   </label>
                   <label className="flex items-center gap-2">
                      <input type="radio" name="price" /> $50 - $100
                   </label>
                   <label className="flex items-center gap-2">
                      <input type="radio" name="price" /> Over $100
                   </label>
                </div>
             </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                   <ProductCard
                     key={p.id}
                     id={p.id}
                     title={p.title}
                     price={p.price}
                     seller={p.seller.name || "Unknown"}
                     image={p.images[0]?.url || "https://placehold.co/400x400?text=No+Image"}
                   />
                ))}
             </div>
          </div>
       </div>
    </div>
  )
}
