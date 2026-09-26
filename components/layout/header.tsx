"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { useCart } from "@/components/cart/cart-provider";
import { mainNavigation } from "@/data/navigation";
import { getDictionary } from "@/data/i18n/ro";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchDialog } from "@/components/layout/search-dialog";

const copy = getDictionary();

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[8px] focus:bg-cream focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        {copy.nav.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
          scrolled
            ? "border-b border-border bg-cream/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/* Mobile: search | centered logo | cart + menu */}
        <Container
          className={cn(
            "relative flex items-center justify-between lg:hidden",
            scrolled ? "py-2.5" : "pb-3 pt-2.5",
          )}
        >
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="relative z-10 inline-flex size-10 items-center justify-center rounded-[12px] text-foreground transition-colors hover:bg-cream/80"
            aria-label={copy.nav.search}
          >
            <Search className="size-5" />
          </button>

          <div
            className={cn(
              "pointer-events-auto absolute left-1/2 z-0 -translate-x-1/2 transition-[top,transform] duration-300",
              scrolled
                ? "top-1/2 -translate-y-1/2 scale-[0.88]"
                : "top-[1.15rem] translate-y-0 scale-100",
            )}
          >
            <Logo
              height={200}
              priority
              className="h-[5.75rem] w-auto max-w-[12.5rem]"
            />
          </div>

          <div className="relative z-10 flex items-center gap-0.5">
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex size-10 items-center justify-center rounded-[12px] text-foreground transition-colors hover:bg-cream/80"
              aria-label={copy.nav.cart}
            >
              <ShoppingBag className="size-5" />
              {itemCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold text-warm-white">
                  {itemCount}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-[12px]"
              aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">
                {menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
              </span>
              <span className="relative block h-4 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 block h-[1.5px] w-full bg-foreground transition-transform duration-300",
                    menuOpen && "top-1/2 -translate-y-1/2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 bg-foreground transition-opacity duration-300",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 block h-[1.5px] w-full bg-foreground transition-transform duration-300",
                    menuOpen && "bottom-1/2 translate-y-1/2 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>

        {/* Desktop */}
        <Container
          className={cn(
            "hidden items-center justify-between gap-4 lg:flex",
            scrolled ? "py-3" : "py-4",
          )}
        >
          <Logo
            height={scrolled ? 120 : 160}
            priority
            className={cn(
              "w-auto max-w-none",
              scrolled ? "h-[100px]" : "h-[128px]",
            )}
          />

          <nav className="flex items-center gap-7" aria-label="Principal">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {copy.nav[item.labelKey]}
                <span
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-clay transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-[12px] text-foreground transition-colors hover:bg-cream/80"
              aria-label={copy.nav.search}
            >
              <Search className="size-5" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex size-11 items-center justify-center rounded-[12px] text-foreground transition-colors hover:bg-cream/80"
              aria-label={copy.nav.cart}
            >
              <ShoppingBag className="size-5" />
              {itemCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 inline-flex min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold text-warm-white">
                  {itemCount}
                </span>
              ) : null}
            </button>

            <Button
              href="/colectii"
              variant="primary"
              size="md"
              showArrow
              className="rounded-[12px] px-5"
            >
              {copy.nav.shop}
            </Button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-cream lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Container className="flex h-full flex-col pb-10 pt-28">
              <div className="mb-8 flex items-center justify-between gap-4">
                <Logo
                  height={160}
                  onClick={() => setMenuOpen(false)}
                  className="h-14 w-auto max-w-[9rem]"
                />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-[12px]"
                  aria-label={copy.nav.closeMenu}
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav aria-label="Mobil" className="flex flex-1 flex-col gap-2">
                {mainNavigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 * index,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="heading-display block py-2 text-[clamp(2.25rem,10vw,3.5rem)] text-foreground"
                    >
                      {copy.nav[item.labelKey]}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Button
                href="/colectii"
                size="lg"
                showArrow
                className="mt-8 w-full"
                onClick={() => setMenuOpen(false)}
              >
                {copy.nav.shop}
              </Button>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
