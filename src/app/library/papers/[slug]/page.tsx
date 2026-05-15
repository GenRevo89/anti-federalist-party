import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateStaticParams() {
  const papersPath = path.join(process.cwd(), 'src/data/papers.json');
  const papers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));
  return papers.map((paper: any) => ({
    slug: paper.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const papersPath = path.join(process.cwd(), 'src/data/papers.json');
  const papers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));
  const paper = papers.find((p: any) => p.id === slug);

  if (!paper) return { title: 'Not Found' };

  return {
    title: `${paper.title} | The Anti-Federalist Archive`,
    description: paper.summary,
    openGraph: {
      title: paper.title,
      description: paper.summary,
      type: 'article',
      authors: [paper.author],
      publishedTime: paper.date,
    }
  };
}

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const papersPath = path.join(process.cwd(), 'src/data/papers.json');
  const papers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));
  const paper = papers.find((p: any) => p.id === slug);
  const paperIdx = papers.findIndex((p: any) => p.id === slug);

  if (!paper) return <div className="text-white text-center mt-32">Paper not found</div>;

  // Get prev/next papers
  const prevPaper = paperIdx > 0 ? papers[paperIdx - 1] : null;
  const nextPaper = paperIdx < papers.length - 1 ? papers[paperIdx + 1] : null;

  // Parse author
  const authorMatch = paper.author.match(/^(.+?)\s*\((.+?)\)$/);
  const penName = authorMatch ? authorMatch[1].trim() : paper.author;
  const realName = authorMatch ? authorMatch[2].trim() : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: paper.title,
    description: paper.summary,
    author: {
      '@type': 'Person',
      name: paper.author,
    },
    datePublished: paper.date,
    publisher: {
      '@type': 'Organization',
      name: 'Anti-Federalist Party',
    }
  };

  return (
    <SceneWrapper theme="library">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ─── HERO ─── */}
        <section className="paper-hero">
          <div className="paper-hero-bg">
            <Image
              src="/images/paper-detail-hero.png"
              alt="Historical document with quill and ink"
              fill
              priority
              style={{ objectFit: 'cover', opacity: 0.2 }}
            />
            <div className="paper-hero-gradient" />
          </div>
          <div className="paper-hero-content">
            <ScrollReveal>
              <div className="paper-hero-meta">
                <span className="paper-hero-date">{paper.date}</span>
                <span className="paper-hero-sep">|</span>
                <span className="paper-hero-author">{penName}</span>
                {realName && <span className="paper-hero-real">({realName})</span>}
              </div>
              <h1 className="paper-hero-title">{paper.title}</h1>
              <hr className="hero-divider" />
            </ScrollReveal>
          </div>
        </section>

        {/* ─── BREADCRUMB ─── */}
        <div className="chapters-breadcrumb">
          <div className="content-wrap-sm">
            <Link href="/" className="chapters-breadcrumb-link">Home</Link>
            <span className="chapters-breadcrumb-sep">›</span>
            <Link href="/library/papers" className="chapters-breadcrumb-link">Library</Link>
            <span className="chapters-breadcrumb-sep">›</span>
            <span className="chapters-breadcrumb-current">{paper.title}</span>
          </div>
        </div>

        {/* ─── ARTICLE ─── */}
        <section className="section pt-8 pb-8">
          <div className="content-wrap-md">
            {/* Historical Context */}
            <ScrollReveal>
              <div className="paper-context-card">
                <div className="paper-context-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="paper-context-title">Historical Context</h3>
                  <p className="paper-context-text">{paper.summary}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Article Body */}
            <article className="paper-article">
              {(paper.content || 'Content is not available.').split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className="paper-paragraph">{paragraph}</p>
              ))}
            </article>

            {/* Author Card */}
            <ScrollReveal>
              <div className="paper-author-card">
                <div className="paper-author-avatar">
                  {penName.charAt(0)}
                </div>
                <div>
                  <div className="paper-author-pen">{penName}</div>
                  {realName && <div className="paper-author-real">{realName}</div>}
                  <div className="paper-author-date">Published {paper.date}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── NAVIGATION ─── */}
        <section className="paper-nav-section">
          <div className="content-wrap-sm">
            <ScrollReveal>
              <div className="paper-nav-grid">
                {prevPaper ? (
                  <Link href={`/library/papers/${prevPaper.id}`} className="paper-nav-card paper-nav-prev">
                    <span className="paper-nav-label">← Previous</span>
                    <span className="paper-nav-title">{prevPaper.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPaper ? (
                  <Link href={`/library/papers/${nextPaper.id}`} className="paper-nav-card paper-nav-next">
                    <span className="paper-nav-label">Next →</span>
                    <span className="paper-nav-title">{nextPaper.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── BACK TO LIBRARY ─── */}
        <section className="chapters-cta-band" style={{ borderTopColor: 'rgba(201, 169, 78, 0.2)' }}>
          <ScrollReveal>
            <div className="chapters-cta-inner">
              <div>
                <h3 className="chapters-cta-title">Continue exploring the archive</h3>
                <p className="chapters-cta-desc">Browse all {papers.length} documents from the founders who saw what was coming.</p>
              </div>
              <Link href="/library/papers" className="btn-ghost" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                ← Back to Library
              </Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
