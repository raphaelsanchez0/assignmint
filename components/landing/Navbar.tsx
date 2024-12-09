import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav
      className="p-6 flex items-center justify-center 
         lg:justify-between"
    >
      <Link className="flex items-center" href="/">
        <div className="hidden dark:block">
          <Image src="/logos/white.png" alt="logo" width={48} height={48} />
        </div>
        <div className="dark:hidden">
          <Image src="/logos/black.png" alt="logo" width={48} height={48} />
        </div>
        <p className="text-2xl font-bold dark:font-semibold ml-2">AssignMint</p>
      </Link>
      <div className="flex">
        <Link href="/login?login=true">
          <button className="px-6 py-2 font-semibold hidden lg:block">
            Sign In
          </button>
        </Link>
        <Link href="/login">
          <button
            type="button"
            className="bg-gradient-to-r from-teal-500 to-green-500 rounded-full px-6 py-2 text-white font-semibold shadow-md hover:shadow-lg transition duration-200 ease-in-out
          hidden lg:block"
          >
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}
