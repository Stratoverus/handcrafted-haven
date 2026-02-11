import { useState } from "react";
import Link from "next/link"
import { categories } from "./NavMenu";
import { X } from "lucide-react"
import { Menu } from "lucide-react";
import SearchNav from "./search";

export default function LeftNavMenu(){
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <>

            <button
                aria-label="Open categories"
                onClick={() => setMenuOpen(true)}
                className="block sm:hidden p-2 rounded hover:bg-gray-100"
                >
                <Menu className="h-6 w-6" />
            </button>

            {menuOpen && ( 
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
                menuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                        <X />
                    </button>
                </div>

                <nav className="flex flex-col p-4 gap-4">
                    <SearchNav />
                    {categories.map((category) => (
                        <Link
                        key={category}
                        href={`/category/${category.toLowerCase()}`}
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline">

                        {category}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    )
};

