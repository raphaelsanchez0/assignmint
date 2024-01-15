import React from "react";
import LoadingItem from "./LoadingItem";

export default function LoadingListShorter() {
  return (
    <div
      role="status"
      className="w-full p-4 space-y-4  divide-y divide-gray-200 rounded animate-pulse "
    >
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
