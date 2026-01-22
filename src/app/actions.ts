'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addProduct(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const stock = parseInt(formData.get('stock') as string) || 1
  const category = formData.get('category') as string
  // In a real app, we would upload the image to S3/Blob storage.
  // Here we just use a placeholder if no URL is somehow provided (though UI doesn't allow custom URL input yet, we'll just mock it).
  const image = "https://placehold.co/400x400?text=Product"

  // For now, assign to the first seller we find
  const seller = await prisma.user.findFirst({
    where: { role: 'SELLER' }
  })

  if (!seller) {
    throw new Error('No seller found to assign product to.')
  }

  await prisma.product.create({
    data: {
      title,
      description,
      price,
      stock,
      category,
      sellerId: seller.id,
      images: {
        create: [
          { url: image }
        ]
      }
    }
  })

  revalidatePath('/products')
  revalidatePath('/dashboard/seller')
  redirect('/dashboard/seller')
}

export async function placeOrder(formData: FormData) {
  // Mock order placement

  // 1. Find a buyer (mock)
  let buyer = await prisma.user.findFirst({
      where: { role: 'USER' }
  })

  // If no USER role, grab any user
  if (!buyer) {
      buyer = await prisma.user.findFirst()
  }

  if (!buyer) {
      // Create a dummy user if none exists (seed should have them though)
      buyer = await prisma.user.create({
          data: {
              email: "guest@example.com",
              name: "Guest User",
              role: "USER"
          }
      })
  }

  // 2. Find a product to "buy" (mock) - ideally this comes from cart
  const product = await prisma.product.findFirst()

  if (!product) throw new Error("No product to buy")

  // 3. Create Order
  await prisma.order.create({
    data: {
      userId: buyer.id,
      total: product.price, // Just buying one item for now
      status: 'PAID',
      items: {
        create: [
          {
            productId: product.id,
            quantity: 1,
            price: product.price
          }
        ]
      }
    }
  })

  redirect('/checkout/confirmation')
}
