import { cn } from "@/lib/utils";

export const horezuWaveViewBox = "0 0 500 78";

export const horezuWavePath =
  "M10 29.6C11.9 30.3 17.8 31.8 21.7 33.6C25.6 35.5 29.5 37.9 33.4 40.8C37.3 43.7 40.9 48.4 45.2 51C49.4 53.6 54 55.6 58.8 56.4C63.7 57.2 68.9 57.4 74.5 55.9C80 54.5 86.2 51 92.1 47.9C98 44.9 103.8 40.3 109.7 37.7C115.6 35.1 121.4 32.9 127.3 32.3C133.2 31.7 139 32.1 144.9 34.1C150.8 36.1 156.6 40.5 162.5 44.4C168.4 48.2 174.2 54 180.1 57.3C186 60.6 191.8 63.3 197.7 64C203.6 64.6 209.4 63.2 215.3 61.3C221.2 59.4 227 55.5 232.9 52.4C238.8 49.3 244.6 45.4 250.5 42.6C256.4 39.7 262.2 35.9 268.1 35.4C274 35 279.8 37 285.7 39.9C291.6 42.8 297.4 49.3 303.3 52.8C309.2 56.4 315 60 320.9 61.3C326.8 62.6 332.6 62.3 338.5 60.4C344.4 58.5 350.2 53.9 356.1 50.1C362 46.4 367.8 41 373.7 38.1C379.6 35.2 385.4 32.9 391.3 32.8C397.2 32.6 403 35.3 408.9 37.2C414.8 39.1 420.6 42.7 426.5 44.4C432.4 46 438.2 47.5 444.1 47C450 46.6 456.8 43.9 461.7 41.7C466.6 39.4 469.5 36.5 473.4 33.6C477.3 30.7 483.2 25.8 485.2 24.3";

export const horezuWaveDots = [
  { cx: 67.6, cy: 28.7, r: 9.8 },
  { cx: 130.2, cy: 58.2, r: 11.2 },
  { cx: 201.6, cy: 35.4, r: 11.2 },
  { cx: 271, cy: 61.3, r: 10.8 },
  { cx: 320.9, cy: 33.6, r: 11.2 },
  { cx: 397.2, cy: 59.1, r: 10.8 },
  { cx: 439.2, cy: 16.7, r: 12.7 },
] as const;

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
      viewBox={horezuWaveViewBox}
      fill="none"
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      <path
        d={horezuWavePath}
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {horezuWaveDots.map((dot) => (
        <circle
          key={`${dot.cx}-${dot.cy}`}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={color}
        />
      ))}
    </svg>
  );
}
