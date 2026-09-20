"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { getDictionary } from "@/data/i18n/ro";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const copy = getDictionary();

type ProductPurchaseProps = {
  product: Product;
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const availabilityLabel =
    product.availability === "in-stock"
      ? copy.product.inStock
      : product.availability === "made-to-order"
        ? copy.product.madeToOrder
        : copy.product.sold;

  return (
    <div className="lg:sticky lg:top-28">
      <p className="text-xs uppercase tracking-[0.18em] text-clay">
        {product.category}
      </p>
      <h1 className="heading-display mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">
        {product.name}
      </h1>
      <p className="mt-4 text-2xl">{formatPrice(product.price, product.currency)}</p>
      <p className="mt-2 text-sm text-muted">{availabilityLabel}</p>
      <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-brown">
        {copy.product.handmadeIn}
      </p>
      <p className="mt-6 text-base leading-relaxed text-muted">
        {product.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted">
            {copy.product.quantity}
          </p>
          <div className="inline-flex items-center rounded-[12px] border border-border">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center"
              aria-label="Scade cantitatea"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-10 text-center">{quantity}</span>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center"
              aria-label="Crește cantitatea"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        <Button
          size="lg"
          className="mt-5 sm:mt-6"
          showArrow
          disabled={product.availability === "sold"}
          onClick={() => addItem(product, quantity)}
        >
          {copy.product.addToCart}
        </Button>
      </div>

      <dl className="mt-10 space-y-4 border-t border-border pt-8 text-sm">
        {product.materials ? (
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
              {copy.product.materials}
            </dt>
            <dd className="mt-1">{product.materials}</dd>
          </div>
        ) : null}
        {product.dimensions ? (
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
              {copy.product.dimensions}
            </dt>
            <dd className="mt-1">{product.dimensions}</dd>
          </div>
        ) : null}
        {product.care ? (
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-muted">
              {copy.product.care}
            </dt>
            <dd className="mt-1">{product.care}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-muted">
            {copy.product.shipping}
          </dt>
          <dd className="mt-1 text-muted">{copy.product.shippingPlaceholder}</dd>
        </div>
      </dl>
    </div>
  );
}
