"use client";

import Image from 'next/image';
import NavMenu from '../../components/NavMenu';

type Category = {
    category: string;
    product_count: number
}

export default function FrontHome({categories}: {categories: Category[]}) {

    return (
        <>
            <section id='productsSec'>
                <div className="flex items-left mt-20 p-4 italic text-2xl font-black">
                    <h2 className="bg-white text-center w-70 rounded-lg p-3">POPULAR PRODUCTS</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-3 px-3 py-3 justify-between">
                    {categories.map((item, index) => (
                        <Product
                        key={index}
                        value={item.category}
                        count={item.product_count}
                        />
                    ))}
                </div>

            </section>
        </>
    );
}

export function Product({ value, count }: { value: string; count: number; }) {
    return (
        <article className="border p-2 rounded-lg w-full bg-white" >
            <h3 className='text-center font-bold'>{value}</h3>
            <Image
                src="/hair_bows.png"
                alt="earrings"
                width={300}
                height={300}
                className="rounded-md mx-auto"
            />
            <h3 className='text-center font-bold'> Types by Category: <br></br>#{count}</h3>
            <p className='p-4'>Lorem ipsum dolor.</p>
        </article>
    )
}