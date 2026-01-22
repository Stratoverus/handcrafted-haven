import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { placeOrder } from "@/app/actions"

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
       <h1 className="text-3xl font-bold mb-8">Checkout</h1>

       <form action={placeOrder}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-8">
                {/* Shipping Address */}
                <section>
                   <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <Input name="firstName" placeholder="First Name" />
                         <Input name="lastName" placeholder="Last Name" />
                      </div>
                      <Input name="address1" placeholder="Address Line 1" />
                      <Input name="address2" placeholder="Address Line 2 (Optional)" />
                      <div className="grid grid-cols-2 gap-4">
                         <Input name="city" placeholder="City" />
                         <Input name="state" placeholder="State" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <Input name="zip" placeholder="ZIP Code" />
                         <Input name="country" placeholder="Country" />
                      </div>
                   </div>
                </section>

                {/* Payment */}
                <section>
                   <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                   <div className="p-4 border border-stone-200 rounded-lg bg-stone-50 text-center">
                      <p className="text-stone-500 mb-2">Secure Payment Gateway Integration</p>
                      <Input name="cardNumber" placeholder="Card Number" className="mb-2" />
                      <div className="grid grid-cols-2 gap-4">
                         <Input name="mmyy" placeholder="MM/YY" />
                         <Input name="cvc" placeholder="CVC" />
                      </div>
                   </div>
                </section>
             </div>

             {/* Order Summary */}
             <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 h-fit">
                 <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  {/* Simplified Summary */}
                  <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between"><span>Items (1)</span><span>...</span></div>
                      <div className="flex justify-between"><span>Shipping</span><span>$10.00</span></div>
                      <div className="flex justify-between"><span>Tax</span><span>$8.72</span></div>
                   </div>
                   <div className="border-t border-stone-200 pt-4 flex justify-between font-bold text-lg mb-6">
                      <span>Total</span>
                      <span>(Calculated at payment)</span>
                   </div>
                   <Button className="w-full" size="lg" type="submit">Place Order (Mock)</Button>
             </div>
          </div>
       </form>
    </div>
  )
}
