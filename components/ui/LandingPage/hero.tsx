import Link from "next/link";

const Hero = () => {
  return (
    <div className="space-y-6 mb-40">
      <h1 className="text-4xl md:text-6xl font-bold">
        Майбутнє починається{" "}
        <span className="text-[var(--color-accent)]">тут</span>
      </h1>
      <p className="text-xl opacity-100 z-0">
        Стань частиною космічної цивілізації, до якої прямує людство.
      </p>
      <Link
        href="#colonization"
        className="bg-primary text-black px-8 py-3 rounded-full text-lg font-semibold hover:opacity-80 transition duration-300 cursor-pointer inline-block"
      >
        Розпочати подорож
      </Link>
    </div>
  );
};

export default Hero;
