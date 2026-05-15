import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import ChaptersMap from "@/components/ChaptersMap";

export async function generateStaticParams() {
  const statesPath = path.join(process.cwd(), 'src/data/all-states.json');
  try {
    const statesData = JSON.parse(fs.readFileSync(statesPath, 'utf8'));
    return statesData.map((s: any) => ({ state: s.code }));
  } catch (e) {
    return [{ state: 'nm' }];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const statesPath = path.join(process.cwd(), 'src/data/all-states.json');
  let stateName = state.toUpperCase();
  try {
    const statesData = JSON.parse(fs.readFileSync(statesPath, 'utf8'));
    const found = statesData.find((s: any) => s.code === state.toLowerCase());
    if (found) stateName = found.name;
  } catch (e) {}
  
  return {
    title: `Anti-Federalist Chapters | ${stateName}`,
    description: `Discover and join local Anti-Federalist Party chapters in ${stateName}. Find your county and get involved in restoring local governance.`,
  };
}

export default async function StateIndexPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const stateCode = state.toLowerCase();
  
  const statesPath = path.join(process.cwd(), 'src/data/all-states.json');
  let stateName = state.toUpperCase();
  try {
    const statesData = JSON.parse(fs.readFileSync(statesPath, 'utf8'));
    const foundState = statesData.find((s: any) => s.code === stateCode);
    if (foundState) stateName = foundState.name;
  } catch (e) {}
  
  const countiesPath = path.join(process.cwd(), 'src/data/all-counties.json');
  let counties: any[] = [];
  try {
    const allCounties = JSON.parse(fs.readFileSync(countiesPath, 'utf8'));
    counties = allCounties.filter((c: any) => c.state === stateCode);
    counties.sort((a: any, b: any) => a.name.localeCompare(b.name));
  } catch (e) {
    return <div className="text-white text-center mt-32">State chapters not found or not yet active.</div>;
  }

  const isHQ = stateCode === 'nm';
  const firstLetter = stateName.charAt(0);

  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO ─── */}
        <section className="state-hero">
          <div className="state-hero-bg">
            <Image
              src="/images/chapters-hero.png"
              alt={`${stateName} chapter network`}
              fill
              priority
              style={{ objectFit: 'cover', opacity: 0.25 }}
            />
            <div className="state-hero-gradient" />
          </div>
          <div className="state-hero-content">
            <ScrollReveal>
              <div className="state-hero-letter">{firstLetter}</div>
              <p className="section-label" style={{ marginBottom: '1rem' }}>
                {isHQ ? '★ National Headquarters' : 'State Chapter'}
              </p>
              <h1 className="state-hero-title">{stateName}</h1>
              <hr className="hero-divider" />
              <p className="state-hero-subtitle">
                {counties.length} counties organizing for access, agency, and accountability. 
                Select your county below to connect with your local chapter.
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
            <span className="chapters-breadcrumb-current">{stateName}</span>
          </div>
        </div>

        {/* ─── COUNTY STATS ─── */}
        <section className="chapters-stats-bar" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <ScrollReveal>
            <div className="chapters-stats-inner">
              <div className="chapters-stat">
                <div className="chapters-stat-num">{counties.length}</div>
                <div className="chapters-stat-label">Counties</div>
              </div>
              <div className="chapters-stat-divider" />
              <div className="chapters-stat">
                <div className="chapters-stat-num">Active</div>
                <div className="chapters-stat-label">Organizing Status</div>
              </div>
              <div className="chapters-stat-divider" />
              <div className="chapters-stat">
                <div className="chapters-stat-num">{stateCode.toUpperCase()}</div>
                <div className="chapters-stat-label">State Code</div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ─── INTERACTIVE MAP (ZOOMED) ─── */}
        <section className="section pt-4 pb-4">
          <div className="content-wrap-sm">
            <ScrollReveal>
              <div className="chapters-map-section">
                <div className="chapters-map-header">
                  <h2 className="chapters-map-title">{stateName} on the Map</h2>
                  <p className="chapters-map-desc">Auto-zoomed to {stateName} &bull; Click another state to navigate</p>
                </div>
                <ChaptersMap selectedState={stateCode} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── FEATURED READINGS ─── */}
        {(() => {
          const papersPath = path.join(process.cwd(), 'src/data/papers.json');
          try {
            const allPapers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));
            const papersWithContent = allPapers.filter((p: any) => p.content && !p.content.includes('high-fidelity digitization'));
            if (papersWithContent.length === 0) return null;
            // Deterministic selection based on state code
            let hash = 0;
            for (let i = 0; i < stateCode.length; i++) hash = ((hash << 5) - hash + stateCode.charCodeAt(i)) | 0;
            const start = Math.abs(hash) % papersWithContent.length;
            const featured = [
              papersWithContent[start % papersWithContent.length],
              papersWithContent[(start + 1) % papersWithContent.length],
              papersWithContent[(start + 2) % papersWithContent.length],
            ];
            return (
              <section className="section pt-8 pb-8">
                <div className="content-wrap">
                  <div className="text-center mb-12">
                    <ScrollReveal>
                      <p className="section-label" style={{ color: 'var(--gold)' }}>Know Your Roots</p>
                      <h2 className="section-title">Featured Anti-Federalist Writings</h2>
                      <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
                        The warnings that shaped our movement. Read the original documents that predicted the concentration of power.
                      </p>
                    </ScrollReveal>
                  </div>
                  <div className="library-papers-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {featured.map((paper: any, i: number) => {
                      const preview = paper.content.substring(0, 180).replace(/\n/g, ' ').trim() + '…';
                      return (
                        <ScrollReveal key={paper.id} delay={i + 1}>
                          <Link href={`/library/papers/${paper.id}`} className="block h-full">
                            <div className="library-paper-card" style={{ '--accent': 'var(--gold)' } as React.CSSProperties}>
                              <div className="library-paper-card-header">
                                <span className="library-paper-card-num" style={{ color: 'var(--gold)' }}>
                                  #{paper.id.split('-').pop()}
                                </span>
                                <span className="library-paper-card-date">{paper.date}</span>
                              </div>
                              <h3 className="library-paper-card-title">{paper.title}</h3>
                              <p className="library-paper-card-desc">{preview}</p>
                              <div className="library-paper-card-footer">
                                <span className="library-paper-card-words">{paper.content.split(/\s+/).length.toLocaleString()} words</span>
                                <span className="library-paper-card-read" style={{ color: 'var(--gold)', opacity: 1 }}>Read →</span>
                              </div>
                            </div>
                          </Link>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          } catch (e) { return null; }
        })()}

        {/* ─── COUNTY GRID ─── */}
        <section className="section pt-8 pb-32">
          <div className="content-wrap">
            <div className="text-center mb-12">
              <ScrollReveal>
                <h2 className="section-title">County Chapters</h2>
                <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
                  Click your county to see the local action plan and join the vanguard.
                </p>
              </ScrollReveal>
            </div>

            <div className="county-grid">
              {counties.map((county: any, i: number) => (
                <ScrollReveal key={county.slug} delay={i % 5} className="h-full">
                  <Link href={`/chapters/${state}/${county.slug}`} className="block group h-full" id={`county-${county.slug}`}>
                    <div className="county-card">
                      <div className="county-card-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <h3 className="county-card-name">{county.name}</h3>
                      <div className="county-card-label">County Chapter</div>
                      <div className="county-card-arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BACK NAVIGATION ─── */}
        <section className="chapters-cta-band">
          <ScrollReveal>
            <div className="chapters-cta-inner">
              <div>
                <h3 className="chapters-cta-title">Explore other states</h3>
                <p className="chapters-cta-desc">The movement spans all 50 states. Find chapters near you or help establish new ones across the nation.</p>
              </div>
              <Link href="/chapters" className="btn-ghost">
                ← All States
              </Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}

