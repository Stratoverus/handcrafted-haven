import Image from 'next/image';

export default function HatsPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">
        Hats
      </h1>

      <p className="mb-8">
        Browse our collection of handcrafted hats.
      </p>

      {/* Placeholder grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="border p-4 rounded-lg">
          Straw Hat
        </div>
        <div className="border p-4 rounded-lg text-center">
          <Image
            src="/knit_hats.png"
            alt="Knit beanie"
            width={300}
            height={300}
            className="rounded-md mx-auto"
          />
          <h3 className="mt-3 font-medium">Knit Beanie</h3>
        </div>
        <div className="border p-4 rounded-lg">
          Wool Fedora
        </div>
      </div>
    </section>
  );
}