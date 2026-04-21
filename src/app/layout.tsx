import type { Metadata } from "next";
import { Inter_Tight, Michroma } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import FloatingBadge from "@/components/FloatingBadge";
import SmoothScroll from "@/components/SmoothScroll";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Into the Curlz — Curly Hair Specialist in Shropshire",
  description:
    "Curl-positive salon in Shropshire led by Hayley Imran, an internationally trained curly hair specialist with 20+ years of experience. Curl-by-curl cuts, colour, Qiqi, perms, and a curl-focused product line for wavy, curly, and coily hair.",
  keywords: [
    "curly hair salon Shropshire",
    "curly hair specialist",
    "curl-by-curl cut",
    "curly hair colour",
    "Qiqi hair control",
    "twist out salon",
    "curly hair products",
    "wavy curly coily hair",
    "Hayley Imran",
    "Into the Curlz",
  ],
  openGraph: {
    title: "Into the Curlz — Curly Hair Specialist in Shropshire",
    description:
      "Curls that are understood, celebrated, and styled to help you look and feel fabulous. A curl-positive salon in the heart of Shropshire, led by Hayley Imran.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${michroma.variable} ${interTight.className} antialiased`} suppressHydrationWarning={true}>
        <SmoothScroll>
          {children}
          <FloatingBadge />
        </SmoothScroll>
      </body>
    </html>
  );
}
