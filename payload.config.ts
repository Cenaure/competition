// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { uk } from "@payloadcms/translations/languages/uk";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { SliderItems } from "./collections/SliderItems";
import { Cards } from "./globals/Cards";
import { Conclusion } from "./globals/Conclusion";
import { Footer } from "./globals/Footer";
import { Reviews } from "./collections/Reviews";
import { Sources } from "./globals/Sources";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, SliderItems, Reviews],
  globals: [Cards, Conclusion, Footer, Sources],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  i18n: {
    fallbackLanguage: "uk",
    supportedLanguages: { uk },
  },
  localization: {
    locales: ["uk"], // required
    defaultLocale: "uk", // required
  },
  cors: "*",
});
