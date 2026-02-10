import Link from "next/link"
import { User, ShoppingCart, Bell } from "lucide-react"

export default function UserActions(){
    return(
        <div className="flex items-center gap-4 shrink-0">

            <Link href="/login" className="p-2 hover:bg-gray-100 rounded">
                <User />
            </Link>

            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded">
                <ShoppingCart />
            </Link>

            <button className="p-2 hover:bg-gray-100 rounded">
                <Bell />
            </button>

        </div>
    )
};