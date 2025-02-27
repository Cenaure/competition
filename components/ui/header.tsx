"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const links = [
  { path: "/", label: "Головна" },
  { path: "/mars", label: "Про марс" },
  { path: "/reviews", label: "Залишити відгук" },
  { path: "/auth", label: "Вхід" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  const handleRouteChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault();
    gsap.globalTimeline.clear();
    setTimeout(() => router.push(path), 100);
  };

  useEffect(() => {
    if (!linksRef.current.length) return;

    const elements = linksRef.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );

    const cleanupFunctions = elements.map((link) => {
      const line = link.querySelector(".hover-line") as HTMLDivElement;
      if (!line) return () => {};

      gsap.set(line, { scaleX: 0, transformOrigin: "center center" });

      const onMouseEnter = () =>
        gsap.to(line, { scaleX: 1, duration: 0.3, ease: "power2.out" });
      const onMouseLeave = () =>
        gsap.to(line, { scaleX: 0, duration: 0.3, ease: "power2.out" });

      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);

      return () => {
        link.removeEventListener("mouseenter", onMouseEnter);
        link.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
      elements.forEach((link) => {
        const line = link.querySelector(".hover-line") as HTMLDivElement;
        if (line) gsap.killTweensOf(line);
      });
    };
  }, []);

  return (
    <header
      className="col-end-17 col-start-1 border-solid bg-inherit sticky w-full top-0 z-10"
      style={{ borderBottomWidth: "1px" }}
    >
      <div className="mx-auto max-w-[1440px] flex justify-between items-center p-4">
        <div className="flex relative gap-2 items-center">
          <div className="relative w-10 h-10">
            <Image objectFit="contain" fill src="/favicon.png" alt="logo" />
          </div>
          <Link href="/" className="text-2xl md:text-4xl font-bold">
            Beyond Earth
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 flex flex-col justify-center items-center w-8 h-8"
          >
            <span
              className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out my-1 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        <nav className="md:flex md:items-center md:space-x-4 hidden">
          {links.map((link, index) => (
            <div
              key={link.path}
              ref={(el) => {
                linksRef.current[index] = el;
              }}
              className="relative overflow-hidden cursor-pointer"
            >
              <Link
                href={link.path}
                className="relative"
                onClick={(e) => handleRouteChange(e, link.path)}
              >
                {link.label}
              </Link>
              <div className="hover-line absolute bottom-0 left-0 w-full h-0.5 bg-current scale-x-0"></div>
            </div>
          ))}
        </nav>

        <nav
          className={`md:hidden fixed top-0 left-0 w-screen h-screen bg-black transition-transform duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 z-[-1] md:flex md:items-center md:space-x-4 md:bg-transparent md:h-auto`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6 md:flex-row md:space-y-0 md:space-x-4">
            {links.map((link, index) => (
              <div
                key={link.path}
                className="relative overflow-hidden cursor-pointer transition-opacity duration-700 ease-in-out opacity-0 translate-y-4"
                style={{
                  animation: isMenuOpen
                    ? `fadeInUp 0.3s ease-out ${index * 0.1}s forwards`
                    : "none",
                }}
              >
                <Link
                  href={link.path}
                  className="relative text-white text-lg"
                  onClick={(e) => handleRouteChange(e, link.path)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <style jsx>{burgerStyles}</style>
        </nav>
      </div>
    </header>
  );
};

export default Header;

const burgerStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
