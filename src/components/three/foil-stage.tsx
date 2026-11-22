"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Sachet3D } from "./sachet-3d";
import { useRef, useState, type PointerEvent } from "react";
import { useSachetFlavor } from "@/components/sachet-flavor";
import "./foil-stage.css";

function Pack({ inca, progress }: { inca: boolean; progress: MotionValue<number> }) {
  const name = inca ? "Inca Kola" : "Kola Escocesa";
  const { setFlavor } = useSachetFlavor();
  const reduce = useReducedMotion();
  const [back, setBack] = useState(false);
  const gesture = useRef<{ x: number; y: number; width: number; drag: boolean } | null>(null);
  const skipClick = useRef(false);
  const yaw = useMotionValue(0);
  const pitch = useMotionValue(0);
  const turn = useMotionValue(0);
  const angle = useSpring(useTransform(() => turn.get() + yaw.get() + (inca ? -1 : 1) * (progress.get() * 23 + 6)), { stiffness: 165, damping: 23 });
  const tilt = useSpring(pitch, { stiffness: 160, damping: 20 });
  const depth = useTransform(progress, [0, 1], [0, inca ? -30 : 20]);
  const spin = useTransform(angle, a => a * Math.PI / 180);
  const pitchRadians = useTransform(tilt, a => a * Math.PI / 180);
  const flip = (next: boolean) => {
    setBack(next);
    turn.set(next ? 180 : 0);
    setFlavor(name);
  };
  function move(e: PointerEvent<HTMLButtonElement>) {
    if (!e.isPrimary || reduce) return;
    const g = gesture.current;
    if (g) {
      const dx = e.clientX - g.x;
      if (!g.drag && Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(e.clientY - g.y)) g.drag = true;
      if (g.drag) yaw.set(Math.max(-180, Math.min(180, dx / g.width * 240)));
    } else if (e.pointerType === "mouse") {
      const r = e.currentTarget.getBoundingClientRect();
      yaw.set(((e.clientX - r.left) / r.width - 0.5) * 46);
      pitch.set((0.5 - (e.clientY - r.top) / r.height) * 32);
    }
  }
  function settle() { gesture.current = null; yaw.set(0); pitch.set(0); }
  return (
    <div className={inca ? "foil-blue" : "foil-red"}>
      <motion.button type="button" className="foil-pack" style={{ y: reduce ? 0 : depth }}
        aria-label={`${name}: ${back ? "ver frente" : "ver reverso"}`}
        onPointerMove={move}
        onPointerDown={e => {
          if (!e.isPrimary || e.button !== 0) return;
          skipClick.current = false;
          gesture.current = { x: e.clientX, y: e.clientY, width: e.currentTarget.offsetWidth, drag: false };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerLeave={() => { if (!gesture.current) settle(); }}
        onPointerCancel={() => { skipClick.current = true; settle(); }}
        onPointerUp={() => {
          if (gesture.current?.drag) { skipClick.current = true; flip(Math.abs(yaw.get()) >= 65 ? !back : back); }
          settle();
        }}
        onClick={e => { if (!skipClick.current || e.detail === 0) flip(!back); skipClick.current = false; }}>
        <Sachet3D className="pointer-events-none absolute inset-0" priority alt={name} inca={inca}
          back={back} target={{ x: 0.07, y: 0 }} spin={spin} pitch={pitchRadians} />
      </motion.button>
    </div>
  );
}

export function FoilStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  return (
    <div ref={ref} className="foil-stage" role="group" aria-label="Explorá los empaques Sodex">
      <div className="foil-orbit" aria-hidden="true" />
      <Pack inca={false} progress={scrollYProgress} />
      <Pack inca progress={scrollYProgress} />
      <p className="foil-hint">Tocá para ver el reverso · Arrastrá para girar</p>
    </div>
  );
}
