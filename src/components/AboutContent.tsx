"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBook, FaFilm, FaMusic } from "react-icons/fa";
import { career, education, profile } from "@/lib/profile";
export default function AboutContent() {
  return (
    <div className="container section">
      <section className="about-profile">
        <div className="prose">
          <h1>About</h1>
          <p>
            I’m Yuvraj, a {career.arclin.title} at {career.arclin.employer} and a graduate
            student in {education.graduate.subject} at {education.shortInstitution}.
          </p>
          <p>
            My foundation is in Chemical and Biomolecular Engineering. That
            background shapes how I approach machine learning: understand the
            physical system, the assumptions behind a measurement, and the
            decisions a model will inform.
          </p>
          <p>
            My projects span process safety knowledge graphs, semiconductor
            sensor analysis, and biomedical computer vision. As a {career.pcom.title} at PCOM, I work
            on deep learning methods for microscopy image analysis.
          </p>
          <p>
            This site brings together those projects and the technical ideas
            that connect them.
          </p>
          <p>
            <Link href="/resume">Curriculum vitae</Link> ·{" "}
            <a href={`mailto:${profile.email}`}>Get in touch</a>
          </p>
        </div>
        <figure>
          <Image
            src="/profile.jpg"
            alt="Yuvraj Tripathy"
            width={185}
            height={225}
          />
        </figure>
      </section>
      <section className="personal-section">
        <h2>Outside the work</h2>
        <p>Taekwondo, powerlifting, and experimenting in the kitchen.</p>
      </section>
      <section className="personal-section">
        <h2>On my shelf</h2>
        <p>A few albums, films, and books I enjoy.</p>
        <div className="media-shelf">
          <MediaStack
            title="Albums"
            icon={<FaMusic />}
            items={["Discovery", "Currents", "Dark Side of the Moon"]}
          />
          <MediaStack
            title="Films"
            icon={<FaFilm />}
            items={["Interstellar", "Blade Runner 2049", "Arrival"]}
          />
          <MediaStack
            title="Books"
            icon={<FaBook />}
            items={["Gödel, Escher, Bach", "Dune", "The Martian"]}
          />
        </div>
      </section>
    </div>
  );
}
function MediaStack({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [explicitOpen, setExplicitOpen] = useState<boolean | null>(null);
  const open = explicitOpen ?? hovered;
  return (
    <div
      className="shelf-stack"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
        setExplicitOpen((current) => (current === false ? null : current));
      }}
    >
      <h3>
        <button
          className="shelf-toggle"
          type="button"
          aria-expanded={open}
          onClick={() => setExplicitOpen(!open)}
        >
          {icon}
          <span>{title}</span>
          <span className="shelf-hint">{open ? "Close" : "Browse"}</span>
        </button>
      </h3>
      <ul className="shelf-books" aria-label={title}>
        {items.map((item, index) => (
          <motion.li
            key={item}
            animate={{
              rotate: open ? (index - 1) * 12 : (index - 1) * 4,
              x: open ? (index - 1) * 42 : (index - 1) * 8,
              y: open ? index * 8 : index * 4,
              zIndex: items.length - index,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <span className="shelf-art" aria-hidden="true">
              {icon}
            </span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
