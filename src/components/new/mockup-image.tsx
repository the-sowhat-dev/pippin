import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
  maxWidth: number;
}

export function MockupImage({ maxWidth, width, height, src, alt }: Props) {
  return (
    <Image
      width={width}
      height={height}
      priority
      style={{ maxWidth, width: '100%', height: 'auto', objectFit: 'contain' }}
      src={src}
      alt={alt}
    />
  );
}
