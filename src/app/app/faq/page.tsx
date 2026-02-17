import Script from "next/script";
import { FAQ_EPARGNE_INVESTISSEMENT, FAQ_INVSTORE } from "@/utils/faq";
import { LexendFont, RobotoFont } from "@/utils/fonts";

export default function FAQPage() {
  return (
    <>
      {/* Schema.org FAQPage */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [...FAQ_INVSTORE, ...FAQ_EPARGNE_INVESTISSEMENT].map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answerHtml,
              },
            })),
          }),
        }}
      />

      {/* Contenu visible */}
      <main className={`max-w-3xl mx-auto py-12`}>
        <h1
          className={`text-3xl sm:text-5xl text-green-900 mb-12 sm:mb-24 text-center ${LexendFont.className}`}>
          F.A.Q.
        </h1>

        <h2 className={`text-2xl sm:text-3xl text-green-900 mb-8 ${LexendFont.className}`}>
          1. Questions fréquentes à propos d'invstore®
        </h2>

        <div className="space-y-8">
          {FAQ_INVSTORE.map((faq) => (
            <section
              key={faq.question}
              className={`${RobotoFont.className} border-b border-green-100 pb-8`}>
              <h2 className={`text-xl ${LexendFont.className}`}>{faq.question}</h2>
              <div className="mt-2 text-gray-700">{faq.answer}</div>
            </section>
          ))}
        </div>

        <h2 className={`text-2xl sm:text-3xl text-green-900 my-8 ${LexendFont.className}`}>
          2. Questions fréquentes à propos de l'épargne et l'investissement
        </h2>

        <div className="space-y-8">
          {FAQ_EPARGNE_INVESTISSEMENT.map((faq) => (
            <section
              key={faq.question}
              className={`${RobotoFont.className} border-b border-green-100 pb-8`}>
              <h2 className={`text-xl ${LexendFont.className}`}>{faq.question}</h2>
              <div className="mt-2 text-gray-700">{faq.answer}</div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
