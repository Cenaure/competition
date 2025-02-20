"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const slides = [
  {
    content: `
      <h3>Чому саме Марс?</h3>
      <p>
        Марс – очевидна ціль для колонізації, оскільки він знаходиться поруч із Землею, 
        але існує набагато більше причин чому другим домом повинна стати Червона планета. <br /><br />
        Наукові причини для польотів на Марс можна підсумувати як пошук життя, 
        розуміння поверхні та еволюції планети, а також підготовка до майбутніх людських досліджень. <br /><br />
        Розуміння того, чи існує життя десь у Всесвіті за межами Землі, є одвічним питанням для людства. 
        Докази свідчать про те, що Марс має підземний океан, який має всі умови для існування 
        <span class="text-[var(--color-accent)]"> примітивного життя.</span>
      </p>
    `,
    img: "/api/media/file/mars",
  },
  {
    content: `
      <h3>Чому саме Марс?</h3>
      <p>
        Марс – очевидна ціль для колонізації, оскільки він знаходиться поруч із Землею, 
        але існує набагато більше причин чому другим домом повинна стати Червона планета. <br /><br />
        Наукові причини для польотів на Марс можна підсумувати як пошук життя, 
        розуміння поверхні та еволюції планети, а також підготовка до майбутніх людських досліджень. <br /><br />
        Розуміння того, чи існує життя десь у Всесвіті за межами Землі, є одвічним питанням для людства. 
        Докази свідчать про те, що Марс має підземний океан, який має всі умови для існування 
        <span class="text-[var(--color-accent)]"> примітивного життя.</span>
      </p>
    `,
    img: "/api/media/file/mars",
  },
];

const ColonizationInfo = () => {
  const viewportWidth = slides.length * 100; // Общая ширина в процентах (vw)
  const slideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (!slideRef.current || !containerRef.current) return;

    const totalSlides = slides.length;
    const slideWidth = 100;

    const scrollAnimation = gsap.fromTo(
      slideRef.current,
      { x: "0vw" },
      {
        x: `-${(totalSlides - 1) * slideWidth}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${viewportWidth * 10}`,
          scrub: 0.1,
          pin: true,
          snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: { min: 0.1, max: 0.2 },
            ease: "power4.inOut",
          },
        },
      },
    );

    return () => {
      scrollAnimation.kill();
    };
  }, [viewportWidth]);

  return (
    <section>
      <div className="container mx-auto max-w-[1440px] justify-center sticky top-20">
        <h2 className="">Колонізація Марса: мрія чи реальність?</h2>
      </div>
      <div ref={containerRef} className="overflow-hidden w-[100vw]">
        <div
          ref={slideRef}
          style={{ width: `${viewportWidth}vw` }}
          className="flex"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-h-screen w-[100vw] relative h-[100vh] flex items-center justify-center"
            >
              <div className="max-w-[1440px] flex gap-12 items-center w-full px-4">
                <div
                  className="space-y-4 basis-[50%]"
                  dangerouslySetInnerHTML={{ __html: slide.content }}
                />
                <div className="relative w-full h-screen basis-[50%]">
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
