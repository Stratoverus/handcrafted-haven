import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-lg">
       <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
       </div>
       <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
       <p className="text-stone-600 mb-8">
          Thank you for your purchase. Your order #ORD-123456 has been received and is being processed. You will receive an email confirmation shortly.
       </p>
       <div className="flex justify-center gap-4">
          <Link href="/">
             <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/profile">
             <Button>View Order</Button>
          </Link>
       </div>
    </div>
  )
}
