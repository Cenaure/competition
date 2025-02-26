import { payload } from "@/lib/payload";
import Link from "next/link";

const SourcesPage = async () => {
  const sources = await payload.findGlobal({
    slug: "sources",
    locale: "uk",
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-16 space-y-4">
      <h1>Джерела</h1>
      <ul>
        {sources.links &&
          sources.links.map((link, index) => (
            <li key={index}>
              <Link href={link.url}>{link.label}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SourcesPage;
