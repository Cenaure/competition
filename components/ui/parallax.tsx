"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const Parallax = ({
  className = "",
  children,
  speed = 1,
  id = "parallax",
}: Readonly<{
  className?: string;
  children: React.ReactNode;
  speed?: number;
  id?: string;
}>) => {
  const trigger = useRef<HTMLDivElement | null>(null);
  const target = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<GSAPTimeline>(null);
  const windowWidth = window.screen.width;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const y = windowWidth * speed * 0.1;
    const setY = gsap.quickSetter(target.current, "y", "px");

    timeline.current = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (e) => {
          setY(e.progress * y);
        },
      },
    });

    return () => {
      timeline?.current?.kill();
    };
  }, [id, speed, windowWidth]);

  return (
    <div ref={trigger}>
      <div ref={target} className={className} id={id}>
        {children}
      </div>
    </div>
  );
};

export default Parallax;
