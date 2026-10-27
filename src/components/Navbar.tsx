"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/blog", "Notes"],
  ["/resume", "CV"],
];
export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="site-name">
          Yuvraj Tripathy
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
      </div>
    </header>
  );
}
