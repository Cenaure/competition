"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useTabAnimation() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const animation = gsap.fromTo(
      card,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );

    return () => {
      animation.kill();
    };
  }, []);

  return cardRef;
}
