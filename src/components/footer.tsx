"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatDateFrench, getYesterdayDate } from "../utils/date";
import { usePathname } from "next/navigation";
import { ContactButtonWithDialog } from "./ContactButtonWithDialog";

export function Footer() {
  const pathname = usePathname();
  const isProFormPage = pathname === "/pro/form";
  const isAppPage = pathname.startsWith("/app");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const { messages } = useLanguage();

  if (isProFormPage || isDashboardPage) return null;

  return (
    <footer className="w-full bg-black flex flex-col sm:flex-row gap-12 justify-between text-white items-center p-8 sm:px-16">
      <Link
        href={"/legal"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold hover:text-white/80 hover:underline">
        {messages.footer.legal}
      </Link>

      {isAppPage && (
        <ContactButtonWithDialog
          trigger={
            <button className="text-sm font-bold hover:text-white/80 hover:underline">
              Nous contacter
            </button>
          }
        />
      )}

      <p className="text-sm text-gray-400">Mise à jour le {formatDateFrench(getYesterdayDate())}</p>
    </footer>
  );
}
