import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const animateCardReveal = () => {
  let buffer: string;
  let buffer2: string;
  let buffer3: string;
  let titleBuffer: string;
  let titleBuffer2: string;
  let titleBuffer3: string;

  gsap.registerPlugin(Flip, ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#difficultiesInfo",
      start: "center center",
      end: "+=1000%",
      markers: true,
      pin: true,
      scrub: 1,
      snap: {
        snapTo: "labelsDirectional",
        duration: { min: 1, max: 2 },
        ease: "power1.inOut",
      },
    },
  });

  tl.fromTo(
    "#card1",
    { x: -100, opacity: 0 },
    { duration: 1, x: 0, ease: "ease-in", opacity: 1 },
  )
    .fromTo(
      "#card2",
      { y: 100, opacity: 0 },
      { duration: 1, y: 0, ease: "ease-in", opacity: 1 },
      "-=0.1",
    )
    .fromTo(
      "#card3",
      { y: 100, opacity: 0 },
      { duration: 1, y: 0, ease: "ease-in", opacity: 1 },
      "-=0.1",
    )
    .fromTo(
      "#card4",
      { x: 100, opacity: 0 },
      { duration: 1, x: 0, opacity: 1, ease: "ease-in" },
      "-=0.1",
    );

  tl.addLabel("cards")
    .to("#marsBg", { duration: 1, opacity: 0.3, y: 0 }, "+=0.5")
    .to(
      ["#card2", "#card3", "#card4", "#heading"],
      {
        opacity: 0,
        duration: 2,
        ease: "sine.in",
        onComplete: () => {
          const card = document.getElementById("card1");
          if (!card) return;

          const state = Flip.getState(card);
          card.classList.add(
            "absolute",
            "w-1/2",
            "left-[-10]",
            "h-screen",
            "top-0",
            "z-[10]",
            "flex",
            "border-0",
            "rounded-r-lg",
            "rounded-l-none",
            "bg-none",
          );

          Flip.from(state, {
            duration: 2,
            ease: "power4.inOut",
          });
        },
        onReverseComplete: () => {
          const card = document.getElementById("card1");
          if (!card) return;
          const state = Flip.getState(card);

          card.classList.remove(
            "w-1/2",
            "left-0",
            "h-screen",
            "top-0",
            "z-10",
            "flex",
            "items-center",
            "border-0",
            "rounded-r-lg",
            "rounded-l-none",
            "absolute",
          );

          Flip.from(state, { duration: 2, ease: "expo.inOut" });
          return;
        },
      },

      "+=0.3",
    )
    .fromTo(
      "#simpleP1",
      { opacity: 1, display: "flex" },
      { opacity: 0, display: "none", duration: 1 },
      "+=4",
    )
    .fromTo(
      "#extendedP1",
      { opacity: 0, display: "none", y: 0 },
      {
        opacity: 1,
        display: "flex",
        duration: 1,
        ease: "power1.inOut",
      },
    )
    .fromTo(
      "#card1Img",
      { x: 800, opacity: 0 },
      { x: 0, duration: 6, opacity: 1, ease: "expo.in" },
      "<",
    )
    .addLabel("firstInfo");

  //2=======

  tl.to(
    "#card1",
    {
      duration: 1,
      opacity: 1,
      onStart: () => {
        const card = document.getElementById("card1");
        if (!card) return;

        const state = Flip.getState(card);
        card.classList.remove("left-[-10]");
        card.classList.add("right-[-10]");

        const div = document.getElementById("innerContent");

        const textToChange = document.getElementById("simpleP1");
        textToChange?.classList.add("hidden");
        if (textToChange?.innerHTML) {
          buffer = textToChange.innerHTML;
          textToChange.innerHTML =
            document.getElementById("extendedP2")?.innerHTML || "";
        }

        Flip.from(state, {
          duration: 2,
          ease: "power4.inOut",
          onStart: () => {
            const stateDiv = Flip.getState(div);
            div?.classList.add("mr-auto");
            div?.classList.remove("ml-auto");
            Flip.from(stateDiv, {
              duration: 2,
              ease: "power4.inOut",
            });
          },
        });

        return;
      },
      onReverseComplete: () => {
        const card = document.getElementById("card1");
        if (!card) return;
        const state = Flip.getState(card);

        card.classList.remove("right-[-10]");
        card.classList.add("left-[-10]");

        const div = document.getElementById("innerContent");

        Flip.from(state, {
          duration: 1.2,
          ease: "power1.inOut",
          onStart: () => {
            const stateDiv = Flip.getState(div);
            div?.classList.add("ml-auto");
            div?.classList.remove("mr-auto");
            Flip.from(stateDiv, {
              duration: 1.2,
              ease: "power1.inOut",
            });
          },
        });
        return;
      },
    },
    "+=4",
  )
    .fromTo(
      "#extendedP1",
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut",
        onReverseComplete: () => {
          const textToChange = document.getElementById("simpleP1");
          if (textToChange?.innerHTML) textToChange.innerHTML = buffer || "";
          gsap.set("#simpleP1", { y: 0 });
        },
      },
      "<",
    )
    .fromTo(
      "#simpleP1",
      {
        opacity: 0,
        display: "none",
      },
      {
        y: 0,
        opacity: 1,
        display: "flex",
        duration: 2,
        ease: "power1.inOut",
      },
    )
    .fromTo(
      "#title1",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut",
        onComplete: () => {
          const textToChange = document.getElementById("title1");
          if (textToChange?.innerHTML) {
            titleBuffer = textToChange.innerHTML;
            textToChange.innerHTML =
              document.getElementById("title2")?.innerHTML || "";
          }
        },
        onReverseComplete: () => {
          const textToChange = document.getElementById("title1");
          if (textToChange?.innerHTML) {
            textToChange.innerHTML = titleBuffer;
          }
        },
      },
      "<<",
    )
    .to("#title1", { opacity: 1, duration: 2 })
    .fromTo(
      "#card2Img",
      { x: -800, opacity: 0 },
      { x: 0, duration: 6, opacity: 1 },
      "+=0.5",
    )
    .fromTo(
      "#card1Img",
      { x: 0, opacity: 1 },
      { x: 800, opacity: 0, duration: 6 },
      "-=8",
    )
    .addLabel("secondInfo");

  //3=======

  tl.to(
    "#card1",
    {
      duration: 1,
      opacity: 1,
      onStart: () => {
        const card = document.getElementById("card1");
        if (!card) return;

        const state = Flip.getState(card);
        card.classList.remove("right-[-10]");
        card.classList.add("left-[-10]");

        const div = document.getElementById("innerContent");

        const textToChange = document.getElementById("extendedP1");
        textToChange?.classList.add("hidden");
        if (textToChange?.innerHTML) {
          buffer2 = textToChange.innerHTML;
          textToChange.innerHTML =
            document.getElementById("extendedP3")?.innerHTML || "";
        }

        Flip.from(state, {
          duration: 2,
          ease: "power4.inOut",
          onStart: () => {
            const stateDiv = Flip.getState(div);
            div?.classList.add("ml-auto");
            div?.classList.remove("mr-auto");
            Flip.from(stateDiv, {
              duration: 2,
              ease: "power4.inOut",
            });
          },
        });

        return;
      },
      onReverseComplete: () => {
        const card = document.getElementById("card1");
        if (!card) return;
        const state = Flip.getState(card);

        card.classList.remove("left-[-10]");
        card.classList.add("right-[-10]");

        const div = document.getElementById("innerContent");

        Flip.from(state, {
          duration: 1.2,
          ease: "power1.inOut",
          onStart: () => {
            const stateDiv = Flip.getState(div);
            div?.classList.add("mr-auto");
            div?.classList.remove("ml-auto");
            Flip.from(stateDiv, {
              duration: 1.2,
              ease: "power1.inOut",
            });
          },
        });
        return;
      },
    },
    "+=4",
  )
    .fromTo(
      "#simpleP1",
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        duration: 2,
        display: "none",
        ease: "power1.inOut",
        onReverseComplete: () => {
          const textToChange = document.getElementById("extendedP1");
          if (textToChange?.innerHTML) textToChange.innerHTML = buffer2 || "";
          gsap.set("#extendedP1", { y: 0 });
        },
      },
      "<",
    )
    .fromTo(
      "#extendedP1",
      {
        opacity: 0,
        display: "none",
      },
      {
        y: 0,
        opacity: 1,
        display: "flex",
        duration: 2,
        ease: "power1.inOut",
      },
    )
    .fromTo(
      "#title1",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
          const textToChange = document.getElementById("title1");
          if (textToChange?.innerHTML) {
            titleBuffer2 = textToChange.innerHTML;
            textToChange.innerHTML =
              document.getElementById("title3")?.innerHTML || "";
          }
        },
        onReverseComplete: () => {
          const textToChange = document.getElementById("title1");
          if (textToChange?.innerHTML) {
            textToChange.innerHTML = titleBuffer2;
          }
        },
      },
      "<<",
    )
    .to("#title1", { opacity: 1, duration: 2 })
    .fromTo(
      "#card3Img",
      { x: 800, opacity: 0 },
      { x: 0, duration: 6, opacity: 1 },
      "+=0.5",
    )
    .fromTo(
      "#card2Img",
      { x: 0, opacity: 1 },
      { x: -800, opacity: 0, duration: 6 },
      "-=8",
    )
    .addLabel("third");

  //4=======

  tl.to(
    "#card1",
    {
      duration: 1,
      opacity: 1,
      onStart: () => {
        const card = document.getElementById("card1");
        if (!card) return;

        const state = Flip.getState(card);
        card.classList.remove("left-[-10]");
        card.classList.add("right-[-10]");

        const div = document.getElementById("innerContent");

        const textToChange = document.getElementById("simpleP1");
        textToChange?.classList.add("hidden");
        if (textToChange?.innerHTML) {
          buffer3 = textToChange.innerHTML;
          textToChange.innerHTML =
            document.getElementById("extendedP4")?.innerHTML || "";
        }

        Flip.from(state, {
          duration: 2,
          ease: "power4.inOut",
          onStart: () => {
            const stateDiv = Flip.getState(div);
            div?.classList.add("mr-auto");
            div?.classList.remove("ml-auto");
            Flip.from(stateDiv, {
              duration: 2,
              ease: "power4.inOut",
            });
          },
        });

        return;
      },
      onReverseComplete: () => {
        const card = document.getElementById("card1");
        if (!card) return;
        const state = Flip.getState(card);

        card.classList.remove("right-[-10]");
        card.classList.add("left-[-10]");

        const div = document.getElementById("innerContent");

        Flip.from(state, {
          duration: 1.2,
          ease: "power1.inOut",
          onStart: () => {
            const stateDiv = Flip.getState(div);
            div?.classList.add("ml-auto");
            div?.classList.remove("mr-auto");
            Flip.from(stateDiv, {
              duration: 1.2,
              ease: "power1.inOut",
            });
          },
        });
        return;
      },
    },
    "+=4",
  )
    .fromTo(
      "#extendedP1",
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        duration: 2,
        display: "none",
        ease: "power1.inOut",
        onReverseComplete: () => {
          const textToChange = document.getElementById("simpleP1");
          if (textToChange?.innerHTML) textToChange.innerHTML = buffer3 || "";
          gsap.set("#simpleP1", { y: 0 });
        },
      },
      "<",
    )
    .fromTo(
      "#simpleP1",
      {
        opacity: 0,
        display: "none",
      },
      {
        y: 0,
        opacity: 1,
        display: "flex",
        duration: 2,
        ease: "power1.inOut",
      },
    )
    .fromTo(
      "#title1",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
          const textToChange = document.getElementById("title1");
          if (textToChange?.innerHTML) {
            titleBuffer3 = textToChange.innerHTML;
            textToChange.innerHTML =
              document.getElementById("title4")?.innerHTML || "";
          }
        },
        onReverseComplete: () => {
          const textToChange = document.getElementById("title1");
          if (textToChange?.innerHTML) {
            textToChange.innerHTML = titleBuffer3;
          }
        },
      },
      "<<",
    )
    .to("#title1", { opacity: 1, duration: 2 })
    .fromTo(
      "#card4Img",
      { x: -800, opacity: 0 },
      { x: 0, duration: 6, opacity: 1 },
      "+=0.5",
    )
    .fromTo(
      "#card3Img",
      { x: 0, opacity: 1 },
      { x: 800, opacity: 0, duration: 6 },
      "-=8",
    )
    .addLabel("fourth");
};
