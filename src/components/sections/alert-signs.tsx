"use client";

import { ArrowUpRight, Ban, TriangleAlert } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Reveal } from "@/components/reveal";
import { its } from "@/content/guide";

const MINSA = "https://www.gob.pe/minsa";

// Bloque de señales de alerta: a la izquierda el mensaje clave y qué hacer;
// a la derecha las señales como lista numerada que aparece una a una.
export function AlertSigns() {
  const reduce = useReducedMotion();
  const { signs, intro, warning, action, caution } = its.alerts;

  return (
    <section
      aria-labelledby="alertas-titulo"
      className="relative isolate mt-24 py-14 sm:py-20"
    >
      {/* Banda de fondo a todo el ancho de la pantalla (no solo del contenedor),
          para que el tinte no se corte en el borde del texto. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-y border-alert/30 bg-[radial-gradient(70%_120%_at_25%_50%,color-mix(in_srgb,var(--alert)_12%,transparent),transparent_75%)]"
      />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <p
            id="alertas-titulo"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-alert"
          >
            <TriangleAlert className="size-5" aria-hidden="true" />
            Señales de alerta
          </p>

          <p className="font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {warning}
          </p>

          <p className="max-w-[48ch] text-lg leading-relaxed text-muted-foreground">
            {action}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={MINSA}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-alert px-6 text-base font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Información del MINSA
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
            <p className="inline-flex items-center gap-2 font-semibold">
              <Ban className="size-5 text-alert" aria-hidden="true" />
              {caution}
            </p>
          </div>
        </Reveal>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">{intro}</p>
          <ol className="mt-4 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
            {signs.map((sign, i) => (
              <motion.li
                key={sign}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.06 }}
                className="group relative flex items-baseline gap-4 border-b border-border py-5"
              >
                <span
                  aria-hidden="true"
                  className="absolute -bottom-px left-0 h-0.5 w-0 bg-alert transition-[width] duration-500 ease-out group-hover:w-full"
                />
                <span
                  aria-hidden="true"
                  className="w-6 shrink-0 font-heading text-sm font-bold text-alert"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-xl font-bold leading-snug">
                  {sign}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
