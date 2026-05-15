import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { FOUNDERS } from "@/data/founders";

export const metadata: Metadata = {
  title: 'The Anti-Federalist Founders | The Architects of American Liberty',
  description: 'Meet the founding fathers who demanded the Bill of Rights, warned about federal tyranny, and built the intellectual foundation for the modern Anti-Federalist movement.',
};

function FounderCard({ founder, i }: { founder: typeof FOUNDERS[0]; i: number }) {
  return (
    <ScrollReveal delay={i * 0.1}>
      <Link href={`/founders/${founder.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
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
          <div style={{ height: '3px', background: founder.category === 'anti-federalist' ? 'linear-gradient(90deg, #2EC4B6, #0D7377)' : 'linear-gradient(90deg, #F59E0B, #D97706)' }} />
          <div style={{ padding: '2rem 2rem 1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#F0EDE6', margin: 0 }}>
                {founder.name}
              </h3>
              <span style={{ fontSize: '0.6rem', color: 'rgba(240,237,230,0.3)', fontFamily: 'monospace' }}>
                {founder.born}–{founder.died}
              </span>
            </div>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(240,237,230,0.35)', marginBottom: '0.25rem' }}>
              {founder.title}
            </p>
            {founder.penName && (
              <p style={{ fontSize: '0.6rem', fontWeight: 600, color: '#2EC4B6', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                Writing as &ldquo;{founder.penName}&rdquo;
              </p>
            )}
            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.75rem 0' }} />
            <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', fontStyle: 'italic' }}>
              &ldquo;{founder.tagline}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#2EC4B6', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Read the essay →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default function FoundersIndex() {
  const antiFederalists = FOUNDERS.filter(f => f.category === 'anti-federalist');
  const persuaded = FOUNDERS.filter(f => f.category === 'persuaded');

  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO ─── */}
        <section style={{ paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.35em', color: '#2EC4B6', marginBottom: '1.5rem' }}>
                The Intellectual Lineage
              </p>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                The <em style={{ fontStyle: 'italic', color: '#2EC4B6' }}>Founders</em>
              </h1>
              <div style={{ width: '3rem', height: '2px', background: '#2EC4B6', margin: '0 auto 1.5rem' }} />
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '1.15rem', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.8 }}>
                They did not sign the Constitution. They did something more important — they demanded the Bill of Rights.
                Without these voices, there would be no First Amendment, no Second Amendment, no Fourth Amendment.
                They are the reason you have rights at all.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── ANTI-FEDERALIST FOUNDERS ─── */}
        <section style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '0.75rem' }}>
                The Anti-Federalist Founders
              </h2>
              <p style={{ color: 'rgba(240,237,230,0.45)', fontSize: '0.9rem', marginBottom: '2.5rem', maxWidth: '36rem', paddingLeft: '1rem', marginLeft: '3px' }}>
                The voices who opposed the Constitution, demanded the Bill of Rights, and predicted every failure of centralized power.
              </p>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {antiFederalists.map((founder, i) => (
                <FounderCard key={founder.slug} founder={founder} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── PERSUADED FOUNDERS ─── */}
        <section style={{ paddingTop: '2rem', paddingBottom: '8rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #F59E0B', paddingLeft: '1rem', marginBottom: '0.75rem' }}>
                The Founders Who Would Have Joined Us
              </h2>
              <p style={{ color: 'rgba(240,237,230,0.45)', fontSize: '0.9rem', marginBottom: '2.5rem', maxWidth: '42rem', paddingLeft: '1rem', marginLeft: '3px' }}>
                These founders had Anti-Federalist instincts but were persuaded by Hamilton and Madison&apos;s arguments.
                History proved the Anti-Federalists right. What would these founders think now?
              </p>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {persuaded.map((founder, i) => (
                <FounderCard key={founder.slug} founder={founder} i={i} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
