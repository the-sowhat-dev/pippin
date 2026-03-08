if (!process.env.NEXT_PUBLIC_STORAGE_URL) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    'warn  - NEXT_PUBLIC_STORAGE_URL is not defined in the environment variables. Images will not load correctly.'
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/utils/supabase-image-loader.ts",
    minimumCacheTTL: 2678400, // 31 days
    formats: ["image/webp"],
    qualities: [50, 60, 70, 75, 85],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 200, 240, 300, 400],
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/icons/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "abkqohkbpzpaafojdzqg.supabase.co",
        pathname: "/storage/v1/**",
      },
      {
        protocol: "https",
        hostname: "kbnnhcdaywuuunjxxufp.supabase.co",
        pathname: "/storage/v1/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "avenuedesinvestisseurs.fr",
      },
    ],
  },
};

export default nextConfig;
