import { ProductGrid } from "@/components/products/product-grid";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import {
  productCategories,
  products,
  type ProductCategory,
} from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Colecții",
  description:
    "Farfurii, căni, străchini, vase și ulcioare lucrate manual în Horezu — fiecare piesă modelată separat.",
  path: "/colectii",
});

function categoryId(category: ProductCategory) {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default function CollectionsPage() {
  return (
    <section className="bg-warm-white pb-24 pt-32 md:pt-40">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay">
            Magazin
          </p>
          <h1 className="heading-display text-[clamp(2.75rem,7vw,5.5rem)]">
            Colecții
          </h1>
          <DecorativeLine
            variant="dots"
            color="#B96F4B"
            className="mt-6 max-w-[220px]"
          />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Obiecte create manual, unul câte unul. Nicio piesă nu este perfect
            identică cu alta — și exact așa trebuie să fie.
          </p>
        </div>

        <nav
          aria-label="Categorii"
          className="mt-10 flex flex-wrap gap-2 border-b border-border pb-6"
        >
          {productCategories.map((category) => (
            <a
              key={category}
              href={`#${categoryId(category)}`}
              className="rounded-[8px] border border-border px-4 py-2 text-sm transition-colors hover:border-clay hover:text-clay"
            >
              {category}
            </a>
          ))}
        </nav>

        <div className="mt-16 space-y-20">
          {productCategories.map((category) => {
            const items = products.filter((p) => p.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category} id={categoryId(category)}>
                <h2 className="heading-display mb-8 text-3xl md:text-4xl">
                  {category}
                </h2>
                <ProductGrid products={items} />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
