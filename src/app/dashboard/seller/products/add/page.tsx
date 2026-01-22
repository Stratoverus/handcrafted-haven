import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addProduct } from "@/app/actions"

export default function AddProductPage() {
  return (
    <div className="max-w-2xl mx-auto">
       <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Add New Product</h1>
       </div>

       <form action={addProduct} className="space-y-6 bg-white p-8 rounded-lg border border-stone-200">
          <div className="space-y-2">
             <label htmlFor="title" className="text-sm font-medium">Product Title</label>
             <Input name="title" id="title" placeholder="e.g. Handmade Ceramic Mug" required />
          </div>

          <div className="space-y-2">
             <label htmlFor="description" className="text-sm font-medium">Description</label>
             <textarea name="description" id="description" className="flex min-h-[80px] w-full rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Describe your product..." rows={5} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
                <Input name="price" id="price" type="number" step="0.01" placeholder="0.00" required />
             </div>
             <div className="space-y-2">
                <label htmlFor="stock" className="text-sm font-medium">Stock</label>
                <Input name="stock" id="stock" type="number" placeholder="1" required />
             </div>
          </div>

          <div className="space-y-2">
             <label htmlFor="category" className="text-sm font-medium">Category</label>
             <select name="category" id="category" className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">Select a category</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Clothing">Clothing</option>
                <option value="Art">Art</option>
             </select>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium">Images</label>
             <div className="border-2 border-dashed border-stone-200 rounded-lg p-8 text-center hover:bg-stone-50 transition-colors cursor-pointer">
                <p className="text-stone-500">Image upload simulated (placeholder will be used)</p>
             </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
             <Button variant="outline" type="button">Cancel</Button>
             <Button type="submit">Publish Listing</Button>
          </div>
       </form>
    </div>
  )
}
