"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { useCart } from "@/components/cart/cart-provider";
import { getDictionary } from "@/data/i18n/ro";
import { formatPrice } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const copy = getDictionary();

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
  } = useCart();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label={copy.cart.close}
            className="fixed inset-0 z-[70] bg-charcoal/40 backdrop-blur-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={copy.cart.title}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-warm-white shadow-[-20px_0_60px_rgba(23,21,19,0.12)]"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="heading-display text-2xl">{copy.cart.title}</h2>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex size-11 items-center justify-center rounded-[12px]"
                aria-label={copy.cart.close}
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Logo height={64} href={null} className="mb-6 opacity-80" />
                  <p className="heading-display text-3xl">{copy.cart.empty}</p>
                  <p className="mt-3 max-w-xs text-sm text-muted">
                    {copy.cart.emptyHint}
                  </p>
                  <Button
                    href="/colectii"
                    className="mt-8"
                    showArrow
                    onClick={closeCart}
                  >
                    {copy.cart.continueShopping}
                  </Button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-4">
                      <Link
                        href={`/produse/${item.slug}`}
                        onClick={closeCart}
                        className="relative size-20 shrink-0 overflow-hidden rounded-[12px] bg-cream"
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-contain p-2"
                          sizes="80px"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link
                              href={`/produse/${item.slug}`}
                              onClick={closeCart}
                              className="font-medium hover:text-clay"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-1 text-sm text-muted">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-xs text-muted underline-offset-2 hover:text-clay hover:underline"
                          >
                            {copy.cart.remove}
                          </button>
                        </div>
                        <div className="mt-3 inline-flex items-center rounded-[8px] border border-border">
                          <button
                            type="button"
                            className="inline-flex size-10 items-center justify-center"
                            aria-label="Scade cantitatea"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="inline-flex size-10 items-center justify-center"
                            aria-label="Crește cantitatea"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <div className="border-t border-border px-5 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted">{copy.cart.subtotal}</span>
                  <span className="heading-display text-2xl">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <Button className="w-full" size="lg" disabled>
                  {copy.cart.checkout}
                </Button>
                <p className="mt-3 text-center text-xs text-muted">
                  {copy.cart.checkoutTodo}
                </p>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
