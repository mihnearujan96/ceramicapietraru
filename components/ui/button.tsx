import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "cream";
type ButtonSize = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-clay text-warm-white hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-50",
  secondary:
    "bg-transparent text-foreground border border-[color:var(--border-strong)] hover:border-clay hover:text-clay disabled:cursor-not-allowed disabled:opacity-50",
  ghost:
    "bg-transparent text-foreground hover:text-clay disabled:cursor-not-allowed disabled:opacity-50",
  cream:
    "bg-cream text-charcoal hover:bg-warm-white disabled:cursor-not-allowed disabled:opacity-50",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | "children"> & {
    href?: undefined;
    children: ReactNode;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: () => void;
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-[12px] font-medium tracking-wide transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  );
}

function ButtonContent({
  children,
  showArrow,
}: {
  children: ReactNode;
  showArrow: boolean;
}) {
  return (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </>
  );
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const showArrow = props.showArrow ?? false;
  const classes = buttonClasses(variant, size, props.className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        <ButtonContent showArrow={showArrow}>{props.children}</ButtonContent>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      aria-label={buttonProps["aria-label"]}
    >
      <ButtonContent showArrow={showArrow}>{props.children}</ButtonContent>
    </button>
  );
}
