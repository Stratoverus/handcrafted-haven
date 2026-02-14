'use client';

import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum: number, item) => sum + item.price * item.quantity, 0
  );

  return (
    <main className="p-6">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="mb-4">
              <p>
                {item.title} — ${item.price.toFixed(2)} × {item.quantity}
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </main>
  );
}

// import { useEffect, useState } from 'react';

// interface CartItem {
//   id: string;
//   title: string;
//   price: number;
//   quantity: number;
// }

// export default function Cart() {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
//     setCart(savedCart);
//   }, []);

//   const removeItem = (id: string) => {
//     const updatedCart = cart.filter(item => item.id !== id);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <main style={{ padding: '2rem' }}>
//       <h1>Handcrafted Haven</h1>
//       <h2>Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           {cart.map(item => (
//             <div key={item.id} style={{ marginBottom: '1rem' }}>
//               <p>
//                 {item.title} — ${item.price.toFixed(2)} × {item.quantity}
//               </p>
//               <button onClick={() => removeItem(item.id)}>Remove</button>
//             </div>
//           ))}

//           <h3>Total: ${total.toFixed(2)}</h3>
//           <button onClick={clearCart}>Clear Cart</button>
//         </div>
//       )}
//     </main>
//   );
// }