"use client";

import Header from '../components/Header';
import Footer from './components/Footer';
import { NeonAuthUIProvider } from '@neondatabase/auth/react';
import { authClient } from './lib/auth/client';
import '../app/globals.css';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import HeroSec from '@/components/HeroSec';
import { usePathname } from 'next/navigation';


/*export const metadata = {
  title: 'Handcrafted Haven',
  description: 'Handmade goods marketplace',
};*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-[#CF5C36] via-[#EFC88B] via-[#F4E3B2] to-[#FFF]">
        <NeonAuthUIProvider
          authClient={authClient} 
          redirectTo='/account/profile'
          social={{
            providers: ["google", "github"]
          }}
          >
          <div className="min-h-screen">
            <div className="w-full">
              <ToastProvider>
                <CartProvider>
                  {path === "/" && <HeroSec />}
                  <Header />
                    <main className="py-8">
                      
                        {children}
                      
                    </main>
                    
                  <Footer />
                </CartProvider>
              </ToastProvider>
            </div>
          </div>
        </NeonAuthUIProvider>
        
      </body>
    </html>
  );
}