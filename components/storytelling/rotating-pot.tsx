"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useState } from "react";

type SingleMode = {
  mode?: "single";
  src: string;
  frames?: never;
};

type SequenceMode = {
  mode: "sequence";
  frames: string[];
  src?: never;
};

type RotatingPotBase = {
  alt: string;
  className?: string;
  rotationAmount?: number;
  direction?: 1 | -1;
  scrollProgress: MotionValue<number>;
  sizes?: string;
};

export type RotatingPotProps = RotatingPotBase & (SingleMode | SequenceMode);

/**
 * Scroll-linked pottery visual.
 *
 * Modes:
 * - `single`: CSS rotate on a transparent cutout (PNG/WebP/SVG)
 * - `sequence`: map scroll progress to frame index (true 360° spin)
 *
 * To add a 360° sequence later:
 * 1. Export frames to `/public/images/pottery/spin/frame-00.webp` …
 * 2. Pass `mode="sequence"` with the ordered `frames` array
 * 3. Prefer fewer / smaller frames on mobile
 *
 * Later: a 3D model can consume the same `scrollProgress` MotionValue.
 */
export function RotatingPot({
  alt,
  className,
  rotationAmount = 360,
  direction = 1,
  scrollProgress,
  sizes = "(max-width: 1024px) 80vw, 45vw",
  ...modeProps
}: RotatingPotProps) {
  const reduceMotion = useReducedMotion();
  const mode = modeProps.mode ?? "single";
  const [frameIndex, setFrameIndex] = useState(0);

  const rotate = useTransform(
    scrollProgress,
    [0, 1],
    [0, rotationAmount * direction],
  );

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    if (mode !== "sequence" || !modeProps.frames?.length) return;
    const max = modeProps.frames.length - 1;
    const next = Math.round(Math.min(1, Math.max(0, latest)) * max);
    setFrameIndex((prev) => (prev === next ? prev : next));
  });

  if (mode === "sequence" && modeProps.frames?.length) {
    const src = modeProps.frames[frameIndex] ?? modeProps.frames[0];
    return (
      <div className={cn("relative aspect-[4/5] w-full", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain"
          priority={false}
        />
      </div>
    );
  }

  const src = modeProps.src;
  if (!src) return null;

  if (reduceMotion) {
    return (
      <div className={cn("relative aspect-[4/5] w-full", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain drop-shadow-[0_30px_50px_rgba(68,47,38,0.18)]"
        />
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "relative aspect-[4/5] w-full will-change-transform",
        className,
      )}
      style={{ rotate }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-contain drop-shadow-[0_30px_50px_rgba(68,47,38,0.18)]"
      />
    </motion.div>
  );
}
