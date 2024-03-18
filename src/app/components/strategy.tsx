import React from "react";
import Image from 'next/image';
import { mulish } from '../fonts';


interface StrategyProps {
  imagePath: string;
  text: string;
  title: string;
  canva: 'primary' | 'secondary';
  brand?: boolean;
}

const Strategy: React.FC<StrategyProps> = ({ imagePath, text, title, canva, brand }) => {
  const gradientBackgroundColor = canva === 'primary' ? 'bg-gradient-to-b from-yellow-400 to-yellow-300' : 'bg-gradient-to-b from-yellow-100 to-yellow-50';
  const imageAlignment = canva === 'primary' ? 'sm:order-last' : '';

  return (
    <section className={`p-12 pb-0 sm:p-20 sm:pb-0 2xl:p-40 2xl:pb-0 min-h-[800px]] ${gradientBackgroundColor}`}>

      <div>
        <h1 className={`${mulish.className} text-2xl sm:text-4xl text-center flex justify-center`}>{title}{brand && <span className='text-sm'>®</span>}</h1>

        <div className={`sm:grid sm:grid-cols-2 gap-2 pt-20 pb-40`}>
          <div className={`flex items-center justify-center text-xl sm:text-2xl ${imageAlignment} text-center`}>{text}</div>
          <div className='flex items-center justify-center my-11'>
            <Image
              src={imagePath}
              alt="Strategy Image"
              width={280}
              height={200}
              style={{ objectFit: 'contain' }}
            />

          </div>
        </div>
      </div>

    </section>
  );
}

export default Strategy;

