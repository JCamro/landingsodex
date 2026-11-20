"use client";

import { Environment, Lightformer, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type SachetTarget = { x: number; y: number };

export type SachetSceneProps = {
  /** Rotación objetivo en radianes. El sobre se mueve suavemente hacia ella. */
  target: SachetTarget;
  /** Giro extra en Y que llega desde el scroll (opcional). */
  spin?: MotionValue<number>;
  /** El sobre se inclina siguiendo el cursor. */
  interactive?: boolean;
  /** Flota y oscila suavemente cuando no hay interacción. */
  idle?: boolean;
  /** Sin suavizado: salta directo a la rotación (para "reducir movimiento"). */
  instant?: boolean;
  /** Si es false, se detiene el render (p. ej. fuera de pantalla). */
  active: boolean;
  /** Se llama cuando las texturas ya cargaron y el sobre está listo. */
  onReady?: () => void;
};

const RADIUS = 1;
const SEAL = 0.86; // a partir de este radio empieza el borde sellado (plano)
const BULGE = 0.075; // cuánto se abomba el centro del sobre

// Disco con el centro abombado y el borde plano, como un sobre de aluminio relleno.
// RingGeometry trae UV planas: la textura cuadrada se proyecta de frente sobre el círculo.
function createPillowGeometry() {
  const geometry = new THREE.RingGeometry(0.0001, RADIUS, 160, 48);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const r = Math.hypot(pos.getX(i), pos.getY(i)) / RADIUS;
    const dome = r < SEAL ? Math.sqrt(1 - (r / SEAL) ** 2) : 0;
    pos.setZ(i, BULGE * dome);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function Sachet({
  target,
  spin,
  interactive,
  idle,
  instant,
  onReady,
}: Omit<SachetSceneProps, "active">) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => createPillowGeometry(), []);
  const [front, back] = useTexture([
    "/textures/sachet-front.webp",
    "/textures/sachet-back.webp",
  ]);

  useMemo(() => {
    for (const t of [front, back]) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    }
  }, [front, back]);

  // Este componente solo se pinta cuando las texturas terminaron de cargar.
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const tiltX = interactive ? -state.pointer.y * 0.25 : 0;
    const tiltY = interactive ? state.pointer.x * 0.35 : 0;
    const floatX = idle ? Math.sin(t * 0.8) * 0.05 : 0;
    const floatY = idle ? Math.sin(t * 0.6) * 0.1 : 0;

    const x = target.x + tiltX + floatX;
    const y = target.y + (spin?.get() ?? 0) + tiltY + floatY;

    if (instant) {
      g.rotation.set(x, y, 0);
    } else {
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, x, 4, delta);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, y, 4, delta);
    }
    g.position.y = idle ? Math.sin(t * 1.1) * 0.04 : 0;
  });

  const foil = {
    metalness: 0.45,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.25,
  };

  return (
    <group ref={group}>
      {/* Cara frontal */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial map={front} {...foil} />
      </mesh>
      {/* Reverso: misma forma girada 180° para que se lea bien desde atrás */}
      <mesh geometry={geometry} rotation={[0, Math.PI, 0]}>
        <meshPhysicalMaterial map={back} {...foil} />
      </mesh>
      {/* Canto del sobre */}
      <mesh>
        <torusGeometry args={[RADIUS, 0.012, 12, 160]} />
        <meshStandardMaterial color="#7a0c18" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function SachetScene({ active, ...props }: SachetSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 3.6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={1.4} />
      {/* Reflejos del aluminio sin descargar mapas HDR externos */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 3, 3]} scale={[6, 2, 1]} />
        <Lightformer intensity={1.2} position={[-3, 0, 2]} scale={[2, 5, 1]} color="#ffd9a0" />
        <Lightformer intensity={1} position={[3, -1, 2]} scale={[2, 5, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Sachet {...props} />
      </Suspense>
    </Canvas>
  );
}
