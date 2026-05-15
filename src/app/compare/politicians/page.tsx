import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { POLITICIANS } from "@/data/politicians";

export const metadata: Metadata = {
  title: 'Anti-Federalist vs. The Establishment | Politician Comparisons',
  description: 'See exactly where every major American politician stands versus the Anti-Federalist position on the issues that matter most.',
};

export default function PoliticiansIndex() {
  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO ─── */}
        <section style={{ paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.35em', color: '#2EC4B6', marginBottom: '1.5rem' }}>
                The Establishment Record
              </p>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Anti-Federalist vs. <em style={{ fontStyle: 'italic', color: '#2EC4B6' }}>The Establishment</em>
              </h1>
              <div style={{ width: '3rem', height: '2px', background: '#2EC4B6', margin: '0 auto 1.5rem' }} />
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '1.15rem', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7 }}>
                Every major politician in America has consolidated power, expanded government, 
                and served corporate interests. Select any politician below to see a comprehensive 
                breakdown of their record versus the Anti-Federalist position.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── POLITICIAN CARDS ─── */}
        <section style={{ paddingTop: '2rem', paddingBottom: '8rem' }}>
          <div className="content-wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {POLITICIANS.map((pol, i) => (
                <ScrollReveal key={pol.slug} delay={i * 0.1}>
                  <Link href={`/compare/politicians/${pol.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                    <div style={{
                      height: '100%',
                      borderRadius: '1rem',
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(10,10,18,0.7)',
                      backdropFilter: 'blur(20px)',
                      overflow: 'hidden',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
                    }} className="city-card">
                      <div style={{ height: '3px', background: pol.partyColor }} />
                      <div style={{ padding: '2rem 2rem 1.5rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '0.4rem' }}>
                          {pol.name}
                        </h3>
                        <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(240,237,230,0.35)', marginBottom: '1rem' }}>
                          {pol.title}
                        </p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.04)', borderRadius: '999px', padding: '0.3rem 0.75rem', marginBottom: '1rem' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pol.partyColor }} />
                          <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'rgba(240,237,230,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {pol.party}
                          </span>
                        </div>
                        <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                          &ldquo;{pol.tagline}&rdquo;
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#2EC4B6', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                            {pol.issues.length} issues compared
                          </span>
                          <span style={{ color: '#2EC4B6', fontSize: '1.2rem' }}>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
