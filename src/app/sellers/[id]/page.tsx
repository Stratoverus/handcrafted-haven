import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function SellerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const seller = await prisma.user.findUnique({
      where: { id },
      include: {
          products: {
              include: {
                  images: true
              }
          }
      }
  })

  if (!seller || seller.role !== 'SELLER') {
      notFound()
  }

  // Aggregate stats (mock/placeholder for now as schema is simple)
  const salesCount = 1250 // Placeholder
  const joinYear = seller.createdAt.getFullYear()

  return (
    <div className="container mx-auto px-4 py-8">
       {/* Seller Header */}
       <div className="bg-stone-100 p-8 rounded-lg mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-md flex-shrink-0">
             <Image
                src={seller.image || "https://placehold.co/200x200?text=Seller"}
                alt={seller.name || "Seller"}
                fill
                className="object-cover"
             />
          </div>
          <div className="text-center md:text-left flex-1">
             <h1 className="text-3xl font-bold mb-2">{seller.shopName || seller.name}</h1>
             <p className="text-stone-600 mb-4 max-w-xl">{seller.bio || "No bio available."}</p>
             <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-stone-500 mb-6">
                <span>Portland, OR</span> {/* Placeholder location */}
                <span>•</span>
                <span>On Handcrafted Haven since {joinYear}</span>
                <span>•</span>
                <span>{salesCount} Sales</span>
             </div>
             <div className="flex justify-center md:justify-start gap-4">
                <Button>Contact Seller</Button>
                <Button variant="outline">Follow Shop</Button>
             </div>
          </div>
       </div>

       {/* Shop Items */}
       <h2 className="text-2xl font-bold mb-6">Shop Items</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seller.products.map(p => (
             <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                price={p.price}
                seller={seller.shopName || seller.name || "Unknown"}
                image={p.images[0]?.url || "https://placehold.co/400x400?text=No+Image"}
             />
          ))}
       </div>
    </div>
  )
}
