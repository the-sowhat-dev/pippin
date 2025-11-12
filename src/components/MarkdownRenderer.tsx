'use client';

import ReactMarkdown from 'react-markdown';
import { useMDXComponents } from '@/mdx-components';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components = useMDXComponents();

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}
