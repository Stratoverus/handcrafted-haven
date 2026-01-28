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
      <body>
        <div className="min-h-screen">
          <div className="max-w-[1280px] mx-auto bg-[var(--cream)]">
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