import LandingButton from "./landingButton";

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
      <LandingButton />
    </div>
  );
};

export default Hero;
