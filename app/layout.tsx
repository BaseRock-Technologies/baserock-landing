import { Providers } from "./providers";
// import { ThemeToggle } from "@/components/theme-toggle";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Web & App Development, Product Management & More | BaseRock Technologies",
  description:
    "BaseRock Technologies helps startups and creators build custom apps, websites, and digital products. Fast, clear, and reliable. Book a free discovery call today.",
  keywords: [
    "web and app development services",
    "freelance product developer",
    "hire product manager India",
    "project management for startups",
    "technical content writer",
    "personal branding and LinkedIn management",
    "SEO writing for websites",
    "freelance UI/UX designer India",
    "voiceover and emcee services",
    "build your digital product",
    "BaseRock Technologies",
    "Sahithya Balasubramaniam",
    "Jenifar",
  ],
  authors: [{ name: "Jenifar" }],
  creator: "BaseRock Technologies",
  publisher: "BaseRock Technologies",
  openGraph: {
    title:
      "Web & App Development, Product Management & More | BaseRock Technologies",
    description:
      "BaseRock Technologies helps startups and creators build custom apps, websites, and digital products. Fast, clear, and reliable. Book a free discovery call today.",
    type: "website",
    locale: "en_US",
    siteName: "BaseRock Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Web & App Development, Product Management & More | BaseRock Technologies",
    description:
      "BaseRock Technologies helps startups and creators build custom apps, websites, and digital products. Fast, clear, and reliable. Book a free discovery call today.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="no-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
