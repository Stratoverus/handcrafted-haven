import { NextResponse } from 'next/server';

const products = [
  { id: '1', title: 'Handmade Quilt', description: 'A beautiful handcrafted quilt.', price: 119.99, category: 'quilts', stock: 5, sellerId: 'Angie Martin', comments: 'Made with love and high-quality materials.', imageUrl: '/quilts.png'},
  { id: '2', title: 'Patchwork Quilt', category: 'quilts', price: 150, stock: 3, sellerId: 'Angie Martin', comments: 'Colorful and cozy.', imageUrl: '/quilt.png' },
  { id: '3', title: 'Wool Hat', category: 'hats', price: 35, stock: 10, sellerId: 'seller125', comments: 'Warm and stylish.', imageUrl: '/hats.png' },
  { id: '4', title: 'Knit Beanie', category: 'hats', price: 25, stock: 15, sellerId: 'seller126', comments: 'Perfect for winter.', imageUrl: '/knit_hat.webp' },
  { id: '5', title: 'Leather Boots', category: 'footwear', price: 200, stock: 7, sellerId: 'seller127', comments: 'Durable and comfortable.', imageUrl: '/leather_boots.webp' },
  { id: '6', title: 'Canvas Sneakers', category: 'footwear', price: 80, stock: 20, sellerId: 'seller128', comments: 'Casual and trendy.', imageUrl: '/canvas_sneakers.webp' },
  { id: '7', title: 'Silk Scarf', category: 'accessories', price: 45, stock: 12, sellerId: 'seller129', comments: 'Elegant and soft.', imageUrl: '/silk_scarf.webp' },
  { id: '8', title: 'Leather Belt', category: 'accessories', price: 60, stock: 8, sellerId: 'seller130', comments: 'Classic and durable.', imageUrl: '/leather_belt.webp' },
  { id: '9', title: 'Leather Wallet', category: 'leatherwork', price: 75, stock: 5, sellerId: 'seller131', comments: 'Handcrafted with care.', imageUrl: '/leather_wallet.webp' },
  { id: '10', title: 'Earrings Set', category: 'jewelry', price: 9, stock: 25, sellerId: 'seller132', comments: 'Beautiful and affordable.', imageUrl: '/earrings 1.png' },
  { id: '11', title: 'Beaded Necklace', category: 'jewelry', price: 55, stock: 6, sellerId: 'seller133', comments: 'Handmade with care.', imageUrl:'/beaded_necklace.webp' },
  { id: '12', title: 'Denim Skirt', category:'skirts', price :40, stock :10, sellerId:'seller134' ,comments:'Classic and comfortable.',imageUrl:'/denim_skirt.webp'},
  { id: '13', title: 'Pleated Skirt', category: 'skirts', price: 50, stock: 9, sellerId: 'seller134', comments: 'Stylish and elegant.', imageUrl: '/pleated_skirt.webp' },
  { id: '14', title: 'Cotton Shirt', category: 'shirts', price: 30, stock: 18, sellerId: 'seller136', comments: 'Breathable and soft.', imageUrl: '/cotton_shirt.webp' },
  { id: '15', title: 'Linen Shirt', category: 'shirts', price: 45, stock: 15, sellerId: 'seller136', comments: 'Lightweight and comfortable.', imageUrl: '/linen_shirt.webp' },
  { id: '16', title: 'Wool Sweater', category: 'sweaters', price: 70, stock: 12, sellerId: 'seller138', comments: 'Warm and cozy.', imageUrl: '/sweaters.png' },
  { id: '17', title: 'Cashmere Sweater', category: 'sweaters', price: 150, stock: 5, sellerId: 'seller139', comments: 'Luxurious and soft.', imageUrl: '/cashmere_sweater.webp' },
  { id: '18', title: 'Hunting Knife', category: 'misc', price: 85, stock: 2, sellerId: 'seller140', comments: 'High-quality and sharp.', imageUrl: '/knife.png' },
  { id: '19', title: 'Wooden Bowl', category: 'misc', price: 40, stock: 8, sellerId: 'seller141', comments: 'Handcrafted and beautiful.', imageUrl: '/bowl.webp' },
  { id: '20', title: 'Leather Belt', category: 'leatherwork', price: 60, stock: 8, sellerId: 'seller130', comments: 'Classic and durable.', imageUrl: '/leather_belt.webp' },
  { id: '21', title: 'Leather Boots', category: 'leatherwork', price: 200, stock: 7, sellerId: 'seller127', comments: 'Durable and comfortable.', imageUrl: '/leather_boots.webp' },
  { id: '22', title: 'Swords', category: 'misc', price: 125, stock: 2, sellerId: 'seller140', comments: 'High-quality and sharp.', imageUrl: '/swords.png' },
  { id: '23', title: 'Tie', category: 'accessories', price: 15, stock: 8, sellerId: 'seller130', comments: 'Stylish.', imageUrl: '/ties.png' },
  { id: '24', title: 'Bows', category: 'accessories', price: 10, stock: 8, sellerId: 'seller130', comments: 'Stylish.', imageUrl: '/accessories.png' },
  
];

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { id } = params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ product });
}