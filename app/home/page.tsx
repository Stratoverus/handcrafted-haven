// 'use client'

import Image from 'next/image';
import { fetchCategories } from '../lib/data';
import Link from 'next/link';
// import { useState } from 'react';


// export default async function Front() {

//     const categories = await fetchCategories();

//     return (
//         <>
//             <section className="flex flex-wrap border-dotted border-2 border-gray-500 mx-auto w-4/5 px-3 py-3">
//                 <Image
//                     src="/handcrafted.png"
//                     alt="handcrafted"
//                     width={1000}
//                     height={300}
//                     className="rounded-md mx-auto"
//                 />
//             </section>
//             <section className="" >
//                 <h2 className='p-3'>POPULAR PRODUCTS</h2>
//                 <div className='flex gap-3 px-3 py-3 justify-between'>
//                     { categories.map( (item, index: number ) => (
//                         < Product key={index} value={item.category} />
//                     ))}
//                 </div>
//             </section>
//         </>
//     )
// }

export default async function Front() {
  const categories = await fetchCategories();

  return (
    <>
      <section className="flex flex-wrap mx-auto w-4/5 px-3 py-3"> {/*border-dotted border-2 border-gray-500*/}
        <Image
          src="/handcrafted.png"
          alt="handcrafted"
          width={1000}
          height={300}
          className="rounded-md mx-aut"
        />
      </section>

      <section>
        <h2 className="p-3">POPULAR PRODUCTS</h2>
        <div className="flex flex-wrap gap-3 px-3 py-3 justify-evenly">
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
  const source = `/categories/${value.toLowerCase()}.png`;
  // const [imgSrc, setImgSrc] = useState(`/categories/${value}.png`);

  return (
    <article className=" border rounded-lg bg-white p-4 w-[280px] lg:w-[340px] md:w-[280px] sm:p-2">
      <Link
        key={value}
        href={`/category/${value.toLowerCase()}`}
      >
        <div className='relative grid h-64 w-full'>
          <h3 className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-center font-bold uppercase text-white bg-[#cf5c36] px-4 py-2 w-3/4 transition-colors duration-300 hover:text-[#cf5c36] hover:bg-white'>{value}</h3> {/* text-center font-bold uppercase z-2 */}
          <Image
            src={source}
            alt={value}
            width={300}
            height={300}
            className="absolute inset-0 w-full h-full object-cover rounded-md z-0"
          />
          {/* rounded-md mx-auto z-0 
                onError={(e) => {
                      e.currentTarget.src = '/categories/default.png'
                  }}
                src={imgSrc}          onError={() => setImgSrc('/categories/default.png')}*/}
        </div>
      </Link>
      <h3 className='text-center font-bold'> Items by Category: <br />{count}</h3>
      {/* <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem harum eaque consequuntur officia error aperiam.</p> */}
    </article>
  )
}