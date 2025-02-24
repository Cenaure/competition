import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";
import BackgroundVideo from "@/components/ui/backgroundVideo";
import Hero from "@/components/ui/LandingPage/hero";
import dynamic from "next/dynamic";
import ScrollContext from "@/components/ui/scrollContext";
import ScrollDownTip from "@/components/ui/LandingPage/scrollDownTip";

const ColonizationInfo = dynamic(
  () => import("@/components/ui/LandingPage/colonizationInfo"),
);

const Difficulties = dynamic(
  () => import("@/components/ui/LandingPage/difficulties"),
);

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });
  console.log(user);

  const slides = await payload.find({
    collection: "slider-items",
    sort: "order",
  });

  const cards = await payload.findGlobal({
    slug: "cards",
    locale: "uk",
  });

  return (
    <ScrollContext>
      <BackgroundVideo />
      <div className="container mx-auto px-4 py-16 max-w-[1440px] justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-[calc(100vh-80px)]">
          <Hero />
        </div>
      </div>
      <ColonizationInfo slides={slides} />
      <Difficulties cards={cards} />
      <ScrollDownTip />
    </ScrollContext>
  );
}
