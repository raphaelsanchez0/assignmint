import React from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
    bg-gradient-to-br from-green-400 to-green-950 "
    >
      <div className="lg:w-3/12 lg:grow-0 lg:m-0 w-full grow m-3">
        {children}
      </div>
    </div>
  );
}
