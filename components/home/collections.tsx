"use client";

import { Reveal } from "@/components/animation/reveal";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProducts } from "@/data/products";
import { getDictionary } from "@/data/i18n/ro";

const copy = getDictionary();
const featured = getFeaturedProducts().slice(0, 6);

export function Collections() {
  return (
    <section
      id="colectii"
      className="bg-warm-white py-20 md:py-28"
      aria-labelledby="collections-title"
    >
      <Container>
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={copy.collections.eyebrow}
            title={copy.collections.title}
            description={copy.collections.supporting}
          />
          <Reveal>
            <Button href="/colectii" variant="secondary" showArrow>
              {copy.collections.viewAll}
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
