"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { PaginatedDocs } from "payload";
import { SliderItem } from "@/payload-types";

const ColonizationInfo = ({
  slides,
}: {
  slides: PaginatedDocs<SliderItem>;
}) => {
  const viewportWidth = slides.docs.length * 100;
  const slideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  const realityRef = useRef(null);

  useEffect(() => {
    if (!slideRef.current || !containerRef.current) return;

    const totalSlides = slides.docs.length;
    const slideWidth = 100;

    const mm = gsap.matchMedia();

    const scrollAnimation = mm.add("(min-width: 1024px)", () => {
      const animation = gsap.fromTo(
        slideRef.current,
        { x: "0vw" },
        {
          x: `-${(totalSlides - 1) * slideWidth}vw`,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: `+=${viewportWidth * 10}`,
            scrub: 0.1,
            pin: true,
            snap: {
              snapTo: 1 / (totalSlides - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: "power4.inOut",
            },
            onUpdate: (self) => {
              const progress = self.progress;
              const currentSlide = Math.round(progress * (totalSlides - 1));
              if (currentSlide === totalSlides - 1) {
                gsap.to(realityRef.current, {
                  color: "#F26666",
                  duration: 0.5,
                  ease: "power4.inOut",
                });
              } else {
                gsap.to(realityRef.current, {
                  color: "#f7f7e0",
                  duration: 0.5,
                });
              }
            },
          },
        },
      );
      return animation;
    });

    mm.add("(max-width: 1023px)", () => {
      const viewportWidth = 100;
      slideRef.current!.style.width = `${viewportWidth}vw`;
    });

    return () => {
      scrollAnimation.kill();
    };
  }, [viewportWidth, slides.docs.length]);

  return (
    <section id="colonization">
      <div className="px-4 container mx-auto max-w-[1440px] justify-center relative lg:sticky lg:top-20 mb-20 lg:mb-0">
        <h2 className="">
          Колонізація Марса: мрія чи{" "}
          <span ref={realityRef} className="inline-block">
            Реальність
          </span>
          ?
        </h2>
      </div>
      <div ref={containerRef} className="overflow-hidden w-[100vw]">
        <div
          ref={slideRef}
          style={{ width: `${viewportWidth}vw` }}
          className="flex flex-col lg:flex-row space-y-20 lg:space-y-0"
        >
          {slides.docs.map((slide, index) => (
            <div
              key={index}
              className="min-h-screen w-[100vw] h-[100vh] relative flex lg:items-center justify-center"
            >
              <div className="max-w-[1440px] flex gap-12 lg:items-center w-full px-4 flex-col lg:flex-row">
                <div
                  className="space-y-4 basis-[50%]"
                  dangerouslySetInnerHTML={{ __html: slide.content || "" }}
                />
                <div className="relative w-full min-h-max lg:h-screen basis-[50%]">
                  <Image
                    src={slide.img}
                    fill
                    style={{ objectFit: "contain" }}
                    alt="Mars"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColonizationInfo;
