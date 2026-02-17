import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export function MainQuoteStrategy() {
  return (
    <section className="p-2 lg:p-5">
      <div className="relative lg:max-w-2xl mx-auto max-w-[90%] mt-8 lg:mt-10 mb-16 lg:mb-48">
        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -top-12 -left-6 md:left-6 lg:-left-6 text-blue-700 opacity-30 rotate-180"
        />

        <h2 className="text-2xl lg:text-3xl text-center">
          téléchargez l&apos;application invstore®
          <br />
          <span className="font-bold block mt-1 sm:mt-2">
            laissez le monde de la finance venir à vous
          </span>
        </h2>

        <FormatQuoteIcon
          sx={{ fontSize: 100 }}
          className="absolute -bottom-12 -right-6 md:right-6 lg:-right-6 text-blue-700 opacity-30"
        />
      </div>
    </section>
  );
}
