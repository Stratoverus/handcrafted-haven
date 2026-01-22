import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProductProps {
  id: string
  title: string
  price: number
  image: string
  seller: string
}

export function ProductCard({ id, title, price, image, seller }: ProductProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square relative bg-stone-100">
         {/* Using unoptimized for external images if needed, or local */}
         <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold truncate">{title}</h3>
        <p className="text-sm text-stone-500">{seller}</p>
        <p className="font-bold mt-2">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/products/${id}`} className="w-full">
            <Button className="w-full" variant="outline">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
