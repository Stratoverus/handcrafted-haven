import Link from "next/link"
import { User, ShoppingCart, Bell } from "lucide-react"
import LeftNavMenu from "./LeftNavMenu"

type Props = {
    className?: string
}

export default function UserActions({className}: Props){
    return(
        <div className={className}>

            <Link href="/login" className="p-2 hover:bg-gray-100 rounded">
                <User />
            </Link>

            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded">
                <ShoppingCart />
            </Link>

            <button className="p-2 hover:bg-gray-100 rounded">
                <Bell />
            </button>

            <LeftNavMenu />

        </div>
    )
};