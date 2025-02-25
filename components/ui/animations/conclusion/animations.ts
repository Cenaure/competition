import gsap from "gsap";

export const scrollConclusionAnimation = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      pin: true,
      trigger: "#conclusionContainer",
      start: "center center",
      scrub: 1,
    },
  });

  tl.from("#mainText", {
    opacity: 0,
    y: 50,
    duration: 1,
  })
    .from(
      "#finalText",
      {
        opacity: 0,
        y: 50,
        duration: 1,
      },
      "-=0.5",
    )
    .from(
      "#conclusionImage",
      {
        opacity: 0,
        scale: 0.1,
        skewY: 20,
        skewX: 20,
        duration: 1,
      },
      "-=0.5",
    );
};
