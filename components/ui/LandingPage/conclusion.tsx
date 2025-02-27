"use client";

import { Conclusion as ConclusionType } from "@/payload-types";
import Image from "next/image";
import { scrollConclusionAnimation } from "../animations/conclusion/animation";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface ConclusionProps {
  conclusionItem: ConclusionType;
}

const Conclusion = (props: ConclusionProps) => {
  useGSAP(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    scrollConclusionAnimation();
  }, []);

  return (
    <div
      className="w-screen h-screen place-content-center text-center relative"
      id="conclusionContainer"
    >
      <div className="max-w-[1440px] mx-auto">
        <div
          className="text-2xl z-10"
          id="mainText"
          dangerouslySetInnerHTML={{ __html: props.conclusionItem.text || "" }}
        />
        <div
          className="text-4xl mb-12 z-10 mt-4 text-[var(--color-accent)] underline decoration-white underline-offset-8"
          id="finalText"
        >
          {props.conclusionItem.quote}
        </div>

        <div
          className="absolute w-full h-full top-0 left-0 z-[-1] opacity-40"
          id="conclusionImage"
        >
          <Image
            src={
              "/api/media/file/Interplanetary_Transport_System_(29343823914).jpg"
            }
            alt="StarShip"
            fill
            objectFit="contain"
            id="conclusionImage"
          />
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
