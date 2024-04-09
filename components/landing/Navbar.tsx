import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <nav
      className="p-6 flex items-center justify-center 
         lg:justify-between lg:max-w-screen-lg lg:mx-auto "
    >
      <a className="flex items-center">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
        <h1 className="text-2xl font-semibold ml-2">AssignMint</h1>
      </a>

      {/* <a className="md:hidden">
          <span className="block w-8 h-[2px] mb-2 bg-slate-200"></span>
          <span className="block w-8 h-[2px] mb-2 bg-slate-200 "></span>
          <span className="block w-8 h-[2px] bg-slate-200"></span>
        </a> */}

      {/* <div className="hidden md:block">
          <a className="text-slate-200 hover:text-slate-100">Features</a>
          <a className="ml-4 text-slate-200 hover:text-slate-100">Contact</a>
          <a className="ml-4 text-slate-200 hover:text-slate-100">Sign Up</a>
        </div> */}

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
