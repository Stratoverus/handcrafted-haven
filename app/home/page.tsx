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
      {/* <section className="flex flex-wrap mx-auto w-4/5 px-3 py-3">
        <Image
          src="/handcrafted.png"
          alt="handcrafted"
          width={1000}
          height={300}
          className="rounded-md mx-aut"
        />
      </section> */}
       {/* Latest product section */}
      <section>
        <div className="px-6 py-3 flex items-right ">
          <h2 className="p-3 w-full text-2xl font-bold text-center">LATEST PRODUCTS</h2>
          <Link 
            href="/product-list?sort=latest"
            className="text-white hover:underline font-semibold text-sm flex items-center gap-1"
          >
            View All →
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8 px-6 py-6 justify-center items-center">
          {latestProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-[280px] lg:w-[300px]"
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
        <div className="bg-[var(--rust)] text-white px-6 py-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex justify-center items-center gap-2">
            BEST SELLERS
          </h2>
          <Link 
            href="/product-list?sort=bestsellers"
            className="text-white hover:underline font-semibold text-sm flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8 px-6 py-6 justify-center items-center">
          {topProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-[280px] lg:w-[300px] relative"
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
        <div className="bg-[var(--rust)] text-white px-6 py-3 flex items-center justify-between">
          <h2 className="text-2xl text-center font-bold">CATEGORIES</h2>
          <Link 
            href="/product-list"
            className="text-white hover:underline font-semibold text-sm flex items-center gap-1"
          >
            View All Products →
          </Link>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:justify-items-center gap-8 px-6 py-6 justify-center items-center">
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
    <article className="group border rounded-lg bg-white p-4 w-[280px] lg:w-[320px] md:w-[240px] sm:p-2 shadow-md hover:shadow-xl transition-all duration-300">
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