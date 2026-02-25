import Link from "next/link";
import Image from "next/image";

import { OpenSans } from "@/utils/fonts";
import { JoinUsButton } from "./JoinUsButton";

export const HeroPro = () => {
  return (
    <section className="py-12 pt-16 text-green-900 min-h-screen flex flex-col justify-between gap-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 pt-8 sm:pt-16">
        <h1
          className={`text-3xl sm:text-6xl leading-tight text-center w-[80%] mx-auto ${OpenSans.className}`}>
          Faire progresser l&apos;épargne par l&apos;expérience d&apos;achat
        </h1>
        <p className="text-center text-lg sm:text-2xl text-pretty w-[60%] mx-auto opacity-80">
          Vous distribuez des produits d&apos;épargne ? <br /> Obtenez de nouveaux clients !
        </p>

        <div className="flex flex-col mx-auto gap-3 items-center justify-center text-md sm:text-lg font-medium">
          <JoinUsButton href="/pro/form" />

          <Link href="/dashboard">
            <button className="px-6 sm:px-8 py-2 text-green-800 underline">Se connecter</button>
          </Link>
        </div>
      </div>

      <div className="items-center justify-center w-[80%] max-w-2xl mx-auto xl:mt-12">
        <Image
          src={`/images/pro-screen.png`}
          alt={`@invstore`}
          width={1360}
          height={1330}
          className="w-full h-auto object-contain"
        />
      </div>

      <h3 className="w-[60%] mx-auto text-center leading-tight md:text-xl mt-8">
        Une source unique de prospects qualifiés grâce aux technologies IA et Open Banking, avec
        lesquels vous pouvez interagir directement dans la plateforme pour offrir vos produits et
        services.
      </h3>
    </section>
  );
};
