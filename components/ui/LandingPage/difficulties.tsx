"use client";

import Image from "next/image";
import Parallax from "../parallax";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { useEffect, useRef } from "react";
import { Card as CardType, Media } from "@/payload-types";
import { animateCardReveal } from "../animations/difficulties/animations";
const Difficulties = ({ cards }: { cards: CardType }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    animateCardReveal();
  }, []);

  return (
    <>
      <div className="w-screen h-screen place-content-center text-center relative">
        <h3 className="text-4xl lg:text-8xl tracking-widest">Виклики Марса</h3>

        <div className="">
          <Parallax
            className="absolute w-full h-full top-0 left-0 z-[-1]"
            speed={0.5}
          >
            <Image
              src={"/api/media/file/marsBackground"}
              layout="fill"
              objectFit="cover"
              alt="Mars"
            />
          </Parallax>
        </div>
      </div>
      <div
        className="w-screen h-screen flex flex-col items-center justify-center relative"
        id="difficultiesInfo"
      >
        <div className="container mx-auto px-4 py-16 max-w-[1440px]">
          <Parallax
            className="absolute w-full h-full top-0 left-0 z-[-1] opacity-20"
            speed={-0.5}
            id="marsBg"
          >
            <Image
              src={"/api/media/file/marsBg"}
              layout="fill"
              objectFit="cover"
              alt="Mars"
            />
          </Parallax>

          <h4 id="heading">
            Марс — це не просто пункт призначення, а{" "}
            <span className="text-[var(--color-accent)]">
              сукупність викликів
            </span>
            .
          </h4>

          <div
            className="grid mt-20 gap-2 grid-rows-1 h-[400px]"
            style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
          >
            {cards.items.map((item, index) => {
              const start = (index % 4) * 4 + 1;
              return (
                <>
                  <Card
                    id={`card${index + 1}`}
                    key={index}
                    className={`col-start-${start} col-span-4 border-0`}
                    ref={cardRef}
                    style={{ background: "none" }}
                  >
                    <div
                      className="max-w-[740px] ml-auto  w-full h-full rounded-md"
                      style={{ background: "hsl(var(--card))" }}
                      id="innerContent"
                    >
                      <CardHeader>
                        <CardTitle id={`title${index + 1}`}>
                          {index + 1}. {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p id={`simpleP${index + 1}`}>{item.shortText}</p>
                        <p
                          id={`extendedP${index + 1}`}
                          className="hidden opacity-0 mt-4"
                          dangerouslySetInnerHTML={{
                            __html: item.fullText || "",
                          }}
                        />
                      </CardContent>
                    </div>
                  </Card>
                  <div
                    key={index}
                    className={`absolute w-1/2 h-screen top-0 ${(index + 1) % 2 == 1 ? "right-0" : "left-0"} opacity-0 ${(index + 1) % 2 == 1 ? "pl" : "pr"}-10 z-[5]`}
                    id={`card${index + 1}Img`}
                  >
                    <div
                      className={`max-w-[740px] min-w-[400px] ${(index + 1) % 2 == 1 ? "mr" : "ml"}-auto relative size-full`}
                    >
                      <Image
                        src={(item.imgUrl as Media).url || ""}
                        objectFit="contain"
                        fill
                        alt={(item.imgUrl as Media).alt}
                        className="flex"
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Difficulties;
