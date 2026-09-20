import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

type ProductGridProps = {
  products: Product[];
  className?: string;
};

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid gap-8 sm:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
