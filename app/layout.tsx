import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'Handmade goods marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#CF5C36] via-[#EFC88B] via-[#F4E3B2] to-[#FFF]">
        <div className="min-h-screen">
          <div className="max-w-[1280px] mx-auto">
            <Header />
              <main className="px-6 py-8">
                {children}
              </main>
            <Footer />
          </div>
        </div>
      </body>      
    </html>
  );
}
