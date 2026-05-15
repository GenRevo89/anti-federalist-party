import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { POLITICIANS } from "@/data/politicians";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return POLITICIANS.map((p) => ({ politician: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ politician: string }> }): Promise<Metadata> {
  const { politician: slug } = await params;
  const pol = POLITICIANS.find(p => p.slug === slug);
  if (!pol) return { title: 'Not Found' };
  return {
    title: `Anti-Federalist vs. ${pol.name} | The Establishment Record`,
    description: `A comprehensive comparison between the Anti-Federalist Party and ${pol.name} (${pol.party}) on ${pol.issues.length} critical issues.`,
  };
}

export default async function PoliticianPage({ params }: { params: Promise<{ politician: string }> }) {
  const { politician: slug } = await params;
  const pol = POLITICIANS.find(p => p.slug === slug);
  if (!pol) notFound();

  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO ─── */}
        <section style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              {/* Breadcrumb */}
              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <Link href="/" style={{ color: 'rgba(240,237,230,0.4)', textDecoration: 'none' }}>Home</Link>
                <span style={{ color: 'rgba(240,237,230,0.2)' }}>›</span>
                <Link href="/compare/politicians" style={{ color: 'rgba(240,237,230,0.4)', textDecoration: 'none' }}>Politicians</Link>
                <span style={{ color: 'rgba(240,237,230,0.2)' }}>›</span>
                <span style={{ color: '#2EC4B6' }}>{pol.name}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.04)', borderRadius: '999px', padding: '0.35rem 0.85rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: pol.partyColor }} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(240,237,230,0.5)' }}>
                    {pol.party}
                  </span>
                </div>
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                Anti-Federalist vs. <span style={{ color: pol.partyColor }}>{pol.name}</span>
              </h1>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,237,230,0.4)', marginBottom: '1.5rem' }}>
                {pol.title}
              </p>
              <div style={{ width: '3rem', height: '2px', background: '#2EC4B6', marginBottom: '1.5rem' }} />
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '1.1rem', maxWidth: '48rem', lineHeight: 1.8 }}>
                {pol.description}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── ISSUE BREAKDOWN ─── */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '2.5rem' }}>
                The Record
              </h2>
            </ScrollReveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {pol.issues.map((issue, i) => (
                <ScrollReveal key={issue.topic} delay={i * 0.05}>
                  <div style={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(10,10,18,0.7)',
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
                  }}>
                    {/* Issue Header */}
                    <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#0A0A12', background: '#2EC4B6', borderRadius: '4px', padding: '3px 8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#F0EDE6', margin: 0 }}>
                        {issue.topic}
                      </h3>
                    </div>

                    {/* Two Column Comparison */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '1px' }}>
                      {/* Their Position */}
                      <div style={{ padding: '1.75rem 2rem', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: pol.partyColor, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(240,237,230,0.35)' }}>
                            {pol.name}&apos;s Record
                          </span>
                        </div>
                        <p style={{ color: 'rgba(240,237,230,0.55)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                          {issue.them}
                        </p>
                      </div>

                      {/* Our Position */}
                      <div style={{ padding: '1.75rem 2rem', background: 'rgba(46,196,182,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2EC4B6', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#2EC4B6' }}>
                            Anti-Federalist Position
                          </span>
                        </div>
                        <p style={{ color: '#F0EDE6', fontSize: '0.9rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                          {issue.us}
                        </p>
                      </div>
                    </div>

                    {/* Analysis */}
                    <div style={{ padding: '1.25rem 2rem', borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.2)' }}>
                      <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.82rem', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                        {issue.detail}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VERDICT ─── */}
        <section style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className="content-wrap-sm">
            <ScrollReveal>
              <div style={{
                borderRadius: '1rem',
                border: '1px solid rgba(46,196,182,0.15)',
                background: 'rgba(46,196,182,0.04)',
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
              }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#2EC4B6', marginBottom: '1rem' }}>
                  The Verdict
                </p>
                <p style={{ color: '#F0EDE6', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                  {pol.verdict}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── NAV ─── */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/compare/politicians" style={{ color: '#2EC4B6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  ← All Politician Comparisons
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
