import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Voicecode",
    template: `%s - Voicecode`,
  },
  description: "An AI-powered chatbot template built with Next.js and Vercel.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html className="dark" lang="en">
      <Script src="/register-sw.js" />
      <body className={`dark:bg-black h-screen ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
