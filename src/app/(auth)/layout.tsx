export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm border border-stone-200">
        {children}
      </div>
    </div>
  )
}
