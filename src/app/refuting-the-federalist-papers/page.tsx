import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { REFUTATIONS } from "@/data/refutations";

export const metadata: Metadata = {
  title: 'Refuting the Federalist Papers | 235 Years of Evidence',
  description: 'A systematic, evidence-based refutation of the Federalist Papers. Hamilton and Madison made brilliant arguments. History proved them wrong. Here is the evidence.',
};

export default function RefutingFederalistPapers() {
  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO ─── */}
        <section style={{ paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.35em', color: '#EF4444', marginBottom: '1.5rem' }}>
                The Case Against
              </p>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Refuting the <em style={{ fontStyle: 'italic', color: '#EF4444' }}>Federalist Papers</em>
              </h1>
              <div style={{ width: '3rem', height: '2px', background: '#EF4444', margin: '0 auto 1.5rem' }} />
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '1.15rem', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.8 }}>
                Hamilton, Madison, and Jay wrote 85 essays arguing that the Constitution would
                prevent tyranny, protect liberty, and preserve the republic. They were brilliant.
                They were persuasive. And 235 years of evidence have proven them wrong.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── PREAMBLE ─── */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <div style={{
                borderRadius: '1rem', border: '1px solid rgba(239,68,68,0.15)',
                background: 'rgba(239,68,68,0.04)', backdropFilter: 'blur(20px)',
                padding: '2.5rem', boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
              }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '1.25rem' }}>
                  A Note on Intellectual Honesty
                </h2>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                  The Federalist Papers are among the most important political documents ever written.
                  Hamilton and Madison were genuine intellectual giants. Their arguments were not stupid — they were wrong.
                  There is a difference. Stupid arguments do not require refutation. Brilliant arguments that produced
                  catastrophic results require careful, evidence-based dismantling.
                </p>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                  We do not refute the Federalist Papers out of disrespect. We refute them because they are still cited —
                  by the Supreme Court, by politicians, by constitutional scholars — as if 235 years of evidence
                  does not exist. The Federalist Papers are treated as sacred text. We treat them as hypotheses.
                  And we test them against the evidence.
                </p>
                <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.85rem', lineHeight: 1.8, fontStyle: 'italic' }}>
                  For each paper below, we present: the original argument, why it mattered in 1787,
                  why it failed, the modern evidence, and the Anti-Federalist response that history has vindicated.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── REFUTATIONS ─── */}
        <section style={{ paddingBottom: '5rem' }}>
          <div className="content-wrap-md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {REFUTATIONS.map((r, i) => (
                <ScrollReveal key={r.number} delay={i * 0.05}>
                  <article style={{
                    borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(10,10,18,0.7)', backdropFilter: 'blur(20px)',
                    overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
                  }}>
                    {/* Header */}
                    <div style={{ padding: '2rem 2.5rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                      <div style={{
                        flexShrink: 0, width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem',
                        background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
                        border: '1px solid rgba(239,68,68,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#EF4444',
                      }}>
                        #{r.number}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(240,237,230,0.3)', marginBottom: '0.25rem' }}>
                          {r.author}
                        </p>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#F0EDE6', lineHeight: 1.3, margin: 0 }}>
                          {r.title}
                        </h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
                      {/* Original Argument */}
                      <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(240,237,230,0.35)', marginBottom: '0.5rem' }}>
                          The Argument
                        </p>
                        <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.92rem', lineHeight: 1.8 }}>{r.originalArgument}</p>
                      </div>

                      {/* Why It Mattered */}
                      <div style={{ marginBottom: '2rem', padding: '1.25rem 1.5rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid rgba(240,237,230,0.15)' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(240,237,230,0.35)', marginBottom: '0.5rem' }}>
                          Why It Mattered in 1787
                        </p>
                        <p style={{ color: 'rgba(240,237,230,0.55)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{r.whyItMattered}</p>
                      </div>

                      {/* Why It Failed */}
                      <div style={{ marginBottom: '2rem', padding: '1.25rem 1.5rem', borderRadius: '0.5rem', background: 'rgba(239,68,68,0.04)', borderLeft: '3px solid #EF4444' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#EF4444', marginBottom: '0.5rem' }}>
                          Why It Failed
                        </p>
                        <p style={{ color: 'rgba(240,237,230,0.65)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{r.whyItFailed}</p>
                      </div>

                      {/* Modern Reality */}
                      <div style={{ marginBottom: '2rem', padding: '1.25rem 1.5rem', borderRadius: '0.5rem', background: 'rgba(245,158,11,0.04)', borderLeft: '3px solid #F59E0B' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F59E0B', marginBottom: '0.5rem' }}>
                          The Modern Reality
                        </p>
                        <p style={{ color: 'rgba(240,237,230,0.65)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{r.modernReality}</p>
                      </div>

                      {/* Anti-Federalist Response */}
                      <div style={{ padding: '1.25rem 1.5rem', borderRadius: '0.5rem', background: 'rgba(46,196,182,0.04)', borderLeft: '3px solid #2EC4B6' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#2EC4B6', marginBottom: '0.5rem' }}>
                          The Anti-Federalist Response
                        </p>
                        <p style={{ color: 'rgba(240,237,230,0.65)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{r.antiFederalistResponse}</p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONCLUSION ─── */}
        <section style={{ paddingBottom: '3rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <div style={{
                borderRadius: '1rem', border: '1px solid rgba(46,196,182,0.15)',
                background: 'rgba(46,196,182,0.04)', backdropFilter: 'blur(20px)',
                padding: '2.5rem', boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
              }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '1.25rem' }}>
                  The Verdict: 235 Years of Evidence
                </h2>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                  The Federalist Papers argued that a large republic with separated powers, an energetic executive,
                  and an independent judiciary would prevent tyranny and protect liberty. The evidence is in.
                  The large republic produced a two-party monopoly. The separated powers collapsed under partisan loyalty.
                  The energetic executive became an elected monarch. The independent judiciary became an unaccountable
                  super-legislature. And the Bill of Rights — which Hamilton called unnecessary — turned out to be the
                  only thing preventing total federal domination.
                </p>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                  The Anti-Federalists were right about every structural prediction they made. Not approximately right.
                  Not directionally right. Precisely, specifically, prophetically right. Brutus predicted judicial
                  supremacy. Cato predicted the imperial presidency. Patrick Henry predicted that the taxation power would
                  be abused. George Mason predicted that the absence of a Bill of Rights would enable tyranny.
                  The Federal Farmer predicted aristocratic capture of Congress. Every prediction came true.
                </p>
                <p style={{ color: 'rgba(240,237,230,0.65)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 600 }}>
                  The Federalist Papers were brilliant arguments for a system that failed.
                  The Anti-Federalist Papers were prophetic warnings about exactly how it would fail.
                  The modern Anti-Federalist Party exists because the warnings were ignored.
                  We are here to finally listen.
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
                <Link href="/library/papers" style={{ color: '#2EC4B6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  ← Read the Anti-Federalist Papers
                </Link>
                <Link href="/founders" style={{ color: '#2EC4B6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  Meet the Founders →
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
