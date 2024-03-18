"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  let pathname = usePathname() || "/";

  const links = [{ id: 1, text: 'Nous contacter', link: 'contact' }];

  return (
    <>
      <div className="w-full h-20 fixed nav backdrop-blur-md flex justify-between items-center px-12 md:px-24">
        <Link href="/">
          <Image
            src="/coin.png"
            alt="Home icon"
            width={32}
            height={32}
            priority
          />
        </Link>

        <ul className="flex">
          {links.map(({ id, link, text }) => {
            console.log(link, pathname)
            const isActive = `/${link}` === pathname;

            return (
              <li
                key={id}
                className={`nav-links px-4 cursor-pointer hover:font-extrabold hover:text-[#0A9DFF] duration-200 link-underline ${isActive ? 'text-[#0A9DFF] font-bold' : ''}`}
              >
                <Link href={`/${link}`}>{text}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;