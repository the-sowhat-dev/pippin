import Image from 'next/image';
import { ImageProps } from 'next/image';
import React, { ReactNode } from 'react';

interface PhotoComentProps extends ImageProps {
  text: ReactNode;
}

const StrategyCharts: React.FC<PhotoComentProps> = ({ src, text, alt }) => {
  return (
    <div className="flex justify-start gap-8 items-center flex-col sm:flex-row">
      <Image
        src={src}
        alt={alt}
        width={300}
        height={295}
        style={{ width: '120px', height: '120px', objectFit: 'contain' }}
      />
      <p className="text-white text-md sm:text-lg max-w-[500px] text-center sm:text-start">
        {text}
      </p>
    </div>
  );
};

export default StrategyCharts;
