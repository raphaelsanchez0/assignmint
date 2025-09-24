import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/SideBar";
import Provider from "@/utils/ReactQueryProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/utils/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AssignMint",
  description:
    "Boost your productivity with Assignmint, the ultimate assignment tracker and task management tool for students. Automatically import assignments from Canvas, organize deadlines, manage tasks, plan projects, and prioritize your workload with ease. Perfect for schools, universities, and online courses, Assignmint simplifies academic life and enhances time management for better success. If you're looking for a myStudyLife alternative, Assignmint offers a modern, feature-rich solution designed to fit the needs of today’s students.",
  keywords: ["assignment tracker", "myStudyLife alternative"],
};

export const viewPort: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <main>
            <Provider>{children}</Provider>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
