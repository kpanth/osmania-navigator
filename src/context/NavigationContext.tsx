import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "../data/translations";

interface NavCtx {
  start: string;
  setStart: (s: string) => void;
  destination: string;
  setDestination: (s: string) => void;
  step: number;
  setStep: (n: number) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<NavCtx | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [start, setStart] = useState("main-entrance");
  const [destination, setDestination] = useState("computer-lab");
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState<Lang>("EN");
  return (
    <Ctx.Provider value={{ start, setStart, destination, setDestination, step, setStep, lang, setLang }}>
      {children}
    </Ctx.Provider>
  );
}

export function useNav() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useNav must be inside NavigationProvider");
  return c;
}
