'use client';

import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { FileText, BookOpen, Users, ClipboardList, Scale, PiggyBank, MapPin, Landmark, Vote, UserCheck, Download, ExternalLink } from 'lucide-react';
import { STATES } from "@/data/state-requirements";

const CORE_DOCUMENTS = [
  { filename: 'constitution.pdf', title: 'Party Constitution', description: 'Twelve-article foundational governing document covering purpose, principles, membership, chapter structure, officers, national organization, meetings, finances, and amendments.', pages: '9', category: 'Governance', icon: BookOpen, color: '#2EC4B6' },
  { filename: 'chapter-charter.pdf', title: 'Chapter Charter', description: 'Fill-in template for local chapters to formally activate. Includes founding member signatures, officer election, operating agreements, and affirmation of principles.', pages: '4', category: 'Activation', icon: Landmark, color: '#F59E0B' },
  { filename: 'activation-guide.pdf', title: 'Chapter Activation Guide', description: 'Five-phase step-by-step playbook for starting a chapter from zero: member recruitment, organizational meeting, formalization, first 90 days, and ongoing operations.', pages: '7', category: 'Activation', icon: MapPin, color: '#F59E0B' },
  { filename: 'membership-application.pdf', title: 'Membership Application', description: 'Individual registration form with personal info, chapter affiliation, principles affirmation, volunteer interest areas, and privacy notice.', pages: '3', category: 'Membership', icon: UserCheck, color: '#8B5CF6' },
  { filename: 'meeting-minutes.pdf', title: 'Meeting Minutes Template', description: 'Standardized proceedings record with attendance, treasurer report, old and new business, motions and votes table, action items, and adjournment.', pages: '5', category: 'Operations', icon: ClipboardList, color: '#3B82F6' },
  { filename: 'resolution-template.pdf', title: 'Resolution Template', description: 'Formal WHEREAS / RESOLVED structure for chapter policy positions with preamble, resolution items, distribution checklist, vote record, and certification.', pages: '4', category: 'Operations', icon: Scale, color: '#3B82F6' },
  { filename: 'treasurer-report.pdf', title: "Treasurer's Report", description: 'Financial accountability template with income and expense detail tables, category breakdown, year-to-date tracking, and compliance certification.', pages: '4', category: 'Finance', icon: PiggyBank, color: '#10B981' },
];

const STATE_DOCUMENTS = [
  { filename: 'state-formation-packet.pdf', title: 'State Formation Packet', description: 'Complete filing documentation for state-level party recognition. Includes statement of organization, principles adoption, financial disclosure, petition and convention certification, and submission checklist.', pages: '7', icon: FileText, color: '#EF4444' },
  { filename: 'state-committee-bylaws.pdf', title: 'State Committee Bylaws', description: 'Governing rules for the state coordinating body covering composition, officers, meetings, candidate endorsement, finances, amendments, and dissolution.', pages: '6', icon: BookOpen, color: '#EF4444' },
  { filename: 'ballot-access-petition.pdf', title: 'Ballot Access Petition', description: 'Standardized petition template with signature collection table, circulator affidavit, and notarization block. Adaptable to state-specific format requirements.', pages: '4', icon: Vote, color: '#EF4444' },
  { filename: 'candidate-nomination.pdf', title: 'Candidate Nomination Form', description: 'Official nomination form for candidates seeking party endorsement. Covers candidate information, principles affirmation, qualifications, and endorsement request.', pages: '4', icon: Users, color: '#EF4444' },
];

function DocumentCard({ doc, i }: { doc: typeof CORE_DOCUMENTS[0]; i: number }) {
  const Icon = doc.icon;
  return (
    <ScrollReveal delay={i * 0.06}>
      <div style={{
        height: '100%', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10,10,18,0.7)', backdropFilter: 'blur(20px)',
        overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${doc.color}, ${doc.color}88)` }} />
        <div style={{ padding: '2rem 2rem 1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flexShrink: 0, width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: `${doc.color}15`, border: `1px solid ${doc.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={18} color={doc.color} strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#F0EDE6', margin: '0 0 0.25rem' }}>{doc.title}</h3>
              <span style={{ fontSize: '0.6rem', color: 'rgba(240,237,230,0.3)' }}>{doc.pages} pages &bull; PDF</span>
            </div>
          </div>
          <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.82rem', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>{doc.description}</p>
          <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
            <a href={`/documents/${doc.filename}`} download style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem 1rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #2EC4B6, #0D7377)', color: '#0A0A12', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', textDecoration: 'none' }}>
              <Download size={13} strokeWidth={2.5} /> Download
            </a>
            <a href={`/documents/${doc.filename}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem 1rem', borderRadius: '0.5rem', background: 'transparent', border: '1px solid rgba(46,196,182,0.3)', color: '#2EC4B6', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', textDecoration: 'none' }}>
              <ExternalLink size={13} strokeWidth={2.5} /> Preview
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

const methodLabels: Record<string, { label: string; color: string }> = {
  petition: { label: 'Petition', color: '#3B82F6' },
  registration: { label: 'Registration', color: '#10B981' },
  convention: { label: 'Convention', color: '#F59E0B' },
  hybrid: { label: 'Hybrid', color: '#8B5CF6' },
};

export default function DocumentsPage() {
  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* HERO */}
        <section style={{ paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.35em', color: '#2EC4B6', marginBottom: '1.5rem' }}>Official Party Documents</p>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Everything You Need to <em style={{ fontStyle: 'italic', color: '#2EC4B6' }}>Activate</em>
              </h1>
              <div style={{ width: '3rem', height: '2px', background: '#2EC4B6', margin: '0 auto 1.5rem' }} />
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '1.1rem', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.8 }}>
                Download the complete organizational document suite. From the party constitution to state formation packets
                — everything a chapter needs to activate, operate, and file for official recognition.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CORE DOCUMENTS */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '2rem' }}>
                Core Chapter Documents
              </h2>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {CORE_DOCUMENTS.map((doc, i) => <DocumentCard key={doc.filename} doc={doc} i={i} />)}
            </div>
          </div>
        </section>

        {/* STATE-LEVEL DOCUMENTS */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #EF4444', paddingLeft: '1rem', marginBottom: '0.5rem' }}>
                State-Level Filing Documents
              </h2>
              <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.85rem', marginBottom: '2rem', maxWidth: '36rem', paddingLeft: '1rem', marginLeft: '3px' }}>
                Templates for establishing the party at the state level. Adapt these to your state&apos;s specific requirements.
              </p>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {STATE_DOCUMENTS.map((doc, i) => <DocumentCard key={doc.filename} doc={doc} i={i} />)}
            </div>
          </div>
        </section>

        {/* HOW TO START */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <div style={{ borderRadius: '1rem', border: '1px solid rgba(46,196,182,0.12)', background: 'rgba(46,196,182,0.03)', backdropFilter: 'blur(20px)', padding: '2.5rem', boxShadow: '0 4px 40px rgba(0,0,0,0.3)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '1.25rem' }}>How to Start a Chapter in 4 Steps</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  {[
                    { step: '01', title: 'Read', desc: 'Download and read the Party Constitution and the Activation Guide.' },
                    { step: '02', title: 'Gather', desc: 'Find 5 people in your county who share Anti-Federalist principles.' },
                    { step: '03', title: 'Charter', desc: 'Hold your organizational meeting, elect officers, and sign the Chapter Charter.' },
                    { step: '04', title: 'Submit', desc: 'Email your signed charter to chapters@anti-federalists.com.' },
                  ].map((s) => (
                    <div key={s.step}>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#0A0A12', background: '#2EC4B6', borderRadius: '4px', padding: '3px 8px' }}>{s.step}</span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#F0EDE6', margin: '0.5rem 0 0.25rem' }}>{s.title}</h3>
                      <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* STATE REQUIREMENTS DIRECTORY */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #F59E0B', paddingLeft: '1rem', marginBottom: '0.5rem' }}>
                State-by-State Filing Requirements
              </h2>
              <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.85rem', marginBottom: '2rem', maxWidth: '44rem', paddingLeft: '1rem', marginLeft: '3px' }}>
                Party formation is a state-level process. Every state has different requirements. Find yours below.
              </p>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {STATES.map((state, i) => {
                const m = methodLabels[state.method];
                return (
                  <ScrollReveal key={state.slug} delay={i * 0.02}>
                    <Link href={`/documents/states/${state.slug}`} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                      <div className="city-card" style={{ borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,18,0.6)', backdropFilter: 'blur(16px)', padding: '1.25rem 1.5rem', cursor: 'pointer', transition: 'all 0.3s ease', height: '100%', minHeight: '8.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#F0EDE6', margin: 0 }}>{state.name}</h3>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(240,237,230,0.25)', fontFamily: 'monospace' }}>{state.abbreviation}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: m.color, background: `${m.color}15`, padding: '2px 6px', borderRadius: '3px', border: `1px solid ${m.color}30` }}>{m.label}</span>
                        </div>
                        <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.72rem', lineHeight: 1.5, margin: 0, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{state.signatureReq}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONSTITUTION PREVIEW */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '2rem' }}>Preview: Party Constitution</h2>
              <div style={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.3)', background: 'rgba(10,10,18,0.7)' }}>
                <iframe src="/documents/constitution.pdf" style={{ width: '100%', height: '80vh', border: 'none' }} title="Party Constitution Preview" />
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
