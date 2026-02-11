import { useState } from "react";
import { Search } from "lucide-react";

type Props = {
    className?: string
}

export default function SearchNav({className}: Props){
    const [menuOpen, setMenuOpen] = useState(false);


    return(
        <>
            <div className={className}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-full px-4 py-2 pl-10"
                        style={{ border: "2px solid black" }}
                    />
                    <Search  className="absolute left-3 top-2.5 h-5 w-5 text-black" />
                </div>
            </div>   
        </>
    )
}