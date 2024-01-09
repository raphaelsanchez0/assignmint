import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/SideBar";
import Provider from "@/util/Providers";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "AssignMint",
    description: "Manage your tasks and assignments with ease.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <Sidebar />
                <main>
                    <Provider>{children}</Provider>
                </main>
            </body>
        </html>
    );
}
