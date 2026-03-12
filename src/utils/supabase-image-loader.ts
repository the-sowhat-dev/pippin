import type { ImageLoaderProps } from "next/image";

const SUPABASE_HOSTNAMES = new Set([
  "abkqohkbpzpaafojdzqg.supabase.co",
  "kbnnhcdaywuuunjxxufp.supabase.co",
]);

const OBJECT_PUBLIC_SEGMENT = "/storage/v1/object/public/";
const RENDER_PUBLIC_SEGMENT = "/storage/v1/render/image/public/";

export function supabaseImageLoader({ src, width, quality }: ImageLoaderProps): string {
  try {
    const sourceUrl = new URL(src);
    const isSupportedHost = SUPABASE_HOSTNAMES.has(sourceUrl.hostname);
    const isObjectPublicPath = sourceUrl.pathname.includes(OBJECT_PUBLIC_SEGMENT);

    if (!isSupportedHost || !isObjectPublicPath) {
      return src;
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
