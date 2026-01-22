import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Package } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold mb-8">My Account</h1>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="md:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-lg border border-stone-200">
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-stone-400" />
                   </div>
                   <div>
                      <h2 className="font-bold text-lg">John Doe</h2>
                      <p className="text-sm text-stone-500">Member since 2024</p>
                   </div>
                </div>

                <form className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-sm font-medium">Display Name</label>
                      <Input defaultValue="John Doe" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue="john@example.com" disabled />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <textarea className="flex w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50" rows={3} defaultValue="I love handmade goods!" />
                   </div>
                   <Button className="w-full">Save Changes</Button>
                </form>
             </div>
          </div>

          {/* Order History */}
          <div className="md:col-span-2 space-y-6">
             <h2 className="text-xl font-bold flex items-center gap-2">
                <Package className="h-5 w-5" /> Order History
             </h2>

             <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="bg-white p-6 rounded-lg border border-stone-200">
                      <div className="flex items-center justify-between mb-4">
                         <div>
                            <p className="font-bold">Order #ORD-123456</p>
                            <p className="text-sm text-stone-500">Placed on Jan {10 + i}, 2024</p>
                         </div>
                         <div className="text-right">
                            <p className="font-bold">$45.00</p>
                            <span className="inline-flex items-center rounded-full border border-stone-200 px-2.5 py-0.5 text-xs font-semibold text-stone-950 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2">
                               Delivered
                            </span>
                         </div>
                      </div>
                      <div className="flex gap-4 overflow-x-auto pb-2">
                         <div className="h-16 w-16 bg-stone-100 rounded-md flex-shrink-0"></div>
                         <div className="h-16 w-16 bg-stone-100 rounded-md flex-shrink-0"></div>
                      </div>
                      <div className="mt-4 flex gap-4">
                         <Button variant="outline" size="sm">View Details</Button>
                         <Button variant="outline" size="sm">Track Package</Button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  )
}
