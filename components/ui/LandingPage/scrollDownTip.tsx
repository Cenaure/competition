"use client";

import gsap from "gsap";
import { useEffect } from "react";

const ScrollDownTip = () => {
  useEffect(() => {
    gsap.to("#arrow", {
      duration: 0.6,
      ease: "power1.inOut",
      y: 5,
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className="fixed bottom-10 w-screen flex flex-col items-center justify-center opacity-90 z-[1]">
      <p>Гортайте вниз</p>
      <span
        className="border-r-2 border-b-2 rotate-45 w-5 h-5 border-white rounded-sm"
        id="arrow"
      />
    </div>
  );
};

export default ScrollDownTip;
