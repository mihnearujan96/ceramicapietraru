import type { Product } from "@/data/products";
import type { Locale } from "@/lib/locale";

const enProducts: Record<
  string,
  Pick<Product, "name" | "description" | "materials" | "care"> & {
    category: string;
  }
> = {
  "farfurie-cocos": {
    name: "Rooster plate",
    category: "Plates",
    description:
      "A plate decorated with the Horezu rooster, drawn freely with the horn. Every line keeps the rhythm of the hand.",
    materials: "Local clay, slip, glaze",
    care: "Wash by hand. Avoid sudden changes in temperature.",
  },
  "cana-spirala": {
    name: "Spiral mug",
    category: "Mugs",
    description:
      "A mug thrown on the wheel, with a white spiral on a terracotta ground. Made for morning tea or a quiet coffee.",
    materials: "Clay, food-safe glaze",
    care: "Wash by hand. It can go in the microwave with care.",
  },
  "strachina-valuri": {
    name: "Wave bowl",
    category: "Bowls",
    description:
      "A deep bowl with the classic wavy line — the same gesture you see on the front of the workshop.",
    materials: "Clay, white slip, glaze",
    care: "Wash by hand.",
  },
  "vas-pamant": {
    name: "Earth vessel",
    category: "Vessels",
    description:
      "A generous clay vessel, left almost matte. You feel its weight in the palm.",
    materials: "Local clay, matte finish",
    care: "Wipe with a dry or slightly damp cloth.",
  },
  "ulcior-horezu": {
    name: "Horezu pitcher",
    category: "Pitchers",
    description:
      "A pitcher with a tall neck and a curved handle — the form that inspired the workshop building itself.",
    materials: "Clay, glaze, slip decoration",
    care: "Wash by hand. Do not leave liquid in it overnight for long periods.",
  },
  "platou-decorative": {
    name: "Decorative platter",
    category: "Decorative pieces",
    description:
      "A wall platter with traditional motifs. An object that stands in for a landscape on an empty wall.",
    materials: "Clay, slip, glaze",
    care: "Dust it with a soft cloth.",
  },
  "farfurie-simpla": {
    name: "Plain plate",
    category: "Plates",
    description:
      "An everyday plate, with a quiet border. Beautiful on the table, not only on the wall.",
    materials: "Clay, food-safe glaze",
    care: "Wash by hand.",
  },
  "cana-mica": {
    name: "Small mug",
    category: "Mugs",
    description:
      "A compact mug, right for espresso or a short tea. The handle sits naturally in the hand.",
    materials: "Clay, food-safe glaze",
    care: "Wash by hand.",
  },
};

const enCategories: Record<string, string> = {
  Farfurii: "Plates",
  Căni: "Mugs",
  Străchini: "Bowls",
  Vase: "Vessels",
  Ulcioare: "Pitchers",
  "Piese decorative": "Decorative pieces",
};

export type LocalizedProduct = Omit<Product, "category"> & { category: string };

export function localizeProduct(
  product: Product,
  locale: Locale,
): LocalizedProduct {
  if (locale !== "en") return product;
  const copy = enProducts[product.id];
  if (!copy) {
    return {
      ...product,
      category: enCategories[product.category] ?? product.category,
    };
  }
  return { ...product, ...copy };
}
