import type { Metadata } from 'next'
//import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Poppins } from 'next/font/google'
import './globals.css'
import Sidebar from './_components/SideBar/SideBar'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'AssignMint',
  description: 'Manage your tasks and assignments with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head> */}
      <body className={poppins.className}>
        <div className="flex">
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
