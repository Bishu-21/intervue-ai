import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intervue AI | One Interview. Infinite Opportunities.",
  description: "Experience a revolutionary AI-powered career ecosystem where a single interview unlocks a world of global roles. Validated skills, instant matching, and direct hiring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans bg-dark text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
