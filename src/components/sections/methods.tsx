"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Reveal } from "@/components/reveal";
import { methods, type Protection } from "@/content/guide";

const filters = [
  { id: "all", label: "Todos" },
  { id: "its", label: "Relacionados con ITS" },
  { id: "pregnancy", label: "Previenen embarazo" },
] as const;

type FilterId = (typeof filters)[number]["id"];

const badgeStyles: Record<Protection, string> = {
  yes: "bg-primary text-primary-foreground",
  partial: "bg-highlight text-highlight-foreground",
  detects: "border border-primary text-primary",
  no: "border border-border text-muted-foreground",
  na: "border border-border text-muted-foreground",
};

export function Methods() {
  const [filter, setFilter] = useState<FilterId>("all");
  const reduce = useReducedMotion();

  const visible = methods.filter((m) => {
    if (filter === "its") return m.its !== "no" && m.its !== "na";
    if (filter === "pregnancy") return m.pregnancy;
    return true;
  });

  return (
    <section
      id="metodos"
      className="border-y border-border/60 bg-muted/40"
    >
      <div className="mx-auto w-full max-w-[1200px] scroll-mt-16 px-4 py-24 sm:px-8 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            3 · Métodos de cuidado
          </p>
          <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            Cada método cuida de algo distinto
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Durante las relaciones sexuales hay varias formas de cuidarte. Filtra
            para ver cuáles se relacionan con las ITS o con prevenir un embarazo.
          </p>
        </Reveal>

        <div
          role="group"
          aria-label="Filtrar métodos"
          className="mt-10 flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`h-11 rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-8 border-t border-border" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((m) => (
              <motion.li
                key={m.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid gap-3 border-b border-border py-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-start lg:gap-10"
              >
                <h3 className="font-heading text-2xl font-bold leading-snug">
                  {m.name}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {m.text}
                </p>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold sm:text-sm ${badgeStyles[m.its]}`}
                  >
                    {m.itsLabel}
                  </span>
                  {m.pregnancy && (
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-bold sm:text-sm">
                      Previene embarazo
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
