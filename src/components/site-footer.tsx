import { ExternalLink } from "lucide-react";

import { disclaimer, sources } from "@/content/guide";

export function SiteFooter() {
  return (
    <footer
      id="fuentes"
      className="scroll-mt-16 border-t border-border/60 bg-muted/40"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-8">
        <h2 className="font-heading text-2xl font-bold">Fuentes de consulta</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sources.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3 text-base font-medium transition-colors hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span>{s.label}</span>
                <ExternalLink
                  className="size-4 shrink-0 text-muted-foreground group-hover:text-primary"
                  aria-hidden="true"
                />
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
          {disclaimer} Ante dudas, una posible exposición o señales de alerta,
          acude a un establecimiento de salud.
        </p>
      </div>
    </footer>
  );
}
