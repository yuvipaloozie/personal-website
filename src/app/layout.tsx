import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "./plant/plant.css";
import "@/styles/process.css";
import { profile } from "@/lib/profile";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { DitherSweep } from "@/components/ui/dither-sweep";
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
          <a className="footer-social sweep-target" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <DitherSweep /><span className="sweep-label"><FaGithub aria-hidden="true" /></span>
          </a>
          <a className="footer-social sweep-target" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <DitherSweep /><span className="sweep-label"><FaLinkedinIn aria-hidden="true" /></span>
          </a>
          <a className="footer-social sweep-target" href={`mailto:${profile.email}`} aria-label="Email" title="Email">
            <DitherSweep /><span className="sweep-label"><PixelIcon name="mail" /></span>
          </a>
        </footer>
      </body>
    </html>
  );
}
