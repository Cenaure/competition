import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { payload } from "@/lib/payload";
import React from "react";
import ScrollContext from "@/components/ui/scrollContext";
import { headers as getHeaders } from "next/headers";

export const metadata = {
  description: "Мрія людства про майбутнє",
  title: "Beyond Earth - Головна сторінка",
};

export default async function Layout(props: { children: React.ReactNode }) {
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const { children } = props;

  const footerInfo = await payload.findGlobal({
    slug: "footer",
    locale: "uk",
  });

  return (
    <ScrollContext>
      <Header />
      <main>{children}</main>
      <Footer footerPayload={footerInfo} user={user} />
    </ScrollContext>
  );
}
