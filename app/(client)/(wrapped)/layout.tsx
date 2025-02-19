import Header from "@/components/ui/header";
import React from "react";

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
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
