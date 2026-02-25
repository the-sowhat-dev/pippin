"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { ContactInfoList } from "@/components/ContactButtonWithDialog";

export default function ContactPage() {
  const { messages } = useLanguage();

  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-4 pt-24 sm:p-24 bg-slate-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-bold text-foreground">{messages.contactDialog.title}</h1>
          <p className="text-muted-foreground">{messages.contactDialog.description}</p>
        </div>

        <ContactInfoList />
      </div>
    </main>
  );
}
