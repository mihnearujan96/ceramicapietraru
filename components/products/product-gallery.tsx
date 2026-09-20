"use client";

import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = product.images[active] ?? product.images[0];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] border border-border bg-cream">
        <Image
          src={current}
          alt={`${product.name} — imagine ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-8"
        />
      </div>

      {product.images.length > 1 ? (
        <ul className="mt-4 flex gap-3">
          {product.images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Imagine ${index + 1}`}
                aria-current={active === index}
                className={cn(
                  "relative size-20 overflow-hidden rounded-[12px] border bg-cream transition-colors",
                  active === index ? "border-clay" : "border-border",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
