// 'use client'

import Image from 'next/image';
import { fetchCategories, fetchLatestProducts, fetchTopSellingProducts } from '../lib/data';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';


export default async function Front() {

  const categories = await fetchCategories();
  const latestProducts = await fetchLatestProducts();
  const topProducts = await fetchTopSellingProducts();
  if (topProducts.length === 0) return null;

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
       {/* Latest product section */}
      <section>
        <h2 className="p-3 text-2xl font-bold">LATEST PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-6 justify-items-center">
          {latestProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-[280px] md:w-[280px] lg:w-[340px]"
            >
              <Link href={`/product/${product.id}`}>
                <div className="p-2">
                  <div className="relative h-64 rounded-md overflow-hidden">
                    <Image
                      src={product.ProductImage?.[0]?.url || '/categories/default.png'}
                      alt={product.title}
                      fill
                      sizes="280px"
                      className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-bold uppercase text-white bg-[var(--rust)] px-4 py-2 w-3/4 transition-colors duration-300 group-hover:bg-white group-hover:text-[var(--rust)]">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </Link>

              <div className="p-4 text-center space-y-1">
                <p className="text-gray-600">
                  <span className="capitalize">{product.category}</span> — ${product.price.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">
                  Added {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </article>

          ))}
        </div>
      </section>
          {/* Best seller section */}
      <section>
        <h2 className="p-3 text-2xl font-bold flex items-center gap-2">
          BEST SELLERS
          <TrendingUp className="text-[var(--rust)]" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-6 justify-items-center">
          {topProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-[280px] md:w-[280px] lg:w-[340px] relative"
            >
              {/* Popular badge */}
              <div className="absolute top-2 right-2 z-20 bg-amber-400 text-xs font-bold px-2 py-1 rounded shadow-sm">
                POPULAR
              </div>

              <Link href={`/product/${product.id}`}>
                <div className="p-2">
                  <div className="relative h-64 rounded-md overflow-hidden">
                    <Image
                      src={product.ProductImage?.[0]?.url || '/categories/default.png'}
                      alt={product.title}
                      fill
                      sizes="280px"
                      className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                    />
                    <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-bold uppercase text-white bg-[var(--rust)] px-4 py-2 w-3/4 transition-colors duration-300 group-hover:bg-white group-hover:text-[var(--rust)]">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </Link>

              <div className="p-4 text-center space-y-1">
                <p className="text-gray-600 font-medium">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-xs text-[var(--rust)] font-semibold">
                  {product.salesCount} units sold
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

             {/* Category section */}
      <section>
        <h2 className="p-3 text-2xl font-bold">CATEGORIES</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 px-6 py-6 justify-items-center justify-center">
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

  return (
    <article className="group border rounded-lg bg-white p-4 w-[280px] lg:w-[340px] md:w-[280px] sm:p-2 shadow-md hover:shadow-xl transition-all duration-300">
      <Link key={value} href={`/category/${value.toLowerCase()}`}>
        <div className='relative h-64 w-full overflow-hidden'>
          <Image
            src={source}
            alt={value}
            width={300}
            height={300}
            className="object-cover rounded-md w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <h3 className='absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-bold uppercase text-white bg-[var(--rust)] px-4 py-2 w-3/4 transition-colors duration-300 group-hover:bg-white group-hover:text-[var(--rust)]'>
            {value}
          </h3>
        </div>
      </Link>
      <h3 className='text-center font-bold mt-2'>
        Items by Category: <br />{count}
      </h3>
    </article>
  )
}