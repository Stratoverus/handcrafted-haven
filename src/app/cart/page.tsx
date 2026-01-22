import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"

// Mock Cart Items
const cartItems = [
   { id: "1", title: "Handmade Ceramic Vase", price: 45.00, quantity: 1, image: "https://placehold.co/100x100?text=Vase", seller: "Earth & Clay" },
   { id: "2", title: "Knitted Wool Scarf", price: 32.00, quantity: 2, image: "https://placehold.co/100x100?text=Scarf", seller: "Cozy Knits" }
]

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = 10.00
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
             {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border border-stone-200 rounded-lg bg-white">
                   <div className="relative w-24 h-24 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                   </div>
                   <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <h3 className="font-semibold">{item.title}</h3>
                         <p className="text-sm text-stone-500">Sold by {item.seller}</p>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <select className="h-8 rounded-md border border-stone-200 text-sm" defaultValue={item.quantity}>
                               {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                               <Trash2 className="h-4 w-4" />
                            </Button>
                         </div>
                         <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          {/* Summary */}
          <div>
             <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4 text-sm">
                   <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                   </div>
                </div>
                <div className="border-t border-stone-200 pt-4 flex justify-between font-bold text-lg mb-6">
                   <span>Total</span>
                   <span>${total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" className="w-full">
                   <Button className="w-full" size="lg">Proceed to Checkout</Button>
                </Link>
             </div>
          </div>
       </div>
    </div>
  )
}
