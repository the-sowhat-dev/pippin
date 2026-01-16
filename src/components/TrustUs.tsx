import { LexendFont } from '@/utils/fonts';
import Image from 'next/image';

export default function TrustUs() {
  return (
    <div className="bg-gradient-to-b from-[#203649] to-[#405e79] p-4 md:p-8 py-8">
      <div className="flex flex-col sm:flex-row max-w-4xl gap-8 mx-auto justify-between items-center">
        <p className="text-base sm:text-lg text-center text-white">
          Ils nous font confiance. Découvrez{' '}
          <span className={`${LexendFont.className} text-green-100`}>nos partenaires pilotes</span>.
        </p>
        <div className="flex gap-6">
          <div
            className="h-[100px] w-[100px] sm:w-[150px] transition-all duration-300 hover:scale-105 items-center flex justify-center"
            title="Yomoni"
          >
            <Image src={'/images/yomoni.png'} alt="Yomoni" width={300} height={150} />
          </div>

          <div
            className="h-[100px] w-[100px] sm:w-[150px] transition-all duration-300 hover:scale-105 items-center flex justify-center"
            title="Prosper Conseil"
          >
            <Image
              src={'/images/prosper-conseil.png'}
              alt="Prosper Conseil"
              width={300}
              height={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
