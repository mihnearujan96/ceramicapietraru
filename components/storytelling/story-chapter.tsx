"use client";

import { Reveal } from "@/components/animation/reveal";
import { cn } from "@/lib/utils";

type StoryChapterProps = {
  title: string;
  body: string;
  index: number;
  className?: string;
};

export function StoryChapter({
  title,
  body,
  index,
  className,
}: StoryChapterProps) {
  return (
    <Reveal
      className={cn(
        "flex min-h-[70vh] flex-col justify-center py-16 md:min-h-[80vh] md:py-24",
        className,
      )}
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-clay">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="heading-display max-w-xl text-[clamp(2rem,4vw,3.5rem)] text-foreground">
        {title}
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
        {body}
      </p>
    </Reveal>
  );
}
