import { PoppinsFont } from "@/utils/fonts";
import { GlowyBackground } from "@/components/ui/GlowyBackground";
import { AppQRCode } from "@/components/AppQRCode";
import Image from "next/image";

const words = [
  "Assurance-vie",
  "•",
  "Bourse",
  "•",
  "PER",
  "•",
  "Défiscalisation",
  "•",
  "Bilan patrimonial",
  "•",
  "PEA",
  "•",
  "Retraite",
  "•",
  "Transmission",
  "•",
];

export const NewHeroStrategy = () => {
  return (
    <GlowyBackground>
      <section className="flex min-h-screen flex-col pt-24">
        <div className="px-6 max-w-6xl mx-auto flex flex-col flex-1 w-full">
          <div className="flex flex-col w-full gap-4 md:flex-row md:items-start md:justify-between mb-6">
            <div className="flex flex-col gap-4">
              <h1
                className={`${PoppinsFont.className} text-5xl text-[50px] text-green-900 max-w-[750px] font-bold`}>
                La première marketplace patrimoniale française
              </h1>

              <h2
                className={`${PoppinsFont.className} text-xl lg:text-2xl lg:text-[25px] max-w-[750px] text-green-950`}>
                Matchez avec le monde de la finance dans l&apos;application
              </h2>
            </div>
          </div>

          <div className="flex flex-1 items-end justify-center gap-10 px-6 lg:justify-end">
            <div className="hidden shrink-0 lg:flex lg:flex-1 lg:items-center lg:justify-center lg:my-auto">
              <AppQRCode size={160} />
            </div>

            <Image
              src="/images/step-390.png"
              alt="welcome_mockup"
              className="max-w-[300px] sm:max-w-[400px] object-contain"
              width={504}
              height={1000}
            />
          </div>
        </div>

        <div className="bg-white flex justify-center py-2">
          <div className="flex overflow-hidden max-w-6xl lg:text-lg">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`${word === "•" ? "opacity-30" : "opacity-100"} px-2 lg:px-4 whitespace-nowrap`}>
                {word}
              </span>
            ))}
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`${word === "•" ? "opacity-30" : "opacity-100"} px-2 lg:px-4 whitespace-nowrap`}>
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>
    </GlowyBackground>
  );
};
