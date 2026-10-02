"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { useCart } from "@/components/cart/cart-provider";
import { mainNavigation } from "@/data/navigation";
import { getDictionary } from "@/data/i18n/ro";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const copy = getDictionary();

export function Header() {
  const pathname = usePathname();
  const isShopPage = pathname === "/magazin";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const reduceMotion = useReducedMotion();

  function goHome() {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }

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
          "fixed inset-x-0 top-0 z-50 overflow-visible transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
          scrolled
            ? "border-b border-border bg-cream/95 shadow-[0_1px_0_rgba(68,47,38,0.06)] backdrop-blur-md"
            : "border-b border-transparent bg-cream/70 backdrop-blur-[2px] xl:bg-transparent xl:backdrop-blur-none",
        )}
      >
        {/* Mobile: spacer | centered logo | cart + menu */}
        <Container
          className={cn(
            "relative flex items-center justify-between xl:hidden",
            scrolled ? "h-14" : "h-[5.5rem]",
          )}
        >
          <div className="size-10" aria-hidden />

          <div className="pointer-events-auto absolute inset-y-0 left-1/2 z-0 flex -translate-x-1/2 items-center">
            <Logo
              height={scrolled ? 140 : 200}
              priority
              onClick={goHome}
              className={cn(
                "w-auto transition-[height,max-width] duration-300",
                scrolled
                  ? "h-12 max-w-[8.25rem]"
                  : "h-[5rem] max-w-[11rem]",
              )}
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
            "hidden items-center justify-between gap-4 xl:flex",
            scrolled ? "py-3" : "py-4",
          )}
        >
          <Logo
            height={scrolled ? 120 : 160}
            priority
            onClick={goHome}
            className={cn(
              "w-auto max-w-none",
              scrolled ? "h-[100px]" : "h-[128px]",
            )}
          />

          <nav
            className="flex items-center gap-6 xl:gap-7"
            aria-label="Principal"
          >
            {mainNavigation.map((item) => (
              <Link
                key={item.labelKey}
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

            {isShopPage ? null : (
              <Button
                href="/magazin"
                variant="primary"
                size="md"
                showArrow
                className="rounded-[12px] px-5"
              >
                {copy.nav.shop}
              </Button>
            )}
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-cream xl:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Container className="flex h-full flex-col pb-10 pt-28">
              <nav aria-label="Mobil" className="flex flex-1 flex-col gap-2">
                {mainNavigation.map((item, index) => (
                  <motion.div
                    key={item.labelKey}
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

              {isShopPage ? null : (
                <Button
                  href="/magazin"
                  size="lg"
                  showArrow
                  className="mt-8 w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  {copy.nav.shop}
                </Button>
              )}
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
