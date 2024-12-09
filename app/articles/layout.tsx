import Navbar from "@/components/landing/Navbar";
import { Card } from "@/components/ui/card";

export default function ArticleBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-w-screen min-h-screen
    bg-gradient-to-br from-green-400 to-green-950 flex items-start justify-center"
    >
      <div className="w-11/12 flex flex-col items-center justify-normal dark:bg-zinc-900 min-h-screen">
        <div className="w-full">
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
}
