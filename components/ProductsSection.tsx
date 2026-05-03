import ProductCard, { Product } from './ProductCard';

const products: Product[] = [
  {
    weight: '1g',
    price: 96,
    monthly: 16,
    image:
      'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&w=900&q=80',
  },
  {
    weight: '5g',
    price: 478,
    monthly: 80,
    image:
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=900&q=80',
  },
  {
    weight: '10g',
    price: 952,
    monthly: 159,
    image:
      'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=900&q=80',
    popular: true,
  },
  {
    weight: '50g',
    price: 4720,
    monthly: 787,
    image:
      'https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&w=900&q=80',
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400">
              Collection
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
              Choose Your <span className="text-gold-gradient">Gold Bar</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400">
            From entry-level grams to investment-grade ingots — every bar comes
            with serial number, assay certificate and lifetime buy-back.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.weight} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
