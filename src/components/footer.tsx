"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatDateFrench, getYesterdayDate } from "../utils/date";
import { usePathname } from "next/navigation";
import { ContactButtonWithDialog } from "./ContactButtonWithDialog";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  const pathname = usePathname();
  const isProFormPage = pathname === "/pro/form";
  const isAppPage = pathname.startsWith("/app");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const { messages } = useLanguage();

  if (isProFormPage || isDashboardPage) return null;

  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-12 justify-between items-center">
        <Link
          href={"/legal"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold hover:text-white/80 hover:underline">
          {messages.footer.legal}
        </Link>

        <div className="flex gap-4">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.instagram.com/invstore_app/"}>
            <InstagramLogoIcon width={32} height={32} />
          </Link>

          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.linkedin.com/company/invstore/"}>
            <LinkedInLogoIcon width={32} height={32} />
          </Link>

          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.tiktok.com/@invstore_app"}>
            <Image
              width={28}
              height={28}
              style={{ objectFit: "contain" }}
              src="/icons/tiktok.svg"
              alt="TikTok icon"
              color="white"
              unoptimized
            />
          </Link>
        </div>

        {isAppPage && (
          <ContactButtonWithDialog
            trigger={
              <button className="text-sm font-bold hover:text-white/80 hover:underline">
                Nous contacter
              </button>
            }
          />
        )}

        <p className="text-sm text-gray-400">
          Mise à jour le {formatDateFrench(getYesterdayDate())}
        </p>
      </div>
    </footer>
  );
}
