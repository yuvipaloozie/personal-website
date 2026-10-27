import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: 'var(--card-border)',
      position: 'fixed',
      top: 0,
      zIndex: 1000,
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>
          <Link href="/" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            yuvraj<span style={{ color: 'var(--accent-color)' }}>.</span>tripathy
          </Link>
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem', fontWeight: 600, fontSize: '0.85rem', textTransform: 'lowercase' }}>
          <Link href="/about" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>about</Link>
          <Link href="/projects" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>projects</Link>
          <Link href="/graph" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>knowledge graph</Link>
          <Link href="/resume" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>cv</Link>
          <Link href="/blog" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>notes</Link>
        </nav>
      </div>
    </header>
  );
}

