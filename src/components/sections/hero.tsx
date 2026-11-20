"use client";

import { ChevronDown } from "lucide-react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { BlurTitle } from "@/components/blur-title";
import Magnet from "@/components/reactbits/Magnet";
import { Sachet3D } from "@/components/three/sachet-3d";
import { hero } from "@/content/guide";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Al bajar por el hero, el sobre gira media vuelta y deja ver el reverso.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const spin = useTransform(scrollYProgress, [0, 1], [0, Math.PI]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate overflow-hidden border-b border-border/60"
    >
      {/* Fondo: resplandor rojo y amarillo + cuadrícula suave. Funciona en claro y oscuro. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_20%,color-mix(in_srgb,var(--primary)_30%,transparent),transparent_70%),radial-gradient(40%_40%_at_10%_90%,color-mix(in_srgb,var(--highlight)_18%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_70%_at_50%_40%,#000,transparent)]"
      />

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 pt-14 pb-10 sm:px-8 lg:min-h-[calc(100svh-12rem)] lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
        <div className="flex flex-col items-start gap-7">
          {/* BlurText genera un <p>, que no puede ir dentro de <h1>; por eso el rol de encabezado va en un div. */}
          <div
            role="heading"
            aria-level={1}
            className="font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl"
          >
            <BlurTitle text={hero.title} trigger="load" delay={110} className="justify-start" />
          </div>

          <p className="max-w-[40ch] font-heading text-2xl font-semibold leading-snug sm:text-3xl">
            Uso correcto del <span className="text-primary">condón</span>,{" "}
            <span className="text-primary">ITS</span> y métodos de cuidado
          </p>
          <p className="max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
            {hero.lead}.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Magnet magnetStrength={4} padding={60}>
              <a
                href="#pasos"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Empezar la guía
              </a>
            </Magnet>
            <a
              href="#its"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card/70 px-7 text-base font-semibold backdrop-blur transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Conocer las ITS
            </a>
          </div>
        </div>

        {/* Sobre en 3D: sigue al cursor y gira con el scroll. */}
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-[6%] rounded-full bg-primary/35 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[2%] rounded-full border border-dashed border-primary/30"
          />
          <Sachet3D
            className="w-[88%] sm:w-[80%]"
            priority
            alt="Empaque de condón redondo en rojo, con la pestaña «Destapa aquí». Gira al moverte por la página."
            target={{ x: 0.1, y: -0.35 }}
            spin={spin}
            interactive
          />

        </div>
      </div>

      {/* Indicación para bajar */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-14 sm:px-8">
        <a
          href="#pasos"
          className="mx-auto flex w-fit flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          Desliza para empezar
          <ChevronDown
            className={`size-5 ${reduce ? "" : "animate-bounce"}`}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
