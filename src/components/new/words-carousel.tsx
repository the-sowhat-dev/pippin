'use client';

import { useLanguage } from '@/i18n/LanguageProvider';

export function WordsCarousel() {
  const { messages } = useLanguage();
  const words = messages.home.wordsCarousel;

  // Multiply each word 4 times
  const repeatedWords = [...Array(4)].flatMap(() => words.map((w) => w.word));

  return (
    <div>
      <div className="titles w-full text-zinc-50">
        <div className="titles-slide">
          {repeatedWords.map((w, index) => (
            <p key={`${index}_${w}`} className="sm:text-lg">
              {w}
            </p>
          ))}
        </div>

        <div className="titles-slide">
          {repeatedWords.map((w, index) => (
            <p key={`bis_${index}_${w}`} className="sm:text-lg">
              {w}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
