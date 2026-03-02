import Link from "next/link";

const LEGAL_LINKS = [{ label: "CGU", href: "https://www.invstore.fr/pro/legal/tos" }];

export function LegalLinks() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-100 text-center">
      <p className="text-gray-500 text-sm">
        {LEGAL_LINKS.map((item, i) => (
          <span key={item.href}>
            {i > 0 && " · "}
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 underline underline-offset-2">
              {item.label}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );
}
