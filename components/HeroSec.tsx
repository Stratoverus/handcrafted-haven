"use client";

import { Inter, Playfair_Display } from "next/font/google"
import { useEffect, useState } from 'react';

const titleFont = Playfair_Display({
    subsets: ["latin"],
    weight:["500"]
});

const subTitleFont = Inter({
    subsets: ["latin"],
    weight: ["400"]
});

export default function HeroSec(){

    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
        window.scrollTo(0, 0);
    }, []);

    return(
        <section className='h-screen'>

            <picture className='absolute inset-0'>
                <source media='(min-width: 1024px)' srcSet='/knives.png' />
                <source media='(min-width: 768px)' srcSet='/leather_belt.webp' />
                <source media='(min-width: 640px)' srcSet='/hero_image.png' />
                <img 
                    src="/hero_image.png" 
                    alt="handcrafted hero"
                    className="w-full h-screen object-cover object-center"
                />
            </picture>

            <div className="relative z-10 flex flex-col gap-4 h-full items-center justify-center text-left px-4">

                <h1 className={`${titleFont.className} w-full text-white text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] 2x1:text-[7rem] text-center font-bold xl:flex xl:justify-around drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] transition-all duration-[3s] ease-out ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`} >
                    Every piece tells a story.
                </h1>

                <h3 className={`${subTitleFont.className} w-full text-white text-[1.5rem] sm:text-[1.5rem] lg:text-[2.5rem] xl:text-[3rem] 2x1:text-[4rem] text-center font-bold xl:flex xl:justify-around drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] transition-all duration-[3s] ease-out ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
                    Find unique handcrafted goods made with passion.
                </h3>

                <div className="mt-10">
                    <button className={`${subTitleFont.className} group relative animate-bounce overflow-hidden w-35 text-black bg-white text-[1.2rem] border-4 border-white rounded-lg drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] transition-all duration-[3s] ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}` }

                    onClick={() => {
                        const width = window.innerWidth;
                        if (width <= 767){
                            document.getElementById("headerMob")
                            ?.scrollIntoView({behavior: "smooth"})
                        } else {
                            document.getElementById("header")
                            ?.scrollIntoView({behavior: "smooth"})
                        }
                    }}
                    
                    >

                    <span className='p-5 relative z-10'>Join Now</span>

                    <span className='absolute left-0 h-full w-0 bg-[#cf5c36] transition-all duration-500 ease-out group-hover:w-full'></span>

                    </button>
                </div>

            </div>

        </section>
    )
}            