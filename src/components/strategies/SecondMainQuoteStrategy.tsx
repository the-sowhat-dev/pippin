import { LexendFont } from "@/utils/fonts";
import { QuoteIcon } from "@radix-ui/react-icons";

export function SecondMainQuoteStrategy() {
  return (
    <section className="pt-16 pb-32 bg-white">
      <div className="relative lg:max-w-2xl mx-auto max-w-[85%]">
        <QuoteIcon
          width={100}
          height={100}
          className="absolute -top-12 -left-6 md:left-6 lg:-left-6 text-green-700 opacity-30 rotate-180"
        />

        <h2 className={`${LexendFont.className} text-xl lg:text-3xl text-center text-green-950`}>
          Quel que soit le montant que vous souhaitez investir, vous avez le contrôle de la
          négociation !
        </h2>

        <QuoteIcon
          width={100}
          height={100}
          className="absolute -bottom-12 -right-6 md:right-6 lg:-right-6 text-green-700 opacity-30"
        />
      </div>
    </section>
  );
}
