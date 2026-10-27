"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  ["/projects", "Work"],
  ["/about", "About"],
  ["/resume", "Résumé"],
  ["/blog", "Writing"],
];
export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Yuvraj Tripathy home">
          Yuvraj Tripathy<span>.</span>
        </Link>
        <nav aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href || pathname.startsWith(href + "/")
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <a className="header-contact" href="mailto:yuvraj.tripathy@outlook.com">
          Let’s talk ↗
        </a>
      </div>
    </header>
  );
}
