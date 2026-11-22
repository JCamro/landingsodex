"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Flavor = "Kola Escocesa" | "Inca Kola";
const FlavorContext = createContext<{
  flavor: Flavor;
  setFlavor: (value: Flavor) => void;
} | null>(null);

export function SachetFlavorProvider({ children }: { children: ReactNode }) {
  const [flavor, setFlavor] = useState<Flavor>("Kola Escocesa");
  return <FlavorContext.Provider value={{ flavor, setFlavor }}>{children}</FlavorContext.Provider>;
}

export function useSachetFlavor() {
  const context = useContext(FlavorContext);
  if (!context) throw new Error("Missing SachetFlavorProvider");
  return context;
}
