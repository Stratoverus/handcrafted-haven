'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    payment: 'card',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example: send order to backend
    const order = { items: cart, total, customer: form };
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Shipping Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <select
          value={form.payment}
          onChange={e => setForm({ ...form, payment: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
          <button
            type="submit"
            className="bg-[var(--rust)] text-white px-6 py-3 rounded-lg hover:bg-[#b84f2e]"
          >
            Place Order
          </button>
        </div>
      </form>
    </main>
  );
}
