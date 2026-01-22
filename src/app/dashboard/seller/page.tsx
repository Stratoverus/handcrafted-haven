import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart } from "lucide-react"

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
               <DollarSign className="h-4 w-4 text-stone-500" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">$1,234.56</div>
               <p className="text-xs text-stone-500">+20.1% from last month</p>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
               <Package className="h-4 w-4 text-stone-500" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">12</div>
               <p className="text-xs text-stone-500">+2 new since last week</p>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
               <ShoppingCart className="h-4 w-4 text-stone-500" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">3</div>
               <p className="text-xs text-stone-500">Requires attention</p>
            </CardContent>
         </Card>
      </div>

      <div>
         <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
         <div className="rounded-md border border-stone-200 bg-white">
            <div className="p-4 border-b border-stone-200 font-medium grid grid-cols-4 gap-4 text-sm text-stone-500">
               <div>Order ID</div>
               <div>Customer</div>
               <div>Amount</div>
               <div>Status</div>
            </div>
            {[1, 2, 3].map((i) => (
               <div key={i} className="p-4 border-b border-stone-200 last:border-0 grid grid-cols-4 gap-4 text-sm">
                  <div>#ORD-00{i}</div>
                  <div>Customer Name</div>
                  <div>$45.00</div>
                  <div className="text-yellow-600 font-medium">Pending</div>
               </div>
            ))}
         </div>
      </div>
    </div>
  )
}
