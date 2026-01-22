import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="max-w-2xl mx-auto">
       <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Edit Product</h1>
       </div>

       <form className="space-y-6 bg-white p-8 rounded-lg border border-stone-200">
          <div className="space-y-2">
             <label className="text-sm font-medium">Product Title</label>
             <Input defaultValue="Handmade Ceramic Vase" />
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium">Description</label>
             <textarea className="flex min-h-[80px] w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50" rows={5} defaultValue="This beautiful ceramic vase is hand-thrown..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">Price ($)</label>
                <Input type="number" defaultValue={45.00} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Stock</label>
                <Input type="number" defaultValue={1} />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium">Category</label>
             <select className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue="Home Decor">
                <option>Select a category</option>
                <option>Jewelry</option>
                <option>Home Decor</option>
                <option>Clothing</option>
                <option>Art</option>
             </select>
          </div>

          <div className="pt-4 flex justify-end gap-4">
             <Button variant="outline">Cancel</Button>
             <Button>Save Changes</Button>
          </div>
       </form>
    </div>
  )
}
