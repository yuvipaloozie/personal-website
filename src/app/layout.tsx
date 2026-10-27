import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import AmbientResearch from "@/components/AmbientResearch";
import { profile } from "@/lib/profile";
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
        <AmbientResearch />
        <Navbar />
        <main id="main-content">{children}</main>
        <footer className="container site-footer">
          <span><Link href="/" className="footer-signature">{profile.name}</Link><span className="footer-location">{profile.location}</span></span>
          <Link href="/graph">Knowledge graph</Link>
          <a href="mailto:yuvraj.tripathy@outlook.com">Email</a>
        </footer>
      </body>
    </html>
  );
}
