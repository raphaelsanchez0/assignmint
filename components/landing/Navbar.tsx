import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <nav
      className="p-6 flex items-center justify-center 
         lg:justify-between "
    >
      <a className="flex items-center">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
        <h1 className="text-2xl font-semibold ml-2">AssignMint</h1>
      </a>

      <button
        type="button"
        className="bg-gradient-to-r from-teal-500 to-green-500 rounded-full px-6 py-2 text-white font-semibold shadow-md hover:shadow-lg transition duration-200 ease-in-out
          hidden lg:block"
      >
        Sign Up
      </button>
    </nav>
  );
}
