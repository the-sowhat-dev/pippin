import Script from 'next/script';
import { FAQ } from '@/utils/faq';
import { LexendFont, RobotoFont } from '@/utils/fonts';

export default function FAQPage() {
  return (
    <>
      {/* Schema.org FAQPage */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answerHtml,
              },
            })),
          }),
        }}
      />

      {/* Contenu visible */}
      <main className={`max-w-3xl mx-auto py-12`}>
        <h1
          className={`text-3xl sm:text-5xl text-green-900 mb-12 sm:mb-24 text-center ${LexendFont.className}`}
        >
          Questions fréquentes sur invstore®
        </h1>

        <div className="space-y-8">
          {FAQ.map((faq) => (
            <section
              key={faq.question}
              className={`${RobotoFont.className} border-b border-green-100 pb-8`}
            >
              <h2 className={`text-xl ${LexendFont.className}`}>{faq.question}</h2>
              <div className="mt-2 text-gray-700">{faq.answer}</div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
