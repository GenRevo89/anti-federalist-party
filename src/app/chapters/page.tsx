import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import ChaptersMap from "@/components/ChaptersMap";
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Anti-Federalist Chapters | National Directory',
  description: 'Find your local Anti-Federalist chapter. We are building a grassroots network across all 50 states to restore local governance and hold centralized power accountable.',
};

export default function ChaptersIndex() {
  const statesPath = path.join(process.cwd(), 'src/data/all-states.json');
  let states: any[] = [];
  try {
    states = JSON.parse(fs.readFileSync(statesPath, 'utf8'));
    states.sort((a: any, b: any) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error("Could not load states data");
  }

  const totalCounties = 3216;
  const activeStates = states.length;
  const regions = [
    { name: 'Northeast', count: states.filter((s: any) => ['ct','de','me','md','ma','nh','nj','ny','pa','ri','vt'].includes(s.code)).length },
    { name: 'Southeast', count: states.filter((s: any) => ['al','ar','fl','ga','ky','la','ms','nc','sc','tn','va','wv'].includes(s.code)).length },
    { name: 'Midwest', count: states.filter((s: any) => ['il','in','ia','ks','mi','mn','mo','ne','nd','oh','sd','wi'].includes(s.code)).length },
    { name: 'Southwest', count: states.filter((s: any) => ['az','nm','ok','tx'].includes(s.code)).length },
    { name: 'West', count: states.filter((s: any) => ['ak','ca','co','hi','id','mt','nv','or','ut','wa','wy'].includes(s.code)).length },
  ];

  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO SECTION ─── */}
        <section className="chapters-hero">
          <div className="chapters-hero-image-wrap">
            <Image
              src="/images/chapters-hero.png"
              alt="Network of communities across America"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
            <div className="chapters-hero-overlay" />
          </div>
          <div className="chapters-hero-content">
            <ScrollReveal>
              <p className="section-label" style={{ marginBottom: '1.5rem' }}>The National Network</p>
              <h1 className="chapters-hero-title">
                Find Your <em>Chapter</em>
              </h1>
              <hr className="hero-divider" />
              <p className="chapters-hero-subtitle">
                The Anti-Federalist movement is not built in Washington. It is built in your county, 
                your town, your neighborhood. Select your state to join the vanguard.
              </p>
            </ScrollReveal>
          </div>
          <div className="hero-scroll">
            <span>Explore States</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="chapters-stats-bar">
          <ScrollReveal>
            <div className="chapters-stats-inner">
              <div className="chapters-stat">
                <div className="chapters-stat-num">{activeStates}</div>
                <div className="chapters-stat-label">State Chapters</div>
              </div>
              <div className="chapters-stat-divider" />
              <div className="chapters-stat">
                <div className="chapters-stat-num">{totalCounties.toLocaleString()}</div>
                <div className="chapters-stat-label">County Units</div>
              </div>
              <div className="chapters-stat-divider" />
              <div className="chapters-stat">
                <div className="chapters-stat-num">∞</div>
                <div className="chapters-stat-label">Growing Network</div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ─── BREADCRUMB NAV ─── */}
        <div className="chapters-breadcrumb">
          <div className="content-wrap">
            <Link href="/" className="chapters-breadcrumb-link">Home</Link>
            <span className="chapters-breadcrumb-sep">›</span>
            <span className="chapters-breadcrumb-current">Chapters</span>
          </div>
        </div>

        {/* ─── REGION QUICK NAV ─── */}
        <section className="section pt-12 pb-4">
          <div className="content-wrap">
            <ScrollReveal>
              <div className="chapters-region-nav">
                {regions.map((region) => (
                  <div key={region.name} className="chapters-region-pill">
                    <span className="chapters-region-pill-name">{region.name}</span>
                    <span className="chapters-region-pill-count">{region.count} states</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── INTERACTIVE MAP ─── */}
        <section className="section pt-4 pb-4">
          <div className="content-wrap-md">
            <ScrollReveal>
              <div className="chapters-map-section">
                <div className="chapters-map-header">
                  <h2 className="chapters-map-title">Explore the Network</h2>
                  <p className="chapters-map-desc">Click any state on the map to view its county chapters</p>
                </div>
                <ChaptersMap />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── STATE DIRECTORY ─── */}
        <section className="section pt-8 pb-32">
          <div className="content-wrap">
            <div className="text-center mb-12">
              <ScrollReveal>
                <h2 className="section-title">Or Browse All States</h2>
                <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
                  Every state has an active organizing effort. Click to see your county chapters.
                </p>
              </ScrollReveal>
            </div>

            <div className="chapters-state-grid">
              {states.map((state: any, i: number) => {
                const isHeadquarters = state.code === 'nm';
                return (
                  <ScrollReveal key={state.code} delay={i % 5} className="h-full">
                    <Link href={`/chapters/${state.code}`} className="block group h-full" id={`chapter-${state.code}`}>
                      <div className={`chapters-state-card ${isHeadquarters ? 'chapters-state-card--hq' : ''}`}>
                        {isHeadquarters && (
                          <div className="chapters-hq-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            HQ
                          </div>
                        )}
                        <div className="chapters-state-code">{state.code.toUpperCase()}</div>
                        <h3 className="chapters-state-name">{state.name}</h3>
                        <div className="chapters-state-arrow">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CTA BAND ─── */}
        <section className="chapters-cta-band">
          <ScrollReveal>
            <div className="chapters-cta-inner">
              <div>
                <h3 className="chapters-cta-title">Don&apos;t see your chapter yet?</h3>
                <p className="chapters-cta-desc">Start one. The movement grows from the ground up. We provide organizing resources, legal frameworks, and the national platform.</p>
              </div>
              <a href="/#join" className="btn-primary">
                Start a Chapter
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
