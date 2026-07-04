import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Vivan Desai — Software Engineer",
  description:
    "CS Specialist (Computer Systems) at the University of Toronto. Backend-leaning engineer building ML and quantitative systems for finance.",
  openGraph: {
    title: "Vivan Desai — Software Engineer",
    description:
      "Backend-leaning engineer building ML and quantitative systems for finance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="font-mono antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
