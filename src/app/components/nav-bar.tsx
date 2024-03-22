"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  let pathname = usePathname() || "/";

  return (
    <>
      <div className="w-full h-20 fixed nav backdrop-blur-md flex justify-between items-center px-12 md:px-24">
        {pathname !== "/" && (
          <Link href="/">
            <Image
              width={42}
              height={42}
              style={{ objectFit: "contain" }}
              src="/arrow-left.svg"
              alt="Back arrow left icon"
            />
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
