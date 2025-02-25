"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/payload-types";

const Header = ({ user }: { user: User | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out my-1 ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>
        </div>

        <nav
          className={`md:flex md:items-center md:space-x-4 ${isMenuOpen ? "block" : "hidden"}`}
        >
          <div className="md:hidden absolute top-full left-0 right-0 bg-black shadow-md transition-all duration-300 ease-in-out">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                href="/"
                className="hover:text-gray-600"
                onClick={toggleMenu}
              >
                Про марс
              </Link>
              <Link
                href="/"
                className="hover:text-gray-600"
                onClick={toggleMenu}
              >
                Третя сторінка
              </Link>
              <Link
                href={user ? "/dashboard" : "/auth"}
                className="hover:text-gray-600"
                onClick={toggleMenu}
              >
                {user ? "Акаунт" : "Вхід"}
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/">Про марс</Link>
            <Link href="/">Третя сторінка</Link>
            <Link href={user ? "/dashboard" : "/auth"}>
              {user ? "Акаунт" : "Вхід"}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
