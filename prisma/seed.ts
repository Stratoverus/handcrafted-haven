import 'dotenv/config';
import { prisma } from './seed-client';
import { v4 as uuid } from 'uuid';

async function main() {
  console.log('Seeding users...');

  const users = [
    { name: 'Angie Martin', email: 'angie@example.com', role: 'SELLER' },
    { name: 'Seller 125', email: 'seller125@example.com', role: 'SELLER' },
    { name: 'Seller 126', email: 'seller126@example.com', role: 'SELLER' },
    { name: 'Seller 127', email: 'seller127@example.com', role: 'SELLER' },
    { name: 'Seller 128', email: 'seller128@example.com', role: 'SELLER' },
    { name: 'Seller 129', email: 'seller129@example.com', role: 'SELLER' },
    { name: 'Seller 130', email: 'seller130@example.com', role: 'SELLER' },
    { name: 'Seller 131', email: 'seller131@example.com', role: 'SELLER' },
    { name: 'Seller 132', email: 'seller132@example.com', role: 'SELLER' },
    { name: 'Seller 133', email: 'seller133@example.com', role: 'SELLER' },
    { name: 'Seller 134', email: 'seller134@example.com', role: 'SELLER' },
    { name: 'Seller 136', email: 'seller136@example.com', role: 'SELLER' },
    { name: 'Seller 138', email: 'seller138@example.com', role: 'SELLER' },
    { name: 'Seller 139', email: 'seller139@example.com', role: 'SELLER' },
    { name: 'Seller 140', email: 'seller140@example.com', role: 'SELLER' },
    { name: 'Seller 141', email: 'seller141@example.com', role: 'SELLER' },
  ];

  const sellerMap: Record<string, string> = {};

  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, id: uuid() },
    });
    sellerMap[user.name] = created.id;
  }

  console.log('Seeding products...');

  const products = [
    { title: 'Handmade Quilt', description: 'A beautiful handcrafted quilt.', price: 119.99, category: 'quilts', stock: 5 },
    { title: 'Patchwork Quilt', description: '', price: 150, category: 'quilts', stock: 3 },
    { title: 'Wool Hat', description: '', price: 35, category: 'hats', stock: 10 },
    { title: 'Knit Beanie', description: '', price: 25, category: 'hats', stock: 15 },
    { title: 'Leather Boots', description: '', price: 200, category: 'footwear', stock: 7 },
    { title: 'Canvas Sneakers', description: '', price: 80, category: 'footwear', stock: 20 },
    { title: 'Silk Scarf', description: '', price: 45, category: 'accessories', stock: 12 },
    { title: 'Leather Belt', description: '', price: 60, category: 'accessories', stock: 8 },
    { title: 'Leather Wallet', description: '', price: 75, category: 'leatherwork', stock: 5 },
    { title: 'Earrings Set', description: '', price: 9, category: 'jewelry', stock: 25 },
    { title: 'Beaded Necklace', description: '', price: 55, category: 'jewelry', stock: 6 },
    { title: 'Denim Skirt', description: '', price: 40, category: 'skirts', stock: 10 },
    { title: 'Pleated Skirt', description: '', price: 50, category: 'skirts', stock: 9 },
    { title: 'Cotton Shirt', description: '', price: 30, category: 'shirts', stock: 18 },
    { title: 'Linen Shirt', description: '', price: 45, category: 'shirts', stock: 15 },
    { title: 'Wool Sweater', description: '', price: 70, category: 'sweaters', stock: 12 },
    { title: 'Cashmere Sweater', description: '', price: 150, category: 'sweaters', stock: 5 },
    { title: 'Hunting Knife', description: '', price: 85, category: 'misc', stock: 2 },
    { title: 'Wooden Bowl', description: '', price: 40, category: 'misc', stock: 8 },
  ];

  const sellerNames = Object.keys(sellerMap);

  for (let i = 0; i < products.length; i++) {
    const sellerName = sellerNames[i % sellerNames.length];

    await prisma.product.create({
      data: {
        ...products[i],
        sellerId: sellerMap[sellerName],
      },
    });
  }

  console.log(`Seeded ${users.length} users and ${products.length} products!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
