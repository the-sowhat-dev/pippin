import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-yellow-400 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/sowhat.svg"
                alt="Sowhat Logo"
                width={82}
                height={37}
                priority
              />
            </Link>
            <Link href="/about">
              <p>À propos</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;