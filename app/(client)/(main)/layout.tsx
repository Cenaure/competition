import Header from "@/components/ui/header";
import React from "react";

export const metadata = {
  description: "Мрія людства про майбутнє",
  title: "Beyond Earth - Головна сторінка",
};

export default async function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
