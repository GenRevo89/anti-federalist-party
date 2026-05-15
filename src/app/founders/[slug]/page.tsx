import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { FOUNDERS } from "@/data/founders";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return FOUNDERS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const founder = FOUNDERS.find(f => f.slug === slug);
  if (!founder) return { title: 'Not Found' };
  return {
    title: `${founder.name} | Anti-Federalist Founder & The Modern Movement`,
    description: `${founder.biography.slice(0, 155)}...`,
  };
}

export default async function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const founder = FOUNDERS.find(f => f.slug === slug);
  if (!founder) notFound();

  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO ─── */}
        <section style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <Link href="/" style={{ color: 'rgba(240,237,230,0.4)', textDecoration: 'none' }}>Home</Link>
                <span style={{ color: 'rgba(240,237,230,0.2)' }}>›</span>
                <Link href="/founders" style={{ color: 'rgba(240,237,230,0.4)', textDecoration: 'none' }}>Founders</Link>
                <span style={{ color: 'rgba(240,237,230,0.2)' }}>›</span>
                <span style={{ color: '#2EC4B6' }}>{founder.name}</span>
              </div>

              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(240,237,230,0.4)', marginBottom: '0.5rem' }}>
                {founder.born}–{founder.died} • {founder.title}
              </p>

              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                {founder.name}
              </h1>
              {founder.penName && (
                <p style={{ fontSize: '0.9rem', color: '#2EC4B6', fontStyle: 'italic', marginBottom: '1rem' }}>
                  Writing as &ldquo;{founder.penName}&rdquo;
                </p>
              )}
              <div style={{ width: '3rem', height: '2px', background: '#2EC4B6', marginBottom: '1.5rem' }} />
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '1.1rem', maxWidth: '48rem', lineHeight: 1.8 }}>
                {founder.biography}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── CONTRIBUTIONS ─── */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '2rem' }}>
                Key Contributions
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {founder.contributions.map((c, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div style={{
                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                    padding: '1.25rem 1.75rem', borderRadius: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.04)',
                    background: 'rgba(10,10,18,0.5)',
                  }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#0A0A12', background: '#2EC4B6', borderRadius: '4px', padding: '3px 8px', flexShrink: 0, marginTop: '3px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p style={{ color: 'rgba(240,237,230,0.7)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{c}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── KEY WRITINGS ─── */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '2rem' }}>
                Key Writings
              </h2>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {founder.keyWritings.map((w, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div style={{
                    borderRadius: '1rem', border: '1px solid rgba(46,196,182,0.1)',
                    background: 'rgba(10,10,18,0.7)', backdropFilter: 'blur(20px)',
                    padding: '2rem', boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
                    height: '100%', display: 'flex', flexDirection: 'column',
                  }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#2EC4B6', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>{w.year}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '1rem', lineHeight: 1.4 }}>{w.title}</h3>
                    <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{w.significance}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MODERN ESSAY ─── */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <div style={{
                borderRadius: '1rem', border: '1px solid rgba(46,196,182,0.12)',
                background: 'rgba(46,196,182,0.03)', backdropFilter: 'blur(20px)',
                overflow: 'hidden', boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
              }}>
                <div style={{ padding: '2rem 2.5rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#2EC4B6', marginBottom: '0.75rem' }}>
                    Speculative Essay
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700, color: '#F0EDE6', lineHeight: 1.3 }}>
                    {founder.modernEssay.title}
                  </h2>
                </div>
                <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
                  {founder.modernEssay.paragraphs.map((p, i) => (
                    <p key={i} style={{
                      color: 'rgba(240,237,230,0.7)', fontSize: '1rem', lineHeight: 1.9,
                      marginBottom: i < founder.modernEssay.paragraphs.length - 1 ? '1.5rem' : 0,
                    }}>{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── NAV ─── */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/founders" style={{ color: '#2EC4B6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  ← All Founders
                </Link>
                <Link href="/compare/parties" style={{ color: '#2EC4B6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  Compare Parties →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
