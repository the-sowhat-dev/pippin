import { PoppinsFont } from "@/utils/fonts";
import { ArrowRightIcon } from "lucide-react";

export const StickyMobileAppButton = () => {
  return (
    <div className="block lg:hidden fixed bottom-7 right-4 z-10">
      <div className="bg-[#35C055] text-white px-4 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md">
        <a
          href={"/app/redirect"}
          className={`${PoppinsFont.className} flex items-center justify-center gap-2 font-bold text-base text-[15px]`}>
          <span>Télécharger l&apos;application</span>
          <ArrowRightIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};
