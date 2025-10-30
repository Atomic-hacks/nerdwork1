import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";

import "./globals.css";
import NavBar from "@/components/layout/Navbar";
import FAQ from "@/components/Faq";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nerdwork",
  description: "Nerdworkng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} antialiased`}
    >
      <body>
        <div className="min-h-screen w-full ">
          <NavBar />
          <main>{children}</main>
          <FAQ />
          <Footer />
        </div>
      </body>
    </html>
  );
}
