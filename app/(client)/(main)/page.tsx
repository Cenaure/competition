import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";
import BackgroundVideo from "@/components/ui/backgroundVideo";
import Hero from "@/components/ui/LandingPage/hero";
import dynamic from "next/dynamic";

const ColonizationInfo = dynamic(
  () => import("@/components/ui/LandingPage/colonizationInfo"),
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

  return (
    <div>
      <BackgroundVideo />
      <div className="container mx-auto px-4 py-16 max-w-[1440px] justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-[calc(100vh-80px)]">
          <Hero />
        </div>
      </div>

      <ColonizationInfo slides={slides} />

      {/* <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Інновації"
            description="Передові технології для вашого успіху"
            icon="🚀"
          />
          <FeatureCard
            title="Якість"
            description="Неперевершена якість у кожній деталі"
            icon="✨"
          />
          <FeatureCard
            title="Підтримка"
            description="Цілодобова підтримка для вашого спокою"
            icon="🛠️"
          />
        </div> */}

      {/* <div className="relative h-[400px] lg:h-[500px] w-full">
            <div className="block lg:hidden">
              <Image
                fill
                src="/api/media/file/mobileImg"
                alt="Інноваційне рішення для мобільних пристроїв"
                className="rounded-lg object-contain"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
            <div className="hidden lg:block">
              <Image
                fill
                src="/api/media/file/pcImage"
                alt="Інноваційне рішення для десктопів"
                className="rounded-lg object-cover"
                sizes="50vw"
              />
            </div>
          </div> */}
    </div>
  );
}
