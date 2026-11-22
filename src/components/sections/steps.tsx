"use client";

import {
  ArrowDownToLine,
  Grab,
  Hand,
  PackageSearch,
  RefreshCcw,
  ShieldCheck,
  Trash2,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Reveal } from "@/components/reveal";
import { Sachet3D } from "@/components/three/sachet-3d";
import type { SachetTarget } from "@/components/three/sachet-scene";
import { usage } from "@/content/guide";

const pad = (n: number) => String(n).padStart(2, "0");

// Un icono por paso, en el mismo orden que usage.steps.
const stepIcons: LucideIcon[] = [
  PackageSearch,
  Hand,
  ShieldCheck,
  Wind,
  ArrowDownToLine,
  Grab,
  Trash2,
  RefreshCcw,
];

// Pose del sobre 3D en cada paso (radianes). x inclina arriba/abajo, y gira de lado.
const stepPoses: SachetTarget[] = [
  { x: 0.05, y: Math.PI }, // 1. Revisa el empaque y la fecha → muestra el reverso
  { x: 0.55, y: 0 }, // 2. Abre con cuidado → acerca la pestaña "Destapa aquí"
  { x: 0.1, y: -0.4 },
  { x: -0.1, y: 0.4 },
  { x: 0.15, y: -0.25 },
  { x: -0.15, y: 0.25 },
  { x: 0, y: -0.5 }, // 7. Deséchalo
  { x: 0, y: Math.PI * 2 }, // 8. Uno nuevo cada vez → vuelta completa
];

// Línea de tiempo de los 8 pasos. El panel fijo muestra el paso que está en el centro
// de la pantalla y el sobre 3D cambia de pose con él.
// Ocho puntos: el del paso actual se alarga en rojo. Al pulsar uno, se salta a ese paso.
function StepDots({ active }: { active: number }) {
  const reduce = useReducedMotion();
  const goTo = (i: number) => {
    document.getElementById(`paso-${i + 1}`)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <nav aria-label="Pasos">
      <ol className="flex items-center">
        {usage.steps.map((step, i) => {
          const isActive = i === active;
          return (
            <li key={step.title}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir al paso ${i + 1}: ${step.title}`}
                aria-current={isActive ? "step" : undefined}
                className="group flex h-8 items-center px-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/70 group-hover:bg-muted-foreground"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepPacks({ active }: { active: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-[1.45] w-24 shrink-0 [perspective:900px] lg:w-full lg:max-w-[420px]">
      {(["sachet", "inca"] as const).map((pack, index) => {
        const leading = active % 2 === index;
        const pose = stepPoses[active];
        return (
          <motion.div key={pack} initial={false}
            role="img" aria-label={`Sodex ${index ? "Inca Kola" : "Kola Escocesa"}${leading ? `, paso ${active + 1}` : ""}`}
            className={`absolute top-[8%] aspect-square w-[64%] ${index ? "right-0" : "left-0"} [transform-style:preserve-3d]`}
            style={{ zIndex: leading ? 2 : 1 }}
            animate={{ scale: leading ? 1 : 0.66, y: leading ? "7%" : "-12%", rotateZ: leading ? 0 : index ? 8 : -8 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 155, damping: 24 }}>
            <Sachet3D inca={index === 1} alt="" idle={leading}
              target={leading ? pose : { x: 0.07, y: index ? -0.18 : 0.18 }}
              back={leading && Math.cos(pose.y) < 0} />
          </motion.div>
        );
      })}
    </div>
  );
}

export function Steps() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="pasos"
      className="mx-auto w-full max-w-[1200px] scroll-mt-16 px-4 py-24 sm:px-8 lg:py-32"
    >
      <Reveal className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          1 · Modo de uso del condón externo
        </p>
        <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          Ocho pasos para usarlo bien
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {usage.intro}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        {/* Panel fijo: en escritorio, el sobre 3D centrado en pantalla con los puntos debajo.
            En móvil, solo una franja con los puntos pegada bajo el encabezado. */}
        <div className="sticky top-16 z-10 -mx-4 flex justify-center border-b border-border/60 bg-background/85 px-4 py-2 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-16 lg:mx-0 lg:h-[calc(100svh-4rem)] lg:flex-col lg:items-center lg:gap-8 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <StepPacks active={active} />
          <div className="flex items-center"><StepDots active={active} /></div>
        </div>

        <ol className="border-t border-border">
          {usage.steps.map((step, i) => {
            const isActive = i === active;
            const Icon = stepIcons[i];
            return (
              <motion.li
                key={step.title}
                id={`paso-${i + 1}`}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 border-b border-border py-8 sm:grid-cols-[4.5rem_1fr] sm:py-10"
              >
                {/* Línea roja que marca el paso activo */}
                <span
                  aria-hidden="true"
                  className={`absolute -top-px left-0 h-0.5 bg-primary transition-[width] duration-500 ease-out ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`flex flex-col gap-3 transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <span className="font-heading text-4xl font-extrabold leading-none tracking-tighter sm:text-5xl">
                    {pad(i + 1)}
                  </span>
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold leading-snug sm:text-2xl">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
