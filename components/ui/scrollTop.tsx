"use client";

import gsap from "gsap";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    gsap.to("#arrowtop", {
      duration: 0.6,
      ease: "power1.inOut",
      y: -5,
      repeat: -1,
      yoyo: true,
    });

    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > window.innerHeight;
      setIsVisible(shouldBeVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.to("#tiptop", {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 40,
      ease: "power2.inOut",
      duration: 1,
    });
  }, [isVisible]);

  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-10 flex flex-col right-10 z-[1] cursor-pointer items-center text-center"
      id="tiptop"
      style={{ opacity: 0 }}
    >
      <p>Вгору</p>
      <span
        className="border-r-2 border-b-2 rotate-[225deg] w-5 h-5 border-white rounded-sm"
        id="arrowtop"
      />
    </div>
  );
};

export default ScrollToTop;
