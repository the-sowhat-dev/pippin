if (!process.env.NEXT_PUBLIC_STORAGE_URL) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    'warn  - NEXT_PUBLIC_STORAGE_URL is not defined in the environment variables. Images will not load correctly.'
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
