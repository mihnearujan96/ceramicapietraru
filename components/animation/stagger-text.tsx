"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

type StaggerTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
};

export function StaggerText({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  stagger = 0.08,
}: StaggerTextProps) {
  const reduceMotion = useReducedMotion();
  const lines = text.split("\n");

  if (reduceMotion) {
    return (
      <Tag className={cn("whitespace-pre-line", className)}>{text}</Tag>
    );
  }

  return (
    <Tag className={cn("flex flex-col", className)}>
      {lines.map((line, index) => (
        <motion.span
          key={`${line}-${index}`}
          className="block overflow-visible pb-[0.22em] leading-none"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + index * stagger,
          }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
