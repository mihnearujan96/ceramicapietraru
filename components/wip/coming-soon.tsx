"use client";

import { Logo } from "@/components/brand/logo";
import { motion, useReducedMotion } from "motion/react";

export function ComingSoon() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, color-mix(in srgb, var(--clay) 12%, transparent), transparent 70%), radial-gradient(ellipse 70% 50% at 80% 90%, color-mix(in srgb, var(--olive) 8%, transparent), transparent 65%), linear-gradient(165deg, var(--warm-white) 0%, var(--cream) 55%, #efe6d8 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          mixBlendMode: "multiply",
        }}
      />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 16 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -8, 0],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                  y: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }
          }
        >
          <Logo href={null} height={200} priority className="drop-shadow-sm" />
        </motion.div>

        <motion.p
          className="mt-10 font-serif text-2xl tracking-tight text-brown sm:text-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
        >
          Lucrăm la noul site.
        </motion.p>

        <motion.p
          className="mt-3 max-w-sm text-base leading-relaxed text-muted sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }
          }
        >
          Revenim curând cu povestea ceramicii din Horezu.
        </motion.p>

        <motion.div
          aria-hidden
          className="mt-12 h-px w-16 origin-center bg-clay/50"
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </div>
    </div>
  );
}
