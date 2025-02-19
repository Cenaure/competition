import Image from "next/image";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });
  console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7eee6] to-[var(--color-light)]">
      <div className="container mx-auto px-4 py-16 max-w-[1440px] justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Твердження прекрасного та{" "}
              <span className="text-[var(--color-accent)]">майбутнього</span>
            </h1>
            <p className="text-xl opacity-90">
              Відкрийте для себе нові можливості з нашим інноваційним рішенням.
            </p>
            <button className="bg-[var(--color-dark)] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-700 transition duration-300 cursor-pointer">
              Дізнатися більше
            </button>
          </div>
          <div className="relative h-[400px] lg:h-[500px] w-full">
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
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-[var(--color-accent)] p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-[var(--color-light)]">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
