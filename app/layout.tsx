import type { Metadata } from "next";
import localfont from 'next/font/local';
import "./globals.css";
import ThemeProvider from "./context/Theme";
import React, { ReactNode } from 'react'
import { Toaster } from "sonner";
import { SessionContext, SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = localfont({
  src: "/fonts/interVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceG = localfont({
  src: "/fonts/spaceG.ttf",
  variable: "--font-spaceG",
  weight: "300 400 500 600 700",
});

export const metadata: Metadata = {
  title: "",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/favicon.ico",
  }
};

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${spaceG.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}

export default RootLayout
