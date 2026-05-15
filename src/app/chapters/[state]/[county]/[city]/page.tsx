import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { JSX } from 'react';

export const dynamicParams = true;

export async function generateStaticParams() {
  // To keep build times fast, we rely on ISR (on-demand generation) for all 30k+ cities.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ state: string, county: string, city: string }> }): Promise<Metadata> {
  const { state, county, city } = await params;
  const citiesPath = path.join(process.cwd(), 'src/data/all-cities.json');
  const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
  const cityData = cities.find((c: any) => c.slug === city && c.countySlug === county && c.state === state);

  if (!cityData) return { title: 'Not Found' };

  return {
    title: `Anti-Federalist Party in ${cityData.name}, ${cityData.stateName}`,
    description: `Join the Anti-Federalist movement in ${cityData.name}, ${cityData.stateName}. We are building local political power to restore access, agency, and accountability in your municipality.`,
  };
}

const ACTION_ITEMS = [
  { icon: 'shield', title: 'Civic Auditing Boards', desc: 'Organize independent oversight of local municipal spending and decision-making to ensure transparency.' },
  { icon: 'vote', title: 'Anti-Federalist Candidates', desc: 'Recruit and support candidates for mayor and city council who uphold our principles.' },
  { icon: 'database', title: 'Data Sovereignty Ordinances', desc: 'Push for city-level protections ensuring residents own their digital data and algorithmic transparency is enforced.' },
  { icon: 'wifi', title: 'Community Broadband', desc: 'Establish public broadband infrastructure as a utility, ensuring universal internet access regardless of income.' },
];

const INVOLVEMENT = [
  { icon: 'megaphone', title: 'Chapter Leader', desc: 'Organize monthly meetings, coordinate with county leadership, and recruit local members.' },
  { icon: 'clipboard', title: 'Policy Drafter', desc: 'Research and draft city-level policy proposals aligned with Anti-Federalist principles.' },
  { icon: 'users', title: 'Community Organizer', desc: 'Build coalitions with local organizations, plan public events, and drive voter registration.' },
  { icon: 'flag', title: 'Run for Office', desc: 'We support Anti-Federalist candidates at every municipal level.' },
];

function ActionIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    vote: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    database: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
    wifi: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>,
    megaphone: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>,
    clipboard: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>,
    users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    flag: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>,
  };
  return <span className="county-action-icon">{icons[type] || icons.shield}</span>;
}

// Deterministic paper selection based on city name hash
function getCityPaper(cityName: string, papers: any[]) {
  const papersWithContent = papers.filter((p: any) => p.content && !p.content.includes('high-fidelity digitization'));
  if (papersWithContent.length === 0) return null;
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) hash = ((hash << 5) - hash + cityName.charCodeAt(i)) | 0;
  return papersWithContent[Math.abs(hash) % papersWithContent.length];
}

export default async function CityPage({ params }: { params: Promise<{ state: string, county: string, city: string }> }) {
  const { state, county, city } = await params;
  const citiesPath = path.join(process.cwd(), 'src/data/all-cities.json');
  const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
  const cityData = cities.find((c: any) => c.slug === city && c.countySlug === county && c.state === state);

  if (!cityData) return <div style={{ color: 'white', textAlign: 'center', marginTop: '8rem' }}>City not found</div>;

  const countiesPath = path.join(process.cwd(), 'src/data/all-counties.json');
  const counties = JSON.parse(fs.readFileSync(countiesPath, 'utf8'));
  const countyData = counties.find((c: any) => c.slug === county && c.state === state);

  // Load a featured Anti-Federalist paper for this city
  const papersPath = path.join(process.cwd(), 'src/data/papers.json');
  let featuredPaper: any = null;
  try {
    const papers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));
    featuredPaper = getCityPaper(cityData.name, papers);
  } catch (e) { }

  return (
    <SceneWrapper theme="county">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO ─── */}
        <section className="county-hero">
          <div className="county-hero-image-wrap">
            <Image
              src="/images/county-hero.png"
              alt={`${cityData.name} town hall`}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
            <div className="county-hero-overlay" />
          </div>
          <div className="county-hero-content">
            <ScrollReveal>
              <p className="section-label" style={{ marginBottom: '1rem' }}>Local Chapter</p>
              <h1 className="county-hero-title">{cityData.name}</h1>
              <div className="county-hero-state">{countyData ? countyData.name + " County, " : ""}{cityData.stateName} • Anti-Federalist Party</div>
              <hr className="hero-divider" />
              <p className="county-hero-subtitle">
                The founders intended for power to reside here — in the municipalities of {cityData.name},
                not in distant capitals. This is where the work happens.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── BREADCRUMB ─── */}
        <div className="chapters-breadcrumb">
          <div className="content-wrap">
            <Link href="/" className="chapters-breadcrumb-link">Home</Link>
            <span className="chapters-breadcrumb-sep">›</span>
            <Link href="/chapters" className="chapters-breadcrumb-link">Chapters</Link>
            <span className="chapters-breadcrumb-sep">›</span>
            <Link href={`/chapters/${state}`} className="chapters-breadcrumb-link">{cityData.stateName}</Link>
            <span className="chapters-breadcrumb-sep">›</span>
            <Link href={`/chapters/${state}/${county}`} className="chapters-breadcrumb-link">{countyData ? countyData.name : county}</Link>
            <span className="chapters-breadcrumb-sep">›</span>
            <span className="chapters-breadcrumb-current">{cityData.name}</span>
          </div>
        </div>

        {/* ─── MISSION STATEMENT ─── */}
        <section className="section pt-16 pb-8">
          <div className="content-wrap-sm text-center">
            <ScrollReveal>
              <div className="county-mission-card">
                <div className="county-mission-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h2 className="county-mission-title">Our Mission in {cityData.name}</h2>
                <p className="county-mission-text">
                  We believe that the most effective governance happens closest to the people.
                  The {cityData.name} chapter works to ensure every resident has direct access
                  to their municipal government, meaningful agency over their future, and the ability to hold
                  all power — public, corporate, and algorithmic — accountable.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── LOCAL ACTION PLAN ─── */}
        <section className="section pt-8 pb-8">
          <div className="content-wrap">
            <div className="text-center mb-12">
              <ScrollReveal>
                <p className="section-label">Strategic Priorities</p>
                <h2 className="section-title">Local Action Plan</h2>
                <hr className="section-divider" style={{ margin: '0 auto' }} />
              </ScrollReveal>
            </div>
            <div className="county-action-grid">
              {ACTION_ITEMS.map((item, i) => (
                <ScrollReveal key={item.title} delay={i + 1}>
                  <div className="county-action-card">
                    <ActionIcon type={item.icon} />
                    <h3 className="county-action-title">{item.title}</h3>
                    <p className="county-action-desc">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURED WRITING ─── */}
        {featuredPaper && (
          <section className="section pt-8 pb-8">
            <div className="content-wrap-sm">
              <ScrollReveal>
                <div className="county-featured-paper">
                  <div className="county-featured-header">
                    <span className="county-featured-label">From the Anti-Federalist Archive</span>
                    <h3 className="county-featured-title">{featuredPaper.title}</h3>
                    <span className="county-featured-author">{featuredPaper.author} &bull; {featuredPaper.date}</span>
                  </div>
                  <div className="county-featured-excerpt">
                    {featuredPaper.content.substring(0, 800).replace(/\n/g, ' ').trim()}&hellip;
                  </div>
                  <Link href={`/library/papers/${featuredPaper.id}`} className="county-featured-link">
                    Read the full document →
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ─── GET INVOLVED ─── */}
        <section className="section pt-16 pb-16">
          <div className="content-wrap">
            <div className="text-center mb-12">
              <ScrollReveal>
                <p className="section-label">Join The Vanguard</p>
                <h2 className="section-title">Get Involved in {cityData.name}</h2>
                <hr className="section-divider" style={{ margin: '0 auto' }} />
                <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
                  We are actively recruiting leaders and candidates in {cityData.name}. Every role matters.
                </p>
              </ScrollReveal>
            </div>
            <div className="county-involve-grid">
              {INVOLVEMENT.map((item, i) => (
                <ScrollReveal key={item.title} delay={i + 1}>
                  <div className="county-involve-card">
                    <ActionIcon type={item.icon} />
                    <h3 className="county-involve-title">{item.title}</h3>
                    <p className="county-involve-desc">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="chapters-cta-band">
          <ScrollReveal>
            <div className="county-final-cta">
              <h3 className="chapters-cta-title">Ready to make a difference in {cityData.name}?</h3>
              <p className="chapters-cta-desc">Join the movement. Start by signing up for our national platform and connecting with your local chapter leadership.</p>
              <div className="county-cta-buttons">
                <a href="/#join" className="btn-primary">
                  Join the Movement
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <Link href={`/chapters/${state}/${county}`} className="btn-ghost">
                  ← Back to {countyData ? countyData.name : county} County
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
