"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import { graphData } from "@/data/graphData";
import { FaBook, FaFilm, FaMusic, FaUtensils, FaDumbbell, FaFistRaised } from "react-icons/fa";

export default function About() {
  const meDetails = graphData.nodes.find(n => n.id === "me")?.details;

  const hobbies = [
    { name: "Taekwondo", icon: <FaFistRaised />, description: "Black belt, focused on discipline and precision." },
    { name: "Cooking", icon: <FaUtensils />, description: "Experimental process engineering in the kitchen." },
    { name: "Powerlifting", icon: <FaDumbbell />, description: "Tracking physical metrics and linear progression." }
  ];

  const shelf = {
    albums: ["Discovery", "Currents", "Dark Side of the Moon"],
    movies: ["Interstellar", "Blade Runner 2049", "Arrival"],
    books: ["Gödel, Escher, Bach", "Dune", "The Martian"]
  };

  return (
    <div className="container section">
      <AnimateIn delay={0.1}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          <div style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '2.5rem', fontWeight: 800 }}>more about <span style={{ color: 'var(--accent-color)' }}>me</span>.</h1>
            
            <div style={{ borderLeft: '4px solid var(--accent-color)', paddingLeft: '2rem', marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '1.3rem', color: 'var(--text-color)', fontWeight: 600 }}>{meDetails?.description}</p>
            </div>

            {meDetails?.fullDescription?.map((p, idx) => (
              <p key={idx} style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>{p}</p>
            ))}
          </div>

          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ 
              borderRadius: 'var(--radius)', 
              overflow: 'hidden', 
              boxShadow: 'var(--card-shadow)', 
              border: 'var(--card-border)',
              background: '#ffffff'
            }}>
              <img src={meDetails?.image} alt="Yuvraj" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Hobbies Section */}
      <section style={{ marginTop: '10rem' }}>
        <AnimateIn delay={0.2}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 800 }}>hobbies <span style={{ color: 'var(--accent-color)' }}>&</span> interests.</h2>
          <div className="grid grid-3">
            {hobbies.map((hobby, idx) => (
              <div key={idx} style={{ 
                padding: '2.5rem', 
                background: '#ffffff', 
                border: 'var(--card-border)', 
                boxShadow: 'var(--card-shadow)',
                borderRadius: 'var(--radius)'
              }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>{hobby.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{hobby.name}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{hobby.description}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* Media Shelf */}
      <section style={{ marginTop: '10rem', paddingBottom: '15rem' }}>
        <AnimateIn delay={0.3}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '5rem', fontWeight: 800 }}>my <span style={{ color: 'var(--accent-color)' }}>media</span> shelf.</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem' }}>
            {/* Albums Stack */}
            <MediaStack title="Albums" icon={<FaMusic />} items={shelf.albums} />
            
            {/* Movies Stack */}
            <MediaStack title="Movies" icon={<FaFilm />} items={shelf.movies} />
            
            {/* Books Stack */}
            <MediaStack title="Books" icon={<FaBook />} items={shelf.books} />
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}

function MediaStack({ title, icon, items }: { title: string, icon: any, items: string[] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ color: 'var(--accent-color)', fontSize: '1.5rem' }}>{icon}</div>
        <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>{title}</h3>
      </div>
      
      <div style={{ position: 'relative', height: '240px', width: '200px', margin: '0 auto' }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: isHovered ? (i - 1) * 15 : (i - 1) * 5,
              x: isHovered ? (i - 1) * 60 : (i - 1) * 10,
              y: isHovered ? i * 10 : i * 5,
              zIndex: items.length - i
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '180px',
              height: '240px',
              background: '#ffffff',
              border: 'var(--card-border)',
              boxShadow: 'var(--card-shadow)',
              borderRadius: '8px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              transformOrigin: 'bottom center'
            }}
          >
            <div style={{ 
              width: '100%', 
              height: '140px', 
              background: `rgba(27, 98, 143, ${0.1 - i * 0.03})`, 
              borderRadius: '4px',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
               <div style={{ fontSize: '2rem', opacity: 0.2 }}>{icon}</div>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
