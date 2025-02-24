"use client";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const SmoothScrollerContext = createContext<Lenis | null>(null);

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

function ScrollContext({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [rafState, setRafState] = useState<number | null>(null);

  useEffect(() => {
    const scroller = new Lenis();
    lenisRef.current = scroller;

    function raf(time: number) {
      scroller.raf(time);
      requestAnimationFrame(raf);
    }

    const rf = requestAnimationFrame(raf);
    setRafState(rf);

    return () => {
      if (rafState) cancelAnimationFrame(rafState);
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <SmoothScrollerContext.Provider value={lenisRef.current}>
      {children}
    </SmoothScrollerContext.Provider>
  );
}

export default ScrollContext;
