import { Droplets, ShieldAlert, Thermometer } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { recommendations } from "@/content/guide";

const icons = {
  lubricantes: Droplets,
  almacenamiento: Thermometer,
  rotura: ShieldAlert,
} as const;

// Tres columnas separadas por líneas finas (sin tarjetas).
export function Recommendations() {
  return (
    <section
      id="recomendaciones"
      className="border-y border-border bg-muted/30"
    >
      <div className="mx-auto w-full max-w-[1200px] scroll-mt-16 px-4 py-24 sm:px-8 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Recomendaciones importantes
          </p>
          <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            Pequeños cuidados que importan
          </h2>
        </Reveal>

        <div className="mt-14 grid border-t border-border lg:grid-cols-3">
          {recommendations.map((item, i) => {
            const Icon = icons[item.id];
            const alert = item.tone === "alert";
            return (
              <Reveal
                key={item.id}
                delay={i * 0.1}
                className={`flex flex-col gap-4 border-b border-border py-10 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0 ${
                  i > 0 ? "lg:border-l" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`size-6 ${alert ? "text-alert" : "text-primary"}`}
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-2xl font-bold">
                    {item.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {item.text}
                </p>
                {alert && (
                  <p className="mt-2 font-heading text-5xl font-extrabold tracking-tight text-alert">
                    72 h
                    <span className="mt-1 block font-sans text-sm font-semibold tracking-normal text-muted-foreground">
                      plazo máximo para iniciar la PEP
                    </span>
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
