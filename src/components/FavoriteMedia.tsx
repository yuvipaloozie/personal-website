"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, BookOpen, Film, Disc3, Headphones, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DitherSweep } from "@/components/ui/dither-sweep";
import { CircularGallery } from "@/components/ui/circular-gallery-2";
import { favorites } from "@/lib/favorite-media";
import "@/styles/favorite-media.css";

const galleryItems = favorites.map(item => ({ image: `/media/${item.image.includes(".") ? item.image : `${item.image}.jpg`}`, text: item.title, width: item.width, height: item.height }));

export default function FavoriteMedia() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(preference.matches);
    const syncVisibility = () => setTabVisible(!document.hidden);
    syncMotion(); syncVisibility();
    preference.addEventListener("change", syncMotion); document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); preference.removeEventListener("change", syncMotion); document.removeEventListener("visibilitychange", syncVisibility); };
  }, []);
  useEffect(() => {
    if (!playing || reduced || !visible || !tabVisible || hovered || focused) return;
    const timer = setTimeout(() => setIndex(value => (value + 1) % favorites.length), 6500);
    return () => clearTimeout(timer);
  }, [playing, reduced, visible, tabVisible, hovered, focused, index]);
  function move(direction: number) { setPlaying(false); setIndex(value => (value + direction + favorites.length) % favorites.length); }
  const item = favorites[index];
  return <section ref={root} className="favorite-media" aria-labelledby="favorites-title" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
    <div className="favorites-heading"><h2 id="favorites-title">Favorites</h2><span className="favorites-count">{index + 1} / {favorites.length}</span></div>
    <CircularGallery items={galleryItems} selected={index} onSelect={setIndex} onInteract={() => setPlaying(false)} reducedMotion={reduced} />
    <div className="favorite-caption" aria-live={playing ? "off" : "polite"} aria-atomic="true">
      <MediaIcon kind={item.kind} />
      {item.href ? <a href={item.href}>{item.title}</a> : <span>{item.title}</span>}
      {item.kind.includes("placeholder") && <small>placeholder</small>}
    </div>
    <div className="favorites-controls">
      <Button variant="ghost" size="icon" className="sweep-target" aria-label="Previous favorite" onClick={() => move(-1)}><DitherSweep /><ChevronLeft size={18} /></Button>
      {!reduced && <Button variant="ghost" size="icon" className="sweep-target" aria-label={playing ? "Pause carousel" : "Play carousel"} onClick={() => setPlaying(value => !value)}><DitherSweep />{playing ? <Pause size={15} /> : <Play size={15} />}</Button>}
      <Button variant="ghost" size="icon" className="sweep-target" aria-label="Next favorite" onClick={() => move(1)}><DitherSweep /><ChevronRight size={18} /></Button>
    </div>
  </section>;
}

function MediaIcon({ kind }: { kind: string }) {
  const Icon = kind.startsWith("Book") ? BookOpen : kind.startsWith("Film") ? Film : kind.startsWith("Album") ? Disc3 : kind.startsWith("Podcast") ? Headphones : Newspaper;
  return <Icon size={13} strokeWidth={1.5} aria-label={kind.split(" · ")[0]} role="img" />;
}
