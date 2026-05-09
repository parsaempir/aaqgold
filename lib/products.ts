export type CategoryId = 'bars' | 'coins' | 'watches' | 'jewelry';

export type Category = {
  id: CategoryId;
  label: string;
  count: number;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  outOfStock?: boolean;
  featured?: boolean;
};

const u = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

// All photo IDs verified via Unsplash search for gold-themed imagery.
export const categories: Category[] = [
  {
    id: 'bars',
    label: 'Gold Bars',
    count: 7,
    image: u('photo-1610375461369-d613b564f4c4', 1200),
  },
  {
    id: 'coins',
    label: 'Gold Coins',
    count: 10,
    image: u('photo-1589180176337-503fed4bcfe0', 1200),
  },
  {
    id: 'watches',
    label: 'Gold Watches',
    count: 3,
    image: u('photo-1730757679771-b53e798846cf', 1200),
  },
  {
    id: 'jewelry',
    label: 'Gold Jewelry',
    count: 5,
    image: u('photo-1616837874254-8d5aaa63e273', 1200),
  },
];

export const categoryLabel = (id: CategoryId): string =>
  categories.find((c) => c.id === id)?.label ?? '';

export const products: Product[] = [
  {
    id: 'bullion-1kg',
    name: '1kg Gold Cast Bar',
    description:
      'LBMA-certified 999.9 fine cast bar with serial number and assay certificate.',
    price: 65999,
    category: 'bars',
    image: u('photo-1610375461246-83df859d849d'),
    featured: true,
  },
  {
    id: 'cuban-link',
    name: '24K Cuban Link Chain',
    description:
      'Heavy 24K Cuban link with diamond-set clasp. Solid gold, hand-finished.',
    price: 7216,
    category: 'jewelry',
    image: u('photo-1602173574767-37ac01994b2a'),
    featured: true,
  },
  {
    id: 'dress-watch-18k',
    name: '18K Rose Gold Dress Watch',
    description:
      'Swiss automatic with sunray dial and Italian alligator strap. 41mm case.',
    price: 28387,
    category: 'watches',
    image: u('photo-1618215649872-6e3143a716ec'),
    outOfStock: true,
    featured: true,
  },
  {
    id: 'eagle-1oz',
    name: 'American Gold Eagle 1oz',
    description:
      '22K US legal-tender coin. .9999 fine gold, classic Liberty design by the U.S. Mint.',
    price: 2620,
    category: 'coins',
    image: u('photo-1621504450181-5d356f61d307'),
    featured: true,
  },
  {
    id: 'eternity-ring',
    name: 'Diamond Eternity Ring',
    description:
      '18K gold with full pavé brilliant-cut diamonds. Hand-set, conflict-free.',
    price: 4180,
    category: 'jewelry',
    image: u('photo-1605100804763-247f67b3557e'),
    featured: true,
  },
  {
    id: 'tennis-bracelet',
    name: '18K Diamond Tennis Bracelet',
    description:
      'Classic tennis bracelet with continuous round-cut diamonds in 18K gold.',
    price: 9320,
    category: 'jewelry',
    image: u('photo-1633934542430-0905ccb5f050'),
    featured: true,
  },
  {
    id: 'maple-leaf',
    name: 'Canadian Maple Leaf 1oz',
    description:
      '.9999 fine gold coin, Royal Canadian Mint. With micro-engraved security feature.',
    price: 2580,
    category: 'coins',
    image: u('photo-1586974710160-55f48f417990'),
  },
  {
    id: 'pendant-22k',
    name: '22K Pendant Necklace',
    description:
      'Hand-finished pendant on a fine 22K gold rope chain. Polished mirror finish.',
    price: 1840,
    category: 'jewelry',
    image: u('photo-1569397288884-4d43d6738fbd'),
  },
];

export const featuredProducts = (): Product[] =>
  products.filter((p) => p.featured);
