import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, MessageSquare, Settings } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 hidden md:block">
        <nav className="p-4 space-y-2">
          <Link href="/dashboard/seller" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-stone-100 text-stone-900">
             <LayoutDashboard className="h-4 w-4" /> Overview
          </Link>
          <Link href="/dashboard/seller/products/add" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-stone-600 hover:bg-stone-50 hover:text-stone-900">
             <Package className="h-4 w-4" /> Add Product
          </Link>
          <Link href="#" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-stone-600 hover:bg-stone-50 hover:text-stone-900">
             <ShoppingBag className="h-4 w-4" /> Orders
          </Link>
          <Link href="#" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-stone-600 hover:bg-stone-50 hover:text-stone-900">
             <MessageSquare className="h-4 w-4" /> Messages
          </Link>
           <Link href="#" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-stone-600 hover:bg-stone-50 hover:text-stone-900">
             <Settings className="h-4 w-4" /> Settings
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 bg-stone-50">
         {children}
      </main>
    </div>
  )
}
