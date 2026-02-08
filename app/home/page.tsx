import Image from 'next/image';
import { fetchCategories } from '../lib/data';


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
      <section className="flex flex-wrap border-dotted border-2 border-gray-500 mx-auto w-4/5 px-3 py-3">
        <Image
          src="/handcrafted.png"
          alt="handcrafted"
          width={1000}
          height={300}
          className="rounded-md mx-auto"
        />
      </section>

      <section>
        <h2 className="p-3">POPULAR PRODUCTS</h2>
        <div className="flex gap-3 px-3 py-3 justify-between">
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
        <article className="border p-4 rounded-lg w-1/1 bg-white" >
            <h3 className='text-center font-bold'>{value}</h3>
            <Image
                src="/hair_bows.png"
                alt="earrings"
                width={300}
                height={300}
                className="rounded-md mx-auto"
            />
            <h3 className='text-center font-bold'> Types by Category: <br></br>#{count}</h3>
            <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem harum eaque consequuntur officia error aperiam.</p>
        </article>
    )
}