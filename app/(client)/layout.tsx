import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const font = Manrope({ subsets: ["latin", "cyrillic"], weight: "400" });

export const metadata: Metadata = {
  title: "Beyond Earth",
  description: "Сайт про мрію людства",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className={`${font.className} antialiased mars-scroll-container`}>
        {children}
      </body>
    </html>
  );
}
