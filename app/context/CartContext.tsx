'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
// const CartContext = createContext<any>(null);


export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    //   const [cart, setCart] = useState<CartItem[]>(() => {
    //     const saved = localStorage.getItem('cart');
    //     return saved ? JSON.parse(saved) : [];
    //   });
    const [cart, setCart] = useState<CartItem[]>([]);

    // only run to client
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            setCart(JSON.parse(saved));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
        const exists = prev.find(p => p.id === item.id);
        if (exists) {
            return prev.map(p =>
            p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
            );
        }
        return [...prev, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
        {children}
        </CartContext.Provider>
    );
};

// export const useCart = () => useContext(CartContext);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
