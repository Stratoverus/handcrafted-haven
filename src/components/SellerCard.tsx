import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SellerProps {
  id: string
  name: string
  bio: string
  image?: string // Avatar
}

export function SellerCard({ id, name, bio, image }: SellerProps) {
  return (
    <Card className="text-center p-6 hover:shadow-md transition-shadow">
       <div className="w-20 h-20 rounded-full bg-stone-200 mx-auto mb-4 overflow-hidden relative">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold text-2xl">
                {name.charAt(0)}
             </div>
          )}
       </div>
       <h3 className="font-bold text-lg">{name}</h3>
       <p className="text-sm text-stone-500 mb-4 line-clamp-2">{bio}</p>
       <Link href={`/sellers/${id}`}>
          <Button variant="outline" size="sm">Visit Shop</Button>
       </Link>
    </Card>
  )
}
