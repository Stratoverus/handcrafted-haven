import Link from "next/link"
import UserActions from "./userActions";
import Logo from "./logo";

export const categories = [
        'Sweaters',
        'Shirts',
        'Hats',
        'Footwear',
        'Quilts',
        'Other',
    ];

export default function NavMenu(){    

    return(
        <nav id="nav" className="border-t bg-[#fff]/60 text-[#050517]">        

            <div className="px-6 py-3 flex justify-center gap-6">
                {categories.map((category) => (
                    <Link
                        key={category}
                        href={`/category/${category.toLowerCase()}`}
                        className="hidden sm:block text-lg p-1 rounded-lg hover:bg-gray-500/15"
                        >
                        {category}
                    </Link>
                ))}

                <UserActions className="sm:hidden flex gap-10 items-center shrink-0" />
                
            </div>
        </nav>
    )
};