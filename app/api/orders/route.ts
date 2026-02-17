import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, total, customer } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart is empty' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: customer.userId },
        data: {
          phone: customer.phone,
          address: customer.address,
        },
      });

      const newOrder = await tx.order.create({
        data: {
          userId: customer.userId,
          total: total,
          status: 'PENDING',
          OrderItem: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      return newOrder;
    });

    return NextResponse.json({ 
      success: true, 
      orderId: result.id 
    });

  } catch (err: any) {
    console.error('Error al procesar la orden:', err);
    
    if (err.code === 'P2003') {
      return NextResponse.json(
        { success: false, error: 'Uno de los productos no existe en la base de datos' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error interno al procesar el pedido' },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// interface OrderItemPayload {
//   id: string;
//   quantity: number;
//   price: number;
// }

// interface CustomerPayload {
//   userId: string;
//   name: string;
//   phone: string;
//   address: string;
// }

// interface OrderPayload {
//   items: OrderItemPayload[];
//   total: number;
//   customer: CustomerPayload;
// }

// export async function POST(req: Request) {
//   try {
//     const body: OrderPayload = await req.json();
//     const { items, total, customer } = body;

//     const order = await prisma.order.create({
//       data: {
//         userId: customer.userId, 
//         total,
//         status: 'PENDING',
//         OrderItem: {
//           create: items.map((item) => ({
//             productId: item.id,
//             quantity: item.quantity,
//             price: item.price,
//           })),
//         },
//       },
//       include: { OrderItem: true, User: true },
//     });

//     return NextResponse.json({ success: true, orderId: order.id });
//   } catch (err) {
//     console.error('Error creating order:', err);
//     return NextResponse.json(
//       { success: false, error: 'Failed to place order' },
//       { status: 500 }
//     );
//   }
// }