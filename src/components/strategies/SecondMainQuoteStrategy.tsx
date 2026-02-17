import { LexendFont } from "@/utils/fonts";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export function SecondMainQuoteStrategy() {
  return (
    <section className="pt-16 pb-32 bg-[#c6f0d0]">
      <div className="relative lg:max-w-2xl mx-auto max-w-[85%]">
        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -top-12 -left-6 md:left-6 lg:-left-6 text-green-700 opacity-30 rotate-180"
        />

        <h2 className={`${LexendFont.className} text-2xl lg:text-3xl text-center`}>
          Quel que soit le montant que vous souhaitez investir, vous avez le contrôle de la
          négociation !
        </h2>

        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -bottom-12 -right-6 md:right-6 lg:-right-6 text-green-700 opacity-30"
        />
      </div>
    </section>
  );
}
