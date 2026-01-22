import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Sellers
  const earthClay = await prisma.user.create({
    data: {
      name: "Earth & Clay",
      email: "earthandclay@example.com",
      role: "SELLER",
      shopName: "Earth & Clay",
      bio: "Handcrafted ceramics for your home.",
      image: "https://placehold.co/100x100?text=EC",
    }
  })

  const cozyKnits = await prisma.user.create({
    data: {
      name: "Cozy Knits",
      email: "cozyknits@example.com",
      role: "SELLER",
      shopName: "Cozy Knits",
      bio: "Warm, wooly goodness made with love.",
      image: "https://placehold.co/100x100?text=CK",
    }
  })

  const timberWorks = await prisma.user.create({
    data: {
      name: "Timber Works",
      email: "timberworks@example.com",
      role: "SELLER",
      shopName: "Timber Works",
      bio: "Sustainable woodworking from reclaimed materials.",
      image: "https://placehold.co/100x100?text=TW",
    }
  })

  const silverLining = await prisma.user.create({
    data: {
        name: "Silver Lining",
        email: "silver@example.com",
        role: "SELLER",
        shopName: "Silver Lining",
        bio: "Elegant silver jewelry.",
        image: "https://placehold.co/100x100?text=SL"
    }
  })

    const hideStitch = await prisma.user.create({
    data: {
        name: "Hide & Stitch",
        email: "hide@example.com",
        role: "SELLER",
        shopName: "Hide & Stitch",
        bio: "Premium leather goods.",
        image: "https://placehold.co/100x100?text=HS"
    }
  })

    const scents = await prisma.user.create({
    data: {
        name: "Scents & Sensibility",
        email: "scents@example.com",
        role: "SELLER",
        shopName: "Scents & Sensibility",
        bio: "Aromatic soy wax candles.",
        image: "https://placehold.co/100x100?text=SS"
    }
  })

  // Products
  // 1. Vase
  await prisma.product.create({
    data: {
      title: "Handmade Ceramic Vase",
      description: "This beautiful ceramic vase is hand-thrown and glazed with a unique earth-tone finish.",
      price: 45.00,
      category: "Home Decor",
      sellerId: earthClay.id,
      images: {
        create: [
            { url: "https://placehold.co/400x400?text=Vase" },
            { url: "https://placehold.co/600x600?text=Vase+2" },
            { url: "https://placehold.co/600x600?text=Vase+3" }
        ]
      },
      reviews: {
          create: [
              { rating: 5, comment: "Absolutely beautiful!", userId: cozyKnits.id }, // Buying from each other for mock
          ]
      }
    }
  })

  // 2. Scarf
  await prisma.product.create({
    data: {
      title: "Knitted Wool Scarf",
      description: "Warm and cozy wool scarf.",
      price: 32.00,
      category: "Clothing",
      sellerId: cozyKnits.id,
      images: {
        create: [{ url: "https://placehold.co/400x400?text=Scarf" }]
      }
    }
  })

  // 3. Cutting Board
  await prisma.product.create({
    data: {
      title: "Wooden Cutting Board",
      description: "Durable wooden cutting board.",
      price: 55.00,
      category: "Home Decor",
      sellerId: timberWorks.id,
      images: {
        create: [{ url: "https://placehold.co/400x400?text=Board" }]
      }
    }
  })

    // 4. Ring
  await prisma.product.create({
    data: {
      title: "Silver Ring",
      description: "Sterling silver ring.",
      price: 28.00,
      category: "Jewelry",
      sellerId: silverLining.id,
      images: {
        create: [{ url: "https://placehold.co/400x400?text=Ring" }]
      }
    }
  })

      // 5. Wallet
  await prisma.product.create({
    data: {
      title: "Leather Wallet",
      description: "Hand-stitched leather wallet.",
      price: 40.00,
      category: "Clothing",
      sellerId: hideStitch.id,
      images: {
        create: [{ url: "https://placehold.co/400x400?text=Wallet" }]
      }
    }
  })

      // 6. Candle
  await prisma.product.create({
    data: {
      title: "Soy Wax Candle",
      description: "Lavender scented candle.",
      price: 15.00,
      category: "Home Decor",
      sellerId: scents.id,
      images: {
        create: [{ url: "https://placehold.co/400x400?text=Candle" }]
      }
    }
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
