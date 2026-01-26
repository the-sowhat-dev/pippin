import React, { ComponentPropsWithoutRef } from 'react';
import { highlight } from 'sugar-high';
import { OpenSans } from '../utils/fonts';
import Link from 'next/link';
import Image from 'next/image';
import { CollaborationBlock } from './CollaborationBlock';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type HrProps = ComponentPropsWithoutRef<'hr'>;

type ImageWithCaptionProps = {
  src: string;
  alt: string;
  caption: string;
  maxHeight: number;
};

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className={`text-2xl sm:text-3xl pt-6 sm:pt-8 pb-12 sm:pb-16 mb-0 fade-in text-center ${OpenSans.className}`}
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className={`text-xl sm:text-2xl text-gray-800 font-medium mt-8 sm:mt-12 mb-2 sm:mb-3 ${OpenSans.className}`}
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className={`text-lg text-gray-800 font-medium mt-6 sm:mt-8 mb-2 sm:mb-3 ${OpenSans.className}`}
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className={`text-md ${OpenSans.className}`} {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 text-base sm:text-lg text-pretty leading-snug" {...props} />
  ),
  ol: (props: ListProps) => <ol className="text-gray-800 list-decimal pl-5 space-y-2" {...props} />,
  ul: (props: ListProps) => <ul className="text-gray-800 list-disc pl-5 space-y-1" {...props} />,
  li: (props: ListItemProps) => <li className="pl-1 text-base sm:text-lg" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="font-medium" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-amber-600 hover:text-amber-500';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  ImageWithCaption: ({ src, alt, caption, maxHeight }: ImageWithCaptionProps) => (
    <figure>
      <Image
        src={src}
        alt={alt}
        className={`w-full object-cover max-h-[${maxHeight}px]`}
        width={1000}
        height={700}
      />
      {caption && <figcaption className="text-sm text-gray-500 text-center">{caption}</figcaption>}
    </figure>
  ),
  CollaborationBlock: ({ id }: { id: string }) => <CollaborationBlock id={id} />,
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table className="w-full border-collapse mb-8">
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index} className="border border-amber-200 bg-amber-100 p-3 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-amber-50' : 'bg-yellow-50'}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-yellow-300 p-3">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote className="ml-[0.075em] border-l-3 border-gray-300 pl-4 !text-red-500" {...props} />
  ),
  hr: (props: HrProps) => <hr className="my-10 h-px border-0 bg-yellow-200" {...props} />,
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
