import { Footer as FooterType, Media } from "@/payload-types";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  footerPayload: FooterType;
}

const Footer = ({ footerPayload }: FooterProps) => {
  return (
    <footer className="py-10 text-center border-t-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm">{footerPayload.copyright}</div>

        <nav className="flex space-x-4 my-4 md:my-0">
          {footerPayload.links?.map((link, index) => (
            <Link key={index} href={link.url} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex space-x-4">
          {footerPayload.socials?.map((social, index) => (
            <Link
              key={index}
              href={social.url || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.platform && (
                <Image
                  src={(social.platform as Media).url || ""}
                  alt={(social.platform as Media).alt || ""}
                  width={24}
                  height={24}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
