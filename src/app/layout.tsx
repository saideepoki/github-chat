import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SessionWrapper from "@/components/SessionWrapper";


export const metadata: Metadata = {
  title: "Repo chat",
  description: "Generated by create next app",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={cn("min-h-screen font-sans antialiased",fontSans.variable)}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
