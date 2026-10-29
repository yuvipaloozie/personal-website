"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GraphMark } from "@/components/ui/graph-mark";
import { DitherSweep } from "@/components/ui/dither-sweep";
import { SelectionIndicator } from "@/components/ui/selection-indicator";
const links = [
  ["/", "Home"],
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
          <SelectionIndicator value={pathname} selector='[aria-current="page"]' />
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="sweep-target nav-sweep"
              aria-current={
                pathname === href || pathname.startsWith(href + "/")
                  ? "page"
                  : undefined
              }
            >
              <DitherSweep /><span className="sweep-label">{label}</span>
            </Link>
          ))}
        </nav>
        <Link href="/graph" className="graph-nav-link sweep-target nav-sweep" aria-label="Knowledge graph" title="Knowledge graph" aria-current={pathname === "/graph" ? "page" : undefined}>
          <DitherSweep /><span className="sweep-label"><GraphMark /><span>Knowledge graph</span></span>
        </Link>
      </div>
    </header>
  );
}
