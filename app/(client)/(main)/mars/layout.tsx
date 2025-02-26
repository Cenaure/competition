import ScrollDownTip from "@/components/ui/LandingPage/scrollDownTip";
import ScrollToTop from "@/components/ui/scrollTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про Марс",
};

export default function MarsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children} <ScrollDownTip /> <ScrollToTop />
    </>
  );
}
