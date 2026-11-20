"use client";

import { useReducedMotion } from "motion/react";

import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { remember } from "@/content/guide";

// Franja en movimiento con las frases de cierre de la guía. Se acelera al hacer scroll.
export function ValuesBand() {
  const reduce = useReducedMotion();
  const phrases = [remember.closingLine, remember.closing];

  if (reduce) {
    return (
      <div className="bg-primary py-6 text-center font-heading text-2xl font-extrabold text-primary-foreground">
        {phrases.join(" · ")}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-primary py-5 text-primary-foreground"
    >
      <ScrollVelocity
        texts={phrases}
        velocity={40}
        numCopies={4}
        fontSize="clamp(1.5rem, 4vw, 3rem)"
        fontWeight={800}
        color="var(--primary-foreground)"
        separator={<span className="px-6 text-highlight">✦</span>}
        className="font-heading tracking-tight"
        outlineAlternate={false}
      />
    </div>
  );
}
