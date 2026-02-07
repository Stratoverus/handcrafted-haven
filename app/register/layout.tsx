
export const metadata = {
  title: 'Handcrafted Haven',
  description: 'Handmade goods marketplace',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="min-h-screen">
          <div className="max-w-[1280px] mx-auto bg-[var(--cream)]">
              <main className="px-6 py-8">
                {children}
              </main>
          </div>
        </div>
  );
}
