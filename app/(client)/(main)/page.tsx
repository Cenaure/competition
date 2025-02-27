import BackgroundVideo from "@/components/ui/backgroundVideo";
import Hero from "@/components/ui/LandingPage/hero";
import dynamic from "next/dynamic";
import ScrollDownTip from "@/components/ui/LandingPage/scrollDownTip";
import { payload } from "@/lib/payload";

export const metadata = {
  description: "Мрія людства про майбутнє",
  title: "Beyond Earth - Головна сторінка",
};
const ColonizationInfo = dynamic(
  () => import("@/components/ui/LandingPage/colonizationInfo"),
);

const Difficulties = dynamic(
  () => import("@/components/ui/LandingPage/difficulties"),
);

const Conclusion = dynamic(
  () => import("@/components/ui/LandingPage/conclusion"),
);

export default async function HomePage() {
  const slides = await payload.find({
    collection: "slider-items",
    sort: "order",
  });

  const cards = await payload.findGlobal({
    slug: "cards",
    locale: "uk",
  });

  const cc = await payload.findGlobal({
    slug: "conclusion",
    locale: "uk",
  });

  return (
    <>
      <BackgroundVideo />
      <div className="container mx-auto px-4 py-16 max-w-[1440px] justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-[calc(100vh-80px)]">
          <Hero />
        </div>
      </div>
      <ColonizationInfo slides={slides} />
      <Difficulties cards={cards} />
      <Conclusion conclusionItem={cc} />
      <ScrollDownTip />
    </>
  );
}
