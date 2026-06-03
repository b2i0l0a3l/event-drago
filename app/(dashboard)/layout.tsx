import {ClerkProvider} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import { ThemeProvider } from "@/components/Provider/theme-provider";
import SideBar from "@/components/layout/sideBar/SideBar";
import { Toaster } from "@/components/ui/sonner";

import { QueryProvider } from "@/components/Provider/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drago Event",
  description: "Drago Event Monitor",
};

import DashboardLayout from "@/components/layout/DashboardLayout";

// ... [rest of imports are handled by replacing the entire layout div]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
     
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <DashboardLayout>
              {children}
            </DashboardLayout>
            <Toaster/>

            </ThemeProvider>
          </QueryProvider>

        </ClerkProvider>
      </body>
    </html>
  );
}