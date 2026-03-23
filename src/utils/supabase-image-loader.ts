import type { ImageLoaderProps } from "next/image";

const SUPABASE_HOSTNAMES = new Set([
  "abkqohkbpzpaafojdzqg.supabase.co",
  "kbnnhcdaywuuunjxxufp.supabase.co",
]);

const OBJECT_PUBLIC_SEGMENT = "/storage/v1/object/public/";

export function supabaseImageLoader({ src, width, quality: _quality }: ImageLoaderProps): string {
  // Local/relative paths (e.g. /images/foo.png) cannot be parsed as an absolute URL.
  // Return them with a width query param so Next.js knows the loader uses width.
  if (src.startsWith("/") || src.startsWith("./") || src.startsWith("../")) {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}w=${width}`;
  }

  try {
    const sourceUrl = new URL(src);
    const isSupportedHost = SUPABASE_HOSTNAMES.has(sourceUrl.hostname);
    const isObjectPublicPath = sourceUrl.pathname.includes(OBJECT_PUBLIC_SEGMENT);

    if (!isSupportedHost || !isObjectPublicPath) {
      const separator = src.includes("?") ? "&" : "?";
      return `${src}${separator}w=${width}`;
    }

    // Blog images are already optimized before upload, so serve the original
    // public Storage asset instead of routing through Supabase render/image.
    return sourceUrl.toString();
  } catch {
    return src;
  }
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  return supabaseImageLoader({ src, width, quality });
}
