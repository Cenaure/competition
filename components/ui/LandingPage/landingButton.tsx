"use client";

import { useSmoothScroller } from "../scrollContext";

const LandingButton = () => {
  const lenis = useSmoothScroller();

  return (
    <button
      onClick={() => {
        lenis?.scrollTo("#colonization");
      }}
      className="bg-primary text-black px-8 py-3 rounded-full text-lg font-semibold hover:opacity-80 transition duration-300 cursor-pointer inline-block"
    >
      Розпочати подорож
    </button>
  );
};

export default LandingButton;
