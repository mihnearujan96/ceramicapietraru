"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { getDictionary } from "@/data/i18n/ro";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const copy = getDictionary();

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const primary = product.images[0];
  const secondary = product.images[1] ?? product.images[0];
  const activeImage = hovered && product.images[1] ? secondary : primary;

  return (
    <article
      className={cn("group", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/produse/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-[16px] border border-border bg-cream"
      >
        <Image
          src={activeImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.handmade ? (
          <span className="absolute left-3 top-3 rounded-[8px] bg-warm-white/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-brown">
            {copy.collections.handmade}
          </span>
        ) : null}
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {product.category}
          </p>
          <h3 className="mt-1 font-medium">
            <Link
              href={`/produse/${product.slug}`}
              className="transition-colors hover:text-clay"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-foreground">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="md"
          className="shrink-0 px-3"
          onClick={() => addItem(product)}
          disabled={product.availability === "sold"}
        >
          {copy.collections.addToCart}
        </Button>
      </div>
    </article>
  );
}
