import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
export const metadata: Metadata = {
  title: {
    default: "Yuvraj Tripathy | Research & Engineering",
    template: "%s | Yuvraj Tripathy",
  },
  description:
    "Research, projects, and technical notes by Yuvraj Tripathy: process engineering, machine learning, knowledge graphs, and biomedical computer vision.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <footer className="container site-footer">
          <span>Yuvraj Tripathy · Atlanta, Georgia</span>
          <Link href="/graph">Knowledge graph</Link>
          <a href="mailto:yuvraj.tripathy@outlook.com">Email</a>
        </footer>
      </body>
    </html>
  );
}
