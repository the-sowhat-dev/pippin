import Link from "next/link";

export const JoinUsButton = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <button className="px-6 sm:px-8 py-3 rounded-lg text-white font-medium bg-[#35C055] hover:bg-[#35C055]/80">
        Nous rejoindre
      </button>
    </Link>
  );
};
