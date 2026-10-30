"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Film, Disc3, Headphones, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DitherSweep } from "@/components/ui/dither-sweep";
import { CircularGallery } from "@/components/ui/circular-gallery-2";
import { favorites } from "@/lib/favorite-media";
import "@/styles/favorite-media.css";

const galleryItems = favorites.map(item => ({ image: `/media/${item.image.includes(".") ? item.image : `${item.image}.jpg`}`, text: item.title, width: item.width, height: item.height }));

export default function FavoriteMedia() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(preference.matches);
    syncMotion();
    preference.addEventListener("change", syncMotion);
    return () => preference.removeEventListener("change", syncMotion);
  }, []);
  function move(direction: number) { setIndex(value => (value + direction + favorites.length) % favorites.length); }
  const item = favorites[index];
  return <section className="favorite-media" aria-labelledby="favorites-title" aria-roledescription="carousel"
    onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
    <div className="favorites-heading"><h2 id="favorites-title">Favorites</h2><span className="favorites-count">{index + 1} / {favorites.length}</span></div>
    <CircularGallery items={galleryItems} selected={index} onSelect={setIndex} reducedMotion={reduced} />
    <div className="favorites-footer">
      <Button variant="ghost" size="icon" className="sweep-target" aria-label="Previous favorite" onClick={() => move(-1)}><DitherSweep /><ChevronLeft size={18} /></Button>
    <div className="favorite-caption" aria-live="polite" aria-atomic="true">
      <MediaIcon kind={item.kind} />
      {item.href ? <a href={item.href}>{item.title}</a> : <span>{item.title}</span>}
      {item.kind.includes("placeholder") && <small>placeholder</small>}
    </div>
      <Button variant="ghost" size="icon" className="sweep-target" aria-label="Next favorite" onClick={() => move(1)}><DitherSweep /><ChevronRight size={18} /></Button>
    </div>
  </section>;
}

function MediaIcon({ kind }: { kind: string }) {
  const Icon = kind.startsWith("Book") ? BookOpen : kind.startsWith("Film") ? Film : kind.startsWith("Album") ? Disc3 : kind.startsWith("Podcast") ? Headphones : Newspaper;
  return <Icon size={13} strokeWidth={1.5} aria-label={kind.split(" · ")[0]} role="img" />;
}
