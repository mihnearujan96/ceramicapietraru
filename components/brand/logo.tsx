import { cn } from "@/lib/utils";
import { getDictionary } from "@/data/i18n/ro";
import Link from "next/link";

const copy = getDictionary();

// Bump when regenerating public/images/brand/*.svg
const LOGO_V = "3";

export const LOGO_SRC = {
  default: `/images/brand/logo.svg?v=${LOGO_V}`,
  light: `/images/brand/logo-light.svg?v=${LOGO_V}`,
  mark: `/images/brand/logo-mark.svg?v=${LOGO_V}`,
} as const;

type LogoProps = {
  className?: string;
  /** Pixel height of the logo */
  height?: number;
  variant?: "default" | "light";
  href?: string | null;
  priority?: boolean;
  onClick?: () => void;
};

export function Logo({
  className,
  height = 160,
  variant = "default",
  href = "/",
  priority = false,
  onClick,
}: LogoProps) {
  const src = variant === "light" ? LOGO_SRC.light : LOGO_SRC.default;
  // Original artboard aspect ~1011×829
  const width = Math.round(height * (1011 / 829));

  const image = (
    // Vector SVG scales crisply — avoid next/image rasterization
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={copy.brand.name}
      width={width}
      height={height}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn("block shrink-0 object-contain", className)}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        maxWidth: "none",
        maxHeight: "none",
      }}
    />
  );

  if (href === null) {
    return <span className="inline-flex shrink-0 items-center">{image}</span>;
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex shrink-0 items-center"
      aria-label={copy.brand.name}
      style={{ height: `${height}px` }}
    >
      {image}
    </Link>
  );
}
