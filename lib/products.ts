export type ProductCategory = 'small' | 'investment';

export type Product = {
  id: string;
  weight: string;
  grams: number;
  price: number;
  monthly: number;
  category: ProductCategory;
  refinery: string;
  image: string;
  popular?: boolean;
};

export const products: Product[] = [
  {
    id: '1g',
    weight: '1g',
    grams: 1,
    price: 96,
    monthly: 16,
    category: 'small',
    refinery: 'PAMP Suisse',
    image: '/news2.jpg',
  },
  {
    id: '2.5g',
    weight: '2.5g',
    grams: 2.5,
    price: 238,
    monthly: 40,
    category: 'small',
    refinery: 'Valcambi',
    image: '/news1.jpg',
  },
  {
    id: '5g',
    weight: '5g',
    grams: 5,
    price: 478,
    monthly: 80,
    category: 'small',
    refinery: 'Argor-Heraeus',
    image: '/news3.jpg',
  },
  {
    id: '10g',
    weight: '10g',
    grams: 10,
    price: 952,
    monthly: 159,
    category: 'small',
    refinery: 'PAMP Suisse',
    image: '/multigram-bars2.jpg',
    popular: true,
  },
  {
    id: '1oz',
    weight: '1 oz',
    grams: 31.1,
    price: 2930,
    monthly: 489,
    category: 'investment',
    refinery: 'Perth Mint',
    image: '/zurich-bullion-vault1.jpg',
  },
  {
    id: '50g',
    weight: '50g',
    grams: 50,
    price: 4720,
    monthly: 787,
    category: 'investment',
    refinery: 'Valcambi',
    image: '/zurich-bullion-vault7.jpg',
    popular: true,
  },
  {
    id: '100g',
    weight: '100g',
    grams: 100,
    price: 9420,
    monthly: 1570,
    category: 'investment',
    refinery: 'PAMP Suisse',
    image: '/multigram-bars5.jpg',
  },
  {
    id: '250g',
    weight: '250g',
    grams: 250,
    price: 23520,
    monthly: 3920,
    category: 'investment',
    refinery: 'Argor-Heraeus',
    image: '/wholesale-gold1.jpg',
  },
];

export type FilterId = 'all' | 'small' | 'investment';

export const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'small', label: 'Small Bars' },
  { id: 'investment', label: 'Investment Packs' },
];

export function filterProducts(items: Product[], id: FilterId): Product[] {
  if (id === 'all') return items;
  return items.filter((p) => p.category === id);
}
