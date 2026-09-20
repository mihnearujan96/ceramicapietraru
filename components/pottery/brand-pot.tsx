"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const PotteryViewer = dynamic(
  () =>
    import("@/components/pottery/pottery-viewer").then((m) => m.PotteryViewer),
  { ssr: false },
);

type BrandPotProps = {
  className?: string;
  spinSpeed?: number;
  cameraZ?: number;
  showShadow?: boolean;
  framed?: boolean;
};

/**
 * Site-wide brand pottery — rounded frame, transparent (page cream shows through).
 */
export function BrandPot({
  className,
  spinSpeed = 0.35,
  cameraZ = 3.15,
  showShadow = true,
}: BrandPotProps) {
  return (
    <div
      className={cn(
        "relative min-h-[320px] overflow-hidden rounded-[16px] bg-transparent",
        className,
      )}
      data-brand-pot="3d"
    >
      <PotteryViewer
        className="absolute inset-0 h-full w-full"
        spinSpeed={spinSpeed}
        cameraZ={cameraZ}
        showShadow={showShadow}
      />
    </div>
  );
}
