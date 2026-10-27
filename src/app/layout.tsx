import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
const description =
  "Yuvraj Tripathy is a process automation engineer working across applied machine learning, knowledge graphs, computer vision, and industrial systems. Explore projects, experience, and research.";
export const metadata: Metadata = {
  title: {
    default: "Yuvraj Tripathy | Engineering & Applied Machine Learning",
    template: "%s | Yuvraj Tripathy",
  },
  description,
  openGraph: {
    title: "Yuvraj Tripathy | Engineering & Applied Machine Learning",
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary", title: "Yuvraj Tripathy", description },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <footer className="site-footer container">
          <span>
            Yuvraj Tripathy <span className="footer-divider">/</span>{" "}
            Engineering & applied ML
          </span>
          <nav aria-label="Social links">
            <a
              href="https://github.com/yuvipaloozie"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/yuvrajtripathy"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="mailto:yuvraj.tripathy@outlook.com">Email ↗</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
