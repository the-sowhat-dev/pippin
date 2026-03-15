import type { ImageLoaderProps } from "next/image";

const SUPABASE_HOSTNAMES = new Set([
  "abkqohkbpzpaafojdzqg.supabase.co",
  "kbnnhcdaywuuunjxxufp.supabase.co",
]);

const OBJECT_PUBLIC_SEGMENT = "/storage/v1/object/public/";
const RENDER_PUBLIC_SEGMENT = "/storage/v1/render/image/public/";

export function supabaseImageLoader({ src, width, quality }: ImageLoaderProps): string {
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

    const renderedPathname = sourceUrl.pathname.replace(OBJECT_PUBLIC_SEGMENT, RENDER_PUBLIC_SEGMENT);
    const renderedUrl = new URL(`${sourceUrl.origin}${renderedPathname}`);

    sourceUrl.searchParams.forEach((value, key) => {
      renderedUrl.searchParams.set(key, value);
    });

    renderedUrl.searchParams.set("width", String(width));
    renderedUrl.searchParams.set("quality", String(quality ?? 75));
    renderedUrl.searchParams.set("resize", "contain");

    return renderedUrl.toString();
  } catch {
    return src;
  }
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  return supabaseImageLoader({ src, width, quality });
}
