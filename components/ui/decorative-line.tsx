import { cn } from "@/lib/utils";

type DecorativeLineProps = {
  variant?: "wave" | "zigzag" | "dots" | "circle";
  className?: string;
  color?: string;
};

export function DecorativeLine({
  variant = "wave",
  className,
  color = "currentColor",
}: DecorativeLineProps) {
  if (variant === "zigzag") {
    return (
      <svg
        viewBox="0 0 240 24"
        fill="none"
        aria-hidden
        className={cn("h-4 w-full", className)}
      >
        <path
          d="M2 18 L22 6 L42 18 L62 6 L82 18 L102 6 L122 18 L142 6 L162 18 L182 6 L202 18 L222 6 L238 16"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "dots") {
    return (
      <svg
        viewBox="0 0 240 16"
        fill="none"
        aria-hidden
        className={cn("h-3 w-full", className)}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <circle
            key={index}
            cx={12 + index * 20}
            cy={8}
            r={index % 3 === 0 ? 2.4 : 1.8}
            fill={color}
            opacity={0.85}
          />
        ))}
      </svg>
    );
  }

  if (variant === "circle") {
    return (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden
        className={cn("size-16", className)}
      >
        <circle
          cx="40"
          cy="40"
          r="28"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
        <path
          d="M24 40c8-10 24-10 32 0"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 280 28"
      fill="none"
      aria-hidden
      className={cn("h-5 w-full", className)}
    >
      <path
        d="M4 16c18-8 34-8 50 0s34 8 50 0 34-8 50 0 34 8 50 0 34-8 50 0 28 6 42 2"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="54" cy="12" r="2.2" fill={color} />
      <circle cx="104" cy="20" r="2.2" fill={color} />
      <circle cx="154" cy="12" r="2.2" fill={color} />
      <circle cx="204" cy="20" r="2.2" fill={color} />
    </svg>
  );
}
