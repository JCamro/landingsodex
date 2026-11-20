"use client";

import { Menu } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useState } from "react";

import { BrandIcon } from "@/components/brand-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav } from "@/content/guide";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const ids = nav.map((item) => item.href.slice(1));

export function SiteHeader() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const activeLabel = nav.find((n) => n.href === `#${active}`)?.label;

  // Barra fina bajo el encabezado que muestra cuánto se ha leído de la página.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-8">
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-2.5 rounded-full font-heading text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <BrandIcon className="size-8 transition-transform duration-500 hover:rotate-180" />
          Salud sexual
        </a>

        {/* Navegación de escritorio: la sección actual se marca con una píldora que se desliza */}
        <nav aria-label="Secciones" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-border bg-card/70 p-1">
            {nav.map((item) => {
              const isActive = item.href === `#${active}`;
              return (
                <li key={item.href} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* En móvil, la sección actual se muestra junto al botón del menú */}
          {activeLabel && (
            <motion.span
              key={activeLabel}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden max-w-[9rem] truncate rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground sm:inline-block lg:hidden"
            >
              {activeLabel}
            </motion.span>
          )}
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Abrir menú de secciones"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm gap-0 p-0">
              <div className="flex items-center gap-2.5 border-b border-border px-6 py-5">
                <BrandIcon className="size-8" />
                <div>
                  <SheetTitle className="font-heading text-lg font-bold">
                    Salud sexual
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground">
                    Ir a una sección
                  </SheetDescription>
                </div>
              </div>

              <nav aria-label="Secciones" className="flex-1 overflow-x-hidden overflow-y-auto px-3 py-4">
                <ul className="flex flex-col">
                  {nav.map((item, i) => {
                    const isActive = item.href === `#${active}`;
                    return (
                      <motion.li
                        key={item.href}
                        initial={reduce ? false : { opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduce ? 0 : 0.05 + i * 0.04, duration: reduce ? 0 : 0.3 }}
                      >
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "group flex min-h-14 items-center gap-3 rounded-2xl px-4 py-2 font-heading text-base font-bold min-[380px]:text-lg sm:text-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted",
                          )}
                        >
                          <span
                            className={cn(
                              "w-6 shrink-0 text-sm",
                              isActive ? "opacity-80" : "text-primary",
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1 hyphens-auto">{item.label}</span>
                          {isActive && (
                            <>
                              <span
                                aria-hidden="true"
                                className="size-2 shrink-0 rounded-full bg-primary-foreground"
                              />
                              <span className="sr-only">(sección actual)</span>
                            </>
                          )}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center justify-between border-t border-border px-6 py-4">
                <span className="text-sm font-semibold text-muted-foreground">
                  Tema
                </span>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-primary"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
