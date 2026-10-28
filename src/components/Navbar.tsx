"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GraphMark } from "@/components/ui/graph-mark";
const links = [
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/blog", "Blog"],
  ["/resume", "Resume"],
];
export default function Navbar() {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!header.current) return;
    const size = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty("--header-height", `${entry.target.getBoundingClientRect().height}px`);
    });
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    size.observe(header.current);
    visibility.observe(header.current);
    return () => { size.disconnect(); visibility.disconnect(); };
  }, []);
  return (
    <header ref={header} className="site-header" data-visible={visible}>
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
        <Link href="/graph" className="graph-nav-link" aria-current={pathname === "/graph" ? "page" : undefined}>
          <GraphMark /><span>Knowledge graph</span>
        </Link>
      </div>
    </header>
  );
}
