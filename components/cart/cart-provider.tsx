"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

const STORAGE_KEY = "ceramica-pietraru-cart";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: "RON";
  image: string;
  quantity: number;
};

const EMPTY_CART: CartItem[] = [];

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Cached client snapshot so getSnapshot returns a stable reference. */
let cachedSnapshot: CartItem[] = EMPTY_CART;
let cachedRaw: string | null = null;

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === "string" &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    item.currency === "RON" &&
    typeof item.image === "string" &&
    typeof item.quantity === "number"
  );
}

function parseCart(raw: string | null): CartItem[] {
  if (!raw) return EMPTY_CART;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_CART;
    const items = parsed.filter(isCartItem);
    return items.length === 0 ? EMPTY_CART : items;
  } catch {
    return EMPTY_CART;
  }
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = parseCart(raw);
  return cachedSnapshot;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function writeStoredCart(items: CartItem[]) {
  const raw = JSON.stringify(items);
  window.localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedSnapshot = items.length === 0 ? EMPTY_CART : items;
  window.dispatchEvent(new Event("ceramica-cart-change"));
}

function subscribe(onStoreChange: () => void) {
  const onChange = () => {
    // Invalidate cache so the next getSnapshot re-reads storage.
    cachedRaw = null;
    onStoreChange();
  };
  window.addEventListener("storage", onChange);
  window.addEventListener("ceramica-cart-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("ceramica-cart-change", onChange);
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribe,
    readStoredCart,
    getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const current = readStoredCart();
    const existing = current.find((item) => item.productId === product.id);
    const next = existing
      ? current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      : [
          ...current,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image: product.images[0] ?? "/images/pottery/pot-01.svg",
            quantity,
          },
        ];
    writeStoredCart(next);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    writeStoredCart(
      readStoredCart().filter((item) => item.productId !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const current = readStoredCart();
    if (quantity <= 0) {
      writeStoredCart(current.filter((item) => item.productId !== productId));
      return;
    }
    writeStoredCart(
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => writeStoredCart(EMPTY_CART), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      isOpen,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
