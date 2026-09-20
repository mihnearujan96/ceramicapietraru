export type ProductAvailability = "in-stock" | "made-to-order" | "sold";

export type ProductCategory =
  | "Farfurii"
  | "Căni"
  | "Străchini"
  | "Vase"
  | "Ulcioare"
  | "Piese decorative";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  currency: "RON";
  images: string[];
  dimensions?: string;
  materials?: string;
  care?: string;
  availability: ProductAvailability;
  handmade: boolean;
  featured?: boolean;
};

/**
 * Demo inventory — replace with real product data and photography.
 * Prices and copy are placeholders for storefront UX only.
 */
export const products: Product[] = [
  {
    id: "farfurie-cocos",
    slug: "farfurie-cocos",
    name: "Farfurie Cocoș",
    category: "Farfurii",
    description:
      "Farfurie decorată cu motivul cocoșului de Horezu, desenat liber cu cornul. Fiecare linie păstrează ritmul mâinii.",
    price: 180,
    currency: "RON",
    images: [
      "/images/pottery/plate-01.svg",
      "/images/pottery/plate-02.svg",
    ],
    dimensions: "Ø 24 cm",
    materials: "Lut local, angobă, smalț",
    care: "Lavabil manual. Evitați șocurile termice bruște.",
    availability: "in-stock",
    handmade: true,
    featured: true,
  },
  {
    id: "cana-spirala",
    slug: "cana-spirala",
    name: "Cană Spirală",
    category: "Căni",
    description:
      "Cană modelată la roată, cu spirală albă pe fond terracotta. Potrivită pentru ceaiul de dimineață sau cafeaua lină.",
    price: 95,
    currency: "RON",
    images: ["/images/pottery/mug-01.svg", "/images/pottery/mug-02.svg"],
    dimensions: "H 10 cm · Ø 8 cm",
    materials: "Lut, smalț alimentar",
    care: "Lavabilă manual. Poate trece prin cuptorul cu microunde cu grijă.",
    availability: "in-stock",
    handmade: true,
    featured: true,
  },
  {
    id: "strachina-valuri",
    slug: "strachina-valuri",
    name: "Strachină Valuri",
    category: "Străchini",
    description:
      "Strachină adâncă cu linia ondulată clasică — aceeași gestică pe care o vezi pe fațada atelierului.",
    price: 145,
    currency: "RON",
    images: [
      "/images/pottery/bowl-01.svg",
      "/images/pottery/bowl-02.svg",
    ],
    dimensions: "Ø 18 cm · H 8 cm",
    materials: "Lut, angobă albă, smalț",
    care: "Lavabilă manual.",
    availability: "in-stock",
    handmade: true,
    featured: true,
  },
  {
    id: "vas-pamant",
    slug: "vas-pamant",
    name: "Vas Pământ",
    category: "Vase",
    description:
      "Vas de lut cu formă generoasă, lăsat aproape mat. Greutatea lui se simte în palmă.",
    price: 260,
    currency: "RON",
    images: ["/images/pottery/pot-01.svg", "/images/pottery/pot-02.svg"],
    dimensions: "H 28 cm · Ø 22 cm",
    materials: "Lut local, finisaj mat",
    care: "Ștergeți cu o cârpă uscată sau ușor umedă.",
    availability: "made-to-order",
    handmade: true,
    featured: true,
  },
  {
    id: "ulcior-horezu",
    slug: "ulcior-horezu",
    name: "Ulcior Horezu",
    category: "Ulcioare",
    description:
      "Ulcior cu gât înalt și toartă curbată — forma care a inspirat chiar clădirea atelierului.",
    price: 320,
    currency: "RON",
    images: [
      "/images/pottery/pitcher-01.svg",
      "/images/pottery/pitcher-02.svg",
    ],
    dimensions: "H 32 cm",
    materials: "Lut, smalț, decor angobat",
    care: "Lavabil manual. Nu lăsați lichide peste noapte pe perioade lungi.",
    availability: "in-stock",
    handmade: true,
    featured: true,
  },
  {
    id: "platou-decorative",
    slug: "platou-decorative",
    name: "Platou Decorativ",
    category: "Piese decorative",
    description:
      "Platou de perete cu motive tradiționale. Un obiect care ține loc de peisaj pe un perete gol.",
    price: 210,
    currency: "RON",
    images: [
      "/images/pottery/deco-01.svg",
      "/images/pottery/deco-02.svg",
    ],
    dimensions: "Ø 30 cm",
    materials: "Lut, angobă, smalț",
    care: "Ștergeți de praf cu o cârpă moale.",
    availability: "in-stock",
    handmade: true,
    featured: true,
  },
  {
    id: "farfurie-simpla",
    slug: "farfurie-simpla",
    name: "Farfurie Simplă",
    category: "Farfurii",
    description:
      "Farfurie cotidiană, cu bordură discretă. Frumoasă pe masă, nu doar pe perete.",
    price: 120,
    currency: "RON",
    images: ["/images/pottery/plate-02.svg"],
    dimensions: "Ø 22 cm",
    materials: "Lut, smalț alimentar",
    care: "Lavabilă manual.",
    availability: "in-stock",
    handmade: true,
  },
  {
    id: "cana-mica",
    slug: "cana-mica",
    name: "Cană Mică",
    category: "Căni",
    description:
      "Cană compactă, potrivită pentru espresso sau un ceai scurt. Mânerul se așază natural în mână.",
    price: 75,
    currency: "RON",
    images: ["/images/pottery/mug-02.svg"],
    dimensions: "H 7 cm · Ø 7 cm",
    materials: "Lut, smalț alimentar",
    care: "Lavabilă manual.",
    availability: "in-stock",
    handmade: true,
  },
];

export const productCategories: ProductCategory[] = [
  "Farfurii",
  "Căni",
  "Străchini",
  "Vase",
  "Ulcioare",
  "Piese decorative",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}
