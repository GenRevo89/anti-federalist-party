import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { STATES, getStateBySlug } from "@/data/state-requirements";

export async function generateStaticParams() {
  return STATES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};
  return {
    title: `${state.name} Party Formation | Anti-Federalist Party`,
    description: `How to establish the Anti-Federalist Party in ${state.name}. Filing requirements, signature thresholds, deadlines, and key statutes for ${state.abbreviation}.`,
  };
}

const methodInfo: Record<string, { label: string; color: string; desc: string }> = {
  petition: { label: 'Petition', color: '#3B82F6', desc: 'This state requires collecting a specified number of voter signatures on a petition to gain party recognition.' },
  registration: { label: 'Voter Registration', color: '#10B981', desc: 'This state grants party recognition based on the number of voters who register with the party.' },
  convention: { label: 'Convention', color: '#F59E0B', desc: 'This state allows new parties to organize through a founding convention process.' },
  hybrid: { label: 'Hybrid', color: '#8B5CF6', desc: 'This state offers multiple pathways to party recognition — petition, registration, or convention.' },
};

export default async function StateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const m = methodInfo[state.method];

  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* HERO */}
        <section style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <Link href="/documents" style={{ color: '#2EC4B6', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>
                &larr; All Documents
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: m.color, background: `${m.color}15`, padding: '4px 10px', borderRadius: '4px', border: `1px solid ${m.color}30` }}>
                  {m.label} State
                </span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(240,237,230,0.3)', fontFamily: 'monospace' }}>{state.abbreviation}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
                Establishing the Party in <em style={{ fontStyle: 'italic', color: '#2EC4B6' }}>{state.name}</em>
              </h1>
              <div style={{ width: '3rem', height: '2px', background: '#2EC4B6', marginBottom: '1.5rem' }} />
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '1rem', maxWidth: '40rem', lineHeight: 1.8 }}>
                {m.desc}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* REQUIREMENTS */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { label: 'Signature / Registration Requirement', value: state.signatureReq, color: m.color },
                { label: 'Filing Deadline', value: state.filingDeadline, color: '#F59E0B' },
                { label: 'Election Authority', value: state.electionAuthority, color: '#2EC4B6' },
                { label: 'Key Statute', value: state.keyStatute, color: '#8B5CF6' },
                { label: 'Ballot Access Maintenance', value: state.ballotAccess, color: '#3B82F6' },
              ].map((item) => (
                <ScrollReveal key={item.label}>
                  <div style={{ borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,18,0.7)', backdropFilter: 'blur(20px)', overflow: 'hidden' }}>
                    <div style={{ height: '2px', background: item.color }} />
                    <div style={{ padding: '1.5rem 2rem' }}>
                      <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: item.color, marginBottom: '0.5rem' }}>
                        {item.label}
                      </p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#F0EDE6', margin: 0, lineHeight: 1.5 }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* STRATEGIC NOTES */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <div style={{ borderRadius: '1rem', border: '1px solid rgba(46,196,182,0.12)', background: 'rgba(46,196,182,0.03)', backdropFilter: 'blur(20px)', padding: '2rem 2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '0.75rem' }}>Strategic Notes</h2>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>{state.notes}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* REQUIRED DOCUMENTS */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                Documents You Will Need
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'State Formation Packet', file: 'state-formation-packet.pdf', desc: 'Complete filing documentation for state election authority' },
                { title: 'State Committee Bylaws', file: 'state-committee-bylaws.pdf', desc: 'Governing rules for your state coordinating body' },
                ...(state.method === 'petition' || state.method === 'hybrid' ? [{ title: 'Ballot Access Petition', file: 'ballot-access-petition.pdf', desc: 'Signature collection template with circulator affidavit' }] : []),
                ...(state.method === 'convention' || state.method === 'hybrid' ? [{ title: 'Party Constitution', file: 'constitution.pdf', desc: 'Must be adopted at your founding convention' }] : []),
                { title: 'Chapter Charter', file: 'chapter-charter.pdf', desc: 'For local chapters within the state to formalize' },
                { title: 'Candidate Nomination Form', file: 'candidate-nomination.pdf', desc: 'For nominating candidates under the party banner' },
              ].map((d, i) => (
                <ScrollReveal key={d.file} delay={i * 0.05}>
                  <div style={{ borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,18,0.5)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#F0EDE6', margin: '0 0 0.15rem' }}>{d.title}</h3>
                      <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.75rem', margin: 0 }}>{d.desc}</p>
                    </div>
                    <a href={`/documents/${d.file}`} download style={{ flexShrink: 0, padding: '0.5rem 1rem', borderRadius: '0.4rem', background: 'linear-gradient(135deg, #2EC4B6, #0D7377)', color: '#0A0A12', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      Download
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* NAV */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/documents" style={{ color: '#2EC4B6', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>&larr; All Documents</Link>
                <Link href="/chapters" style={{ color: '#2EC4B6', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Find Chapters &rarr;</Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
