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
      <div className="w-3/12">{children}</div>
    </div>
  );
}
