"use client";

import gsap from "gsap";
import { useEffect, useState } from "react";

const ScrollDownTip = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    gsap.to("#arrow", {
      duration: 0.6,
      ease: "power1.inOut",
      y: 5,
      repeat: -1,
      yoyo: true,
    });

    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      setIsVisible(!scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isVisible)
      gsap.to("#tip", {
        opacity: 0,
        y: -40,
        ease: "power2.inOut",
        duration: 1,
      });
  }, [isVisible]);

  return (
    <div
      className="fixed bottom-10 w-screen flex flex-col items-center justify-center opacity-90 z-[1]"
      id="tip"
    >
      <p>Гортайте вниз</p>
      <span
        className="border-r-2 border-b-2 rotate-45 w-5 h-5 border-white rounded-sm"
        id="arrow"
      />
    </div>
  );
};

export default ScrollDownTip;
