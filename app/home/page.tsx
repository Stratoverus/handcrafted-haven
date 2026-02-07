import Image from 'next/image';

export default function Front() {
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
            <section className="" >
                <h2 className='p-3'>POPULAR PRODUCTS</h2>
                <div className='flex gap-3 px-3 py-3 justify-between'>
                    < Product value={"ONE"} />
                    < Product value={"TWO"} />
                    < Product value={"THREE"} />
                </div>
            </section>
        </>
    )
}

export function Product({ value }: { value: string }) {
    return (
        <article className="border p-4 rounded-lg w-1/1 bg-white" >
            <h3 className=''>{value}</h3>
            <Image
                src="/hair_bows.png"
                alt="earrings"
                width={300}
                height={300}
                className="rounded-md mx-auto"
            />
            <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem harum eaque consequuntur officia error aperiam.</p>
        </article>
    )
}