import { AlertSigns } from "@/components/sections/alert-signs";
import { Reveal } from "@/components/reveal";
import { its } from "@/content/guide";

// Lista tipo índice: nombre a la izquierda, descripción a la derecha, filas con líneas finas.
// Al pasar el cursor, la fila se resalta con una línea roja.
export function Its() {
  return (
    <section
      id="its"
      className="mx-auto w-full max-w-[1200px] scroll-mt-16 px-4 py-24 sm:px-8 lg:py-32"
    >
      <Reveal className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          2 · ¿Qué son las ITS y las ETS?
        </p>
        <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          Infecciones que a veces no dan señales
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {its.intro}
        </p>
      </Reveal>

      <h3 className="mt-16 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
        ITS frecuentes
      </h3>
      <dl className="mt-4 border-t border-border">
        {its.list.map((item, i) => (
          <Reveal
            key={item.name}
            delay={0.04 * i}
            className="group relative grid gap-3 border-b border-border py-7 before:absolute before:-top-px before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-[width] before:duration-500 before:ease-out before:content-[''] group-hover:before:w-full sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:gap-8"
          >
            <dt className="flex items-baseline gap-4 font-heading text-2xl font-bold leading-tight transition-colors group-hover:text-primary sm:text-3xl">
              <span aria-hidden="true" className="hidden w-7 shrink-0 text-sm text-muted-foreground sm:inline">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.name}
            </dt>
            <dd className="text-base leading-relaxed text-muted-foreground sm:pt-1 sm:text-lg">
              {item.text}
            </dd>
          </Reveal>
        ))}
      </dl>

      <AlertSigns />
    </section>
  );
}
