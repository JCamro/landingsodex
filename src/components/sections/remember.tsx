import { HeartHandshake, ShieldPlus } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { BlurTitle } from "@/components/blur-title";
import GradientText from "@/components/reactbits/GradientText";
import { remember } from "@/content/guide";

export function Remember() {
  return (
    <section id="recuerda" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <div className="relative grid gap-10 overflow-hidden rounded-[2rem] border border-border bg-card p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                4 · Recuerda
              </p>
              <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-6xl">
                <GradientText
                  colors={["#E5334B", "#F5C400", "#B3001B", "#E5334B"]}
                  animationSpeed={8}
                >
                  Doble protección
                </GradientText>
              </h2>
              <div className="mt-8 flex items-center gap-3 text-primary" aria-hidden="true">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  <ShieldPlus className="size-7" />
                </span>
                <span className="text-2xl font-extrabold">+</span>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  <HeartHandshake className="size-7" />
                </span>
              </div>
            </div>
            <p className="relative self-center text-lg leading-relaxed sm:text-xl">
              {remember.doubleProtection}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Cierre a todo color, igual en ambos temas */}
      <div className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_50%_0%,color-mix(in_srgb,var(--highlight)_25%,transparent),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 py-24 text-center sm:px-8 lg:py-36">
          <div
            role="heading"
            aria-level={2}
            className="mx-auto max-w-4xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            <BlurTitle text={remember.closing} trigger="view" delay={80} className="justify-center" />
          </div>
          <p className="mt-8 text-xl font-semibold sm:text-2xl">
            {remember.closingLine}
          </p>
        </div>
      </div>
    </section>
  );
}
