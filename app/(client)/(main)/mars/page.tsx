"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MarsCharacteristicsTable } from "@/components/ui/mars/table/marsCharacteristics";
import Parallax from "@/components/ui/parallax";
import { MarsAtmosphereChart } from "@/components/ui/mars/chart/marsAtmosphereChart";

const MarsInfoPage = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(imageRef.current, {
        x: x * -30,
        y: y * -30,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className=" w-screen place-content-center ">
      <div className="max-w-[1440px] mx-auto px-4 py-16">
        <div className=" grid md:gap-10 grid-cols-1 md:grid-cols-2">
          <div className="col-start-1 col-span-1 place-content-center">
            <h1 className="mb-2">Загальна інформація про Марс</h1>
            <div className="overflow-x-auto mars-scroll-container">
              <MarsCharacteristicsTable />
            </div>
          </div>
          <div className="relative col-start-2 w-full h-screen">
            <div ref={imageRef} className="absolute inset-0 ">
              <Image
                src="/api/media/file/marsHr"
                alt="Марс"
                fill
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen relative flex flex-col justify-center items-center">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 space-x-10 space-y-10 items-center px-4 py-16 ">
          <div className="space-y-10 w-full text-center">
            <h2>Склад атмосфери</h2>
            <MarsAtmosphereChart />
          </div>
          <p className="text-xl">
            Атмосфера Марса значно відрізняється від земної, і її склад був
            предметом численних досліджень, проведених космічними місіями,
            такими як марсоходи та орбітальні апарати. Основна увага зосереджена
            на її хімічному складі, який, як видається, переважно складається з
            вуглекислого газу (CO₂), з меншими частками інших газів.
          </p>
        </div>
        <Parallax
          className="absolute w-screen h-full top-0 left-0 z-[-1] opacity-20"
          speed={1}
        >
          <Image
            src={"/api/media/file/marsBackground"}
            layout="fill"
            objectFit="cover"
            alt="Mars"
          />
        </Parallax>
      </div>

      <Parallax className="h-screen w-full flex items-center">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 space-x-10 space-y-10 items-center px-4 py-16 ">
          <p className="text-xl">
            Олімп Монс — найвищий вулкан у Сонячній системі, висота якого
            досягає 22 км над рівнем марсіанської поверхні. Його діаметр
            становить приблизно 600 км, а основа могла б покрити цілий штат, як
            Аризона.
          </p>

          <div className="w-full relative">
            <Image
              src="/api/media/file/olimp"
              alt="Олімп Монс"
              width={800}
              height={600}
              objectFit="contain"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </Parallax>

      <Parallax className="h-screen w-full flex items-center">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 space-x-10 space-y-10 items-center px-4 py-16 ">
          <div className="w-full relative">
            <Image
              src="/api/media/file/VallesMarineris"
              alt="Олімп Монс"
              width={800}
              height={600}
              objectFit="contain"
              className="w-full rounded-xl"
            />
          </div>

          <p className="text-xl">
            Валлес Марінеріс — найбільший каньйон у Сонячній системі, відомий як
            &quot;Великий каньйон Марса&quot;. Його довжина становить близько
            4000 км, ширина — до 200 км, а глибина сягає 11 км, що робить його
            значно більшим за земні аналоги.
          </p>
        </div>
      </Parallax>

      <div className="w-full min-h-screen relative flex flex-col justify-center items-center">
        {/* Контейнер для контенту */}
        <div className="max-w-[1440px] mx-auto px-4 py-16 text-center space-y-10">
          <h2 className="text-4xl font-bold text-[var(--color-accent)]">
            Марс — Червона загадка
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Марс залишається однією з найбільших загадок Сонячної системи. Від
            його тонкої атмосфери до величних вулканів і каньйонів, ця планета
            кличе людство досліджувати її та, можливо, одного дня ступити на її
            поверхню.
          </p>

          <p className="text-lg italic text-[var(--color-accent)]">
            &quot;Марс — наступний логічний крок у дослідженні космосу
            людиною.&quot; — Д-р Джим Грін
          </p>
        </div>
        <Parallax
          className="absolute w-screen h-full top-0 left-0 z-[-1] opacity-20"
          speed={1}
        >
          <Image
            src={"/api/media/file/marsEndingImg"}
            layout="fill"
            objectFit="cover"
            alt="Mars"
          />
        </Parallax>
      </div>
    </div>
  );
};

export default MarsInfoPage;
