import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-white mb-4">Handcrafted Haven</h3>
          <p className="text-sm">Connecting buyers with unique, handmade treasures from around the world.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Gift Cards</Link></li>
            <li><Link href="#" className="hover:text-white">Sitemap</Link></li>
            <li><Link href="#" className="hover:text-white">Handcrafted Haven Blog</Link></li>
            <li><Link href="#" className="hover:text-white">Handcrafted Haven United Kingdom</Link></li>
          </ul>
        </div>
        <div>
           <h4 className="font-bold text-white mb-4">Sell</h4>
           <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Sell on Handcrafted Haven</Link></li>
            <li><Link href="#" className="hover:text-white">Teams</Link></li>
            <li><Link href="#" className="hover:text-white">Forums</Link></li>
            <li><Link href="#" className="hover:text-white">Affiliates</Link></li>
           </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">About</h4>
           <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Handcrafted Haven, Inc.</Link></li>
            <li><Link href="#" className="hover:text-white">Policies</Link></li>
            <li><Link href="#" className="hover:text-white">Investors</Link></li>
            <li><Link href="#" className="hover:text-white">Careers</Link></li>
            <li><Link href="#" className="hover:text-white">Press</Link></li>
           </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-stone-800 text-xs text-center">
         <p>&copy; 2024 Handcrafted Haven, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
