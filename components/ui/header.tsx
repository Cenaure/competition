import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className="col-end-17 col-start-1 border-solid bg-inherit sticky w-full top-0 z-2"
      style={{ borderBottomWidth: "1px" }}
    >
      <div className="mx-auto max-w-[1440px] flex justify-between p-4">
        <div className="flex relative gap-2">
          <div className="relative w-10">
            <Image objectFit="contain" fill src="/favicon.svg" alt="logo" />
          </div>
          <h1>Beyond Earth</h1>
        </div>

        <div className="col-start-10 items-center flex space-x-4 md:flex hidden">
          <Link href="/">Друга сторінка</Link>
          <Link href="/">Третя сторінка</Link>
          <Link href="/auth">Вхід</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
