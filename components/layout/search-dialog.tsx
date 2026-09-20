"use client";

import { products } from "@/data/products";
import { getDictionary } from "@/data/i18n/ro";
import { formatPrice } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const copy = getDictionary();

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-charcoal/40 px-4 pt-[12vh] backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={copy.search.title}
            className="w-full max-w-xl overflow-hidden rounded-[16px] bg-warm-white shadow-[0_24px_80px_rgba(23,21,19,0.2)]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.search.placeholder}
                className="min-h-11 w-full bg-transparent text-base outline-none placeholder:text-muted"
                aria-label={copy.search.placeholder}
              />
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex size-11 items-center justify-center rounded-[12px]"
                aria-label={copy.search.close}
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-8 text-center text-sm text-muted">
                  {copy.search.noResults}
                </li>
              ) : (
                results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/produse/${product.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 rounded-[12px] px-3 py-3 transition-colors hover:bg-cream"
                    >
                      <span className="relative size-14 overflow-hidden rounded-[8px] bg-cream">
                        <Image
                          src={product.images[0]}
                          alt=""
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">
                          {product.name}
                        </span>
                        <span className="block text-sm text-muted">
                          {product.category} · {formatPrice(product.price)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
