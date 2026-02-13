import { auth } from '@/lib/auth/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get the authenticated user
    const { data: session } = await auth.getSession();
    
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const sessionUser = session.user;

    // Ensure user exists in custom User table (sync from Neon Auth if needed)
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: sessionUser.email,
          name: sessionUser.name || null,
          image: sessionUser.image || null,
          role: 'USER',
        },
      });
    }

    // Fetch user's products
    const products = await prisma.product.findMany({
      where: { sellerId: userId },
      include: {
        ProductImage: true,
        OrderItem: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch user's orders (orders containing their products)
    const orders = await prisma.order.findMany({
      where: {
        OrderItem: {
          some: {
            Product: {
              sellerId: userId,
            },
          },
        },
      },
      include: {
        OrderItem: {
          include: {
            Product: true,
          },
          where: {
            Product: {
              sellerId: userId,
            },
          },
        },
        User: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 5, // Get recent 5 orders
    });

    // Calculate stats
    const totalProducts = products.length;
    
    const activeOrders = orders.filter((order: any) => 
      order.status === 'PENDING' || order.status === 'PROCESSING' || order.status === 'SHIPPED'
    ).length;

    // Calculate monthly revenue (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const monthlyOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
        OrderItem: {
          some: {
            Product: {
              sellerId: userId,
            },
          },
        },
      },
      include: {
        OrderItem: {
          where: {
            Product: {
              sellerId: userId,
            },
          },
        },
      },
    });

    const monthlyRevenue = monthlyOrders.reduce((sum: number, order: any) => {
      const orderTotal = order.OrderItem.reduce((itemSum: number, item: any) => {
        return itemSum + (item.price * item.quantity);
      }, 0);
      return sum + orderTotal;
    }, 0);

    // Calculate views for the week (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const viewsThisWeek = products.reduce((sum: number, product: any) => {
      // For now, we'll show total views as we don't track view timestamps
      // In the future, you could add a ProductView table to track individual views
      return sum + (product.views || 0);
    }, 0);

    // Format products for dashboard
    const formattedProducts = products.slice(0, 3).map((product: any) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      stock: product.stock,
      views: product.views || 0
    }));

    // Format orders for dashboard
    const formattedOrders = orders.map((order: any) => {
      const orderTotal = order.OrderItem.reduce((sum: number, item: any) => {
        return sum + (item.price * item.quantity);
      }, 0);
      
      const firstItem = order.OrderItem[0];
      
      return {
        id: order.id.slice(0, 5),
        customer: order.User.name || order.User.email || 'Anonymous',
        item: firstItem?.Product.title || 'Multiple Items',
        amount: orderTotal,
        status: order.status.charAt(0) + order.status.slice(1).toLowerCase(),
      };
    });

    // Return dashboard data
    return Response.json({
      stats: {
        totalProducts,
        activeOrders,
        monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
        viewsThisWeek,
      },
      products: formattedProducts,
      recentOrders: formattedOrders,
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return Response.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
