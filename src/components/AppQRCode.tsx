import Image from "next/image";
import { PoppinsFont } from "@/utils/fonts";

interface AppQRCodeProps {
  className?: string;
  size?: number;
}

export function AppQRCode({ className = "", size = 200 }: AppQRCodeProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 bg-white rounded-3xl p-4 shadow-md ${className}`}>
      <p className={`${PoppinsFont.className} font-bold text-black whitespace-nowrap`}>
        Télécharger l&apos;app
      </p>
      <div>
        <Image
          src="/images/qr-code.svg"
          alt="QR Code pour télécharger l'application"
          width={size}
          height={size}
          unoptimized
          style={{ width: size, height: size }}
        />
      </div>
    </div>
  );
}
