"use client";

import { useInView, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { SachetSceneProps } from "./sachet-scene";

// Imagen fija: se ve mientras carga el 3D y si el navegador no tiene WebGL.
function Fallback({ alt, priority, inca, back }: { alt: string; priority?: boolean; inca?: boolean; back?: boolean }) {
  return (
    <Image
      src={`/img/${inca ? "inca" : "sachet"}-${back ? "back" : "front"}.webp`}
      alt={alt}
      width={inca ? 744 : 723}
      height={inca ? 744 : 734}
      priority={priority}
      className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
    />
  );
}

// El 3D (three.js) se carga aparte y solo en el navegador, para no frenar la página.
const SachetScene = dynamic(() => import("./sachet-scene"), {
  ssr: false,
  loading: () => null,
});

let webglSupport: boolean | undefined;
function hasWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      webglSupport = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noop = () => () => {};


type Props = Omit<SachetSceneProps, "active" | "instant"> & {
  className?: string;
  back?: boolean;
  alt: string;
  /** Muestra la imagen de respaldo con prioridad (úsalo en el sobre del hero, que es el LCP). */
  priority?: boolean;
};

export function Sachet3D({ className, alt, idle = true, interactive, priority, back, ...scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const reduce = useReducedMotion();
  const webgl = useSyncExternalStore(noop, hasWebGL, () => false);

  // Solo se monta la escena cuando el bloque es visible y el navegador está libre,
  // para que la página pinte primero y el JS de three.js no compita con el primer render.
  const [mounted, setMounted] = useState(false);
  const [idleReady, setIdleReady] = useState(false);
  useEffect(() => {
    if (!inView || idleReady) return;
    // Primero esperar a que la página termine de cargar; después, a que el navegador esté libre.
    const start = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
      ric(() => setIdleReady(true), { timeout: 2000 } as IdleRequestOptions);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [inView, idleReady]);
  if (inView && idleReady && !mounted) setMounted(true);

  // La imagen fija se oculta solo cuando el 3D ya cargó sus texturas (sin parpadeo).
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  const showScene = webgl && mounted && !reduce;

  return (
    <div ref={ref} className={`relative aspect-square ${className ?? ""}`}>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          showScene && ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Fallback alt={showScene && ready ? "" : alt} priority={priority} inca={scene.inca} back={back} />
      </div>
      {showScene && (
        <div className="absolute inset-0" role="img" aria-label={alt}>
          <SachetScene
            {...scene}
            active={inView}
            idle={idle && !reduce}
            interactive={interactive && !reduce}
            instant={!!reduce}
            onReady={handleReady}
          />
        </div>
      )}
    </div>
  );
}
