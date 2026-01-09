import createMDX from '@next/mdx';

if (!process.env.NEXT_PUBLIC_STORAGE_URL) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    'warn  - NEXT_PUBLIC_STORAGE_URL is not defined in the environment variables. Images will not load correctly.'
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'abkqohkbpzpaafojdzqg.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'kbnnhcdaywuuunjxxufp.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
