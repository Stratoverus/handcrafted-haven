import Link from "next/link"
import Image from "next/image"

export default function Logo(){
    return(
        <>
            <Link href="/" className="flex items-center justify-center">
                <Image
                    src="/Logo_5.png"
                    alt="Handcrafted Haven logo"
                    width={180}
                    height={60}
                    priority
                />
            </Link>   
        </>
    )
};