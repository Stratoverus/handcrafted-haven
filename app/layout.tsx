"use client";

import Header from './components/Header';
import Footer from './components/Footer';
import { NeonAuthUIProvider } from '@neondatabase/auth/react';
import { authClient } from './lib/auth/client';
import '../app/globals.css';
import LenisProvider from './components/LenisProvide';
import { usePathname } from 'next/navigation';
import HeroSec from './components/HeroSec';

// export const metadata = {
//   title: 'Handcrafted Haven',
//   description: 'Handmade goods marketplace',
// };

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
          redirectTo='/profile'
          social={{
            providers: ["google", "github"]
          }}
          >
          <div className="min-h-screen">
              {path === "/" && <HeroSec />}
              <section>
                <Header />
                  <main>
                    <LenisProvider>{children}</LenisProvider>
                  </main>
                <Footer />
              </section>
          </div>
        </NeonAuthUIProvider>
      </body>      
    </html>
  );
}