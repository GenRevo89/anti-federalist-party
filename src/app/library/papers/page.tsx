import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { Sword, Wheat, Landmark, ScrollText, Scale, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: 'The Anti-Federalist Papers | Library',
  description: 'Explore the foundational writings of the Anti-Federalist movement. Read Brutus, Federal Farmer, Centinel, Cato, Agrippa, and John DeWitt.',
};

type Paper = {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content?: string;
};

const AUTHOR_META: Record<string, { icon: React.ReactNode; color: string; tagline: string }> = {
  'Brutus': { icon: <Sword size={24} />, color: '#E04040', tagline: 'On the dangers of consolidation and the judicial power' },
  'Federal Farmer': { icon: <Wheat size={24} />, color: '#6B8E23', tagline: 'On representation, rights, and the structure of the union' },
  'Centinel': { icon: <Landmark size={24} />, color: '#4682B4', tagline: 'On the threat of aristocracy and unchecked federal power' },
  'Cato': { icon: <ScrollText size={24} />, color: '#DAA520', tagline: 'On executive power and the dangers of a strong presidency' },
  'Agrippa': { icon: <Scale size={24} />, color: '#8B4513', tagline: 'On commerce, diversity of interests, and state sovereignty' },
  'John DeWitt': { icon: <Bell size={24} />, color: '#708090', tagline: 'On the absence of a Bill of Rights and consent of the governed' },
};

function getAuthorKey(author: string): string {
  const match = author.match(/^(.+?)\s*\(/);
  return match ? match[1].trim() : author;
}

function getWordCount(content?: string): number {
  if (!content || content.includes('high-fidelity digitization')) return 0;
  return content.split(/\s+/).length;
}

export default function LibraryIndex() {
  const papersPath = path.join(process.cwd(), 'src/data/papers.json');
  const papers: Paper[] = JSON.parse(fs.readFileSync(papersPath, 'utf8'));

  // Group by author
  const authorGroups: Record<string, Paper[]> = {};
  for (const paper of papers) {
    const key = getAuthorKey(paper.author);
    if (!authorGroups[key]) authorGroups[key] = [];
    authorGroups[key].push(paper);
  }

  const authorOrder = ['Brutus', 'Federal Farmer', 'Centinel', 'Cato', 'Agrippa', 'John DeWitt'];
  const totalPapers = papers.length;
  const totalWithContent = papers.filter(p => getWordCount(p.content) > 0).length;

  return (
    <SceneWrapper theme="library">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* ─── HERO ─── */}
        <section className="library-hero">
          <div className="library-hero-image-wrap">
            <Image
              src="/images/archive-hero.png"
              alt="The Constitutional Convention — Independence Hall, 1787"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
            <div className="library-hero-overlay" />
          </div>
          <div className="library-hero-content">
            <ScrollReveal>
              <p className="section-label" style={{ marginBottom: '1.5rem', color: 'var(--gold)' }}>Historical Documents</p>
              <h1 className="library-hero-title">
                The Anti-Federalist <em>Archive</em>
              </h1>
              <hr className="hero-divider" />
              <p className="library-hero-subtitle">
                The writings that warned of consolidated power. The Anti-Federalists were dismissed as 
                alarmists in 1787. Today, their words read like prophecy.
              </p>
            </ScrollReveal>
          </div>
          <div className="hero-scroll">
            <span>Read the Documents</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="library-stats-bar">
          <ScrollReveal>
            <div className="chapters-stats-inner">
              <div className="chapters-stat">
                <div className="chapters-stat-num" style={{ color: 'var(--gold)' }}>{totalPapers}</div>
                <div className="chapters-stat-label">Documents</div>
              </div>
              <div className="chapters-stat-divider" style={{ background: 'var(--gold)' }} />
              <div className="chapters-stat">
                <div className="chapters-stat-num" style={{ color: 'var(--gold)' }}>{Object.keys(authorGroups).length}</div>
                <div className="chapters-stat-label">Author Series</div>
              </div>
              <div className="chapters-stat-divider" style={{ background: 'var(--gold)' }} />
              <div className="chapters-stat">
                <div className="chapters-stat-num" style={{ color: 'var(--gold)' }}>1787–88</div>
                <div className="chapters-stat-label">Published Era</div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ─── BREADCRUMB ─── */}
        <div className="chapters-breadcrumb">
          <div className="content-wrap">
            <Link href="/" className="chapters-breadcrumb-link">Home</Link>
            <span className="chapters-breadcrumb-sep">›</span>
            <span className="chapters-breadcrumb-current">Library</span>
          </div>
        </div>

        {/* ─── EACH AUTHOR SERIES ─── */}
        {authorOrder.map((authorKey) => {
          const group = authorGroups[authorKey];
          if (!group) return null;
          const meta = AUTHOR_META[authorKey] || { icon: <ScrollText size={24} />, color: '#888', tagline: '' };
          const firstPaper = group[0];
          const authorMatch = firstPaper.author.match(/\((.+?)\)/);
          const realName = authorMatch ? authorMatch[1] : '';

          return (
            <section key={authorKey} className="section pt-12 pb-4" id={`series-${authorKey.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="content-wrap">
                {/* Series Header */}
                <ScrollReveal>
                  <div className="library-series-header-block">
                    <div className="library-series-icon-large" style={{ borderColor: meta.color }}>{meta.icon}</div>
                    <div>
                      <h2 className="library-series-heading">{authorKey}</h2>
                      {realName && <div className="library-series-real-name">{realName}</div>}
                      <p className="library-series-tagline">{meta.tagline}</p>
                    </div>
                    <div className="library-series-badge" style={{ background: meta.color + '22', color: meta.color, borderColor: meta.color + '44' }}>
                      {group.length} papers
                    </div>
                  </div>
                </ScrollReveal>

                {/* Paper Cards Grid */}
                <div className="library-papers-grid">
                  {group.map((paper, i) => {
                    const wordCount = getWordCount(paper.content);
                    const hasContent = wordCount > 0;
                    const previewText = hasContent && paper.content
                      ? paper.content.substring(0, 200).replace(/\n/g, ' ').trim() + '…'
                      : paper.summary;

                    return (
                      <ScrollReveal key={paper.id} delay={i % 4 + 1}>
                        <Link href={`/library/papers/${paper.id}`} className="block group h-full" id={`paper-${paper.id}`}>
                          <div className="library-paper-card" style={{ '--accent': meta.color } as React.CSSProperties}>
                            <div className="library-paper-card-header">
                              <span className="library-paper-card-num" style={{ color: meta.color }}>
                                #{paper.id.split('-').pop()}
                              </span>
                              <span className="library-paper-card-date">{paper.date}</span>
                            </div>
                            <h3 className="library-paper-card-title">{paper.title}</h3>
                            <p className="library-paper-card-desc">{previewText}</p>
                            <div className="library-paper-card-footer">
                              {hasContent ? (
                                <span className="library-paper-card-words">{wordCount.toLocaleString()} words</span>
                              ) : (
                                <span className="library-paper-card-pending">Digitization pending</span>
                              )}
                              <span className="library-paper-card-read" style={{ color: meta.color }}>
                                Read →
                              </span>
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
        })}

        {/* ─── SOURCE ATTRIBUTION ─── */}
        <section className="section pt-8 pb-8">
          <div className="content-wrap-sm text-center">
            <ScrollReveal>
              <div className="library-source-card">
                <p className="library-source-text">
                  Primary texts sourced from the Constitution Society archives at{' '}
                  <a href="https://constitution.org/1-Constitution/afp.htm" target="_blank" rel="noopener noreferrer" className="library-source-link">
                    constitution.org
                  </a>
                  {' '}and Teaching American History. These public domain documents have been preserved 
                  in their original form for educational purposes.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="chapters-cta-band" style={{ borderTopColor: 'rgba(201, 169, 78, 0.2)' }}>
          <ScrollReveal>
            <div className="chapters-cta-inner">
              <div>
                <h3 className="chapters-cta-title">Their warnings became our reality.</h3>
                <p className="chapters-cta-desc">The Anti-Federalists were right. Join the movement that carries their vision forward into the 21st century.</p>
              </div>
              <a href="/#join" className="btn-primary" style={{ background: 'var(--gold)' }}>
                Join the Movement
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
