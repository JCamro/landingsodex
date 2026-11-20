"use client";

import { useReducedMotion } from "motion/react";

import BlurText from "@/components/reactbits/BlurText";

type Props = {
  text: string;
  className?: string;
  trigger?: "load" | "view";
  delay?: number;
  animateBy?: "words" | "letters";
};

// Si la persona pidió menos movimiento, muestra el texto directamente, sin animación.
export function BlurTitle({ text, className, trigger = "view", delay = 80, animateBy = "words" }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <BlurText
      text={text}
      trigger={trigger}
      delay={delay}
      animateBy={animateBy}
      className={className}
    />
  );
}
