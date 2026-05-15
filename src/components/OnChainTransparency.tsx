'use client';

import ScrollReveal from "./ScrollReveal";
import { useState } from "react";

const FACETS = [
  {
    name: "Registry Facet",
    tag: "IDENTITY",
    description: "Every chapter charter, officer election, membership roll change, and organizational action is recorded as an immutable on-chain event. No party official can claim authority they were never granted.",
    events: ["ChapterChartered", "OfficerElected", "OfficerRemoved", "MembershipChanged", "ChapterDissolved"],
  },
  {
    name: "Treasury Facet",
    tag: "FINANCE",
    description: "Every contribution, disbursement, and transfer across every chapter is published in real time. Any citizen can audit the party's complete financial history without requesting permission from anyone.",
    events: ["ContributionReceived", "DisbursementApproved", "TransferExecuted", "QuarterlyReportPublished"],
  },
  {
    name: "Governance Facet",
    tag: "VOTES",
    description: "Resolutions, endorsements, constitutional amendments, and convention votes are recorded with full delegate attribution. The entire decision history of the party is publicly verifiable.",
    events: ["ResolutionProposed", "VoteCast", "ResolutionRatified", "AmendmentProposed", "EndorsementGranted"],
  },
  {
    name: "Endorsement Facet",
    tag: "CANDIDATES",
    description: "Candidate nominations, endorsement votes, PAC refusal affirmations, and principles certifications are recorded on-chain. No candidate can claim party endorsement without a verifiable record.",
    events: ["CandidateNominated", "PACRefusalCertified", "EndorsementVoteRecorded", "EndorsementRevoked"],
  },
  {
    name: "Audit Facet",
    tag: "INTEGRITY",
    description: "Read-only facet providing structured queries against all other facets. Any journalist, researcher, or citizen can reconstruct the complete operational history of the party from genesis.",
    events: ["AuditQueryExecuted", "ComplianceCheckPassed", "PublicReportGenerated"],
  },
];

export default function OnChainTransparency() {
  const [activeFacet, setActiveFacet] = useState(0);

  return (
    <section className="section" id="transparency" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="section-inner">
        <ScrollReveal>
          <p className="section-label">Radical Transparency Protocol</p>
          <h2 className="section-title">Every Action. On-Chain. Forever.</h2>
          <p className="section-subtitle">
            The Anti-Federalist Party will be the first political party in American history to publish its
            complete operational record on a public blockchain. Every contribution, every vote, every
            endorsement, every officer election — recorded immutably on Ethereum mainnet. Not because
            we are required to. Because we believe transparency should not require trust.
          </p>
          <hr className="section-divider" />
        </ScrollReveal>

        {/* Architecture Overview */}
        <ScrollReveal>
          <div style={{
            borderRadius: '1rem',
            border: '1px solid rgba(46,196,182,0.15)',
            background: 'rgba(10,10,18,0.8)',
            backdropFilter: 'blur(24px)',
            padding: '2.5rem',
            marginBottom: '3rem',
            boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '3rem', height: '3rem', borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, rgba(46,196,182,0.15), rgba(139,92,246,0.15))',
                border: '1px solid rgba(46,196,182,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2EC4B6" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: '#F0EDE6', margin: 0 }}>
                  EIP-2535 Diamond Standard
                </h3>
                <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.75rem', margin: '0.15rem 0 0', fontFamily: 'var(--font-mono)' }}>
                  Ethereum Mainnet &bull; Upgradeable &bull; Modular &bull; Permanent
                </p>
              </div>
            </div>
            <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              The party&apos;s transparency infrastructure is built on the <strong style={{ color: '#2EC4B6' }}>Diamond Standard (EIP-2535)</strong> —
              a modular smart contract architecture where each operational domain is implemented as a separate
              &ldquo;facet&rdquo; that plugs into a single diamond proxy contract. This means the party can upgrade
              individual modules (adding new transparency requirements, new reporting standards) without
              redeploying the entire system or losing any historical data. Every event emitted is indexed,
              queryable, and permanent.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Immutable History', 'Modular Upgrades', 'Public Auditability', 'Gas-Optimized', 'Zero Admin Keys'].map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
                  color: '#2EC4B6', background: 'rgba(46,196,182,0.08)', padding: '4px 10px',
                  borderRadius: '4px', border: '1px solid rgba(46,196,182,0.15)',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Facet Explorer */}
        <ScrollReveal>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700,
            color: '#F0EDE6', borderLeft: '3px solid #8B5CF6', paddingLeft: '1rem',
            marginBottom: '1.5rem',
          }}>
            Diamond Facets
          </h3>
        </ScrollReveal>

        <div className="facet-explorer-grid" style={{ marginBottom: '3rem' }}>
          {/* Facet Tabs */}
          <ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {FACETS.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setActiveFacet(i)}
                  style={{
                    textAlign: 'left', cursor: 'pointer', padding: '1rem 1.25rem',
                    borderRadius: '0.5rem', border: 'none',
                    background: activeFacet === i ? 'rgba(46,196,182,0.1)' : 'rgba(10,10,18,0.4)',
                    borderLeft: activeFacet === i ? '3px solid #2EC4B6' : '3px solid transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{
                    fontSize: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
                    color: activeFacet === i ? '#8B5CF6' : 'rgba(240,237,230,0.3)',
                    display: 'block', marginBottom: '0.25rem',
                  }}>{f.tag}</span>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600,
                    color: activeFacet === i ? '#F0EDE6' : 'rgba(240,237,230,0.5)',
                  }}>{f.name}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Facet Detail */}
          <ScrollReveal>
            <div style={{
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(10,10,18,0.7)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              height: '100%',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
                  color: '#8B5CF6', background: 'rgba(139,92,246,0.1)', padding: '3px 8px',
                  borderRadius: '3px', border: '1px solid rgba(139,92,246,0.2)',
                }}>{FACETS[activeFacet].tag}</span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#F0EDE6', margin: 0 }}>
                  {FACETS[activeFacet].name}
                </h4>
              </div>
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem', flex: 1 }}>
                {FACETS[activeFacet].description}
              </p>
              <div>
                <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(240,237,230,0.3)', marginBottom: '0.5rem' }}>
                  Emitted Events
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {FACETS[activeFacet].events.map((e) => (
                    <code key={e} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#2EC4B6',
                      background: 'rgba(46,196,182,0.06)', padding: '3px 8px', borderRadius: '3px',
                      border: '1px solid rgba(46,196,182,0.1)',
                    }}>{e}</code>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Why Ethereum */}
        <ScrollReveal>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem', marginBottom: '2rem',
          }}>
            {[
              {
                title: 'Why Ethereum Mainnet',
                text: 'Not a private chain. Not a sidechain. Not a database with "blockchain" branding. Ethereum mainnet is the most battle-tested, censorship-resistant public ledger in existence. No government, corporation, or party official can alter, redact, or delete the record.',
                accent: '#2EC4B6',
              },
              {
                title: 'Why the Diamond Standard',
                text: 'EIP-2535 allows modular upgrades without losing state. When new transparency requirements emerge — new FEC reporting rules, new audit standards — we add a facet. The historical record is never migrated, never rewritten, never at risk.',
                accent: '#8B5CF6',
              },
              {
                title: 'Why Zero Admin Keys',
                text: 'The contract will operate under a governance multisig controlled by elected delegates from the National Council. No single person holds an admin key. Upgrades require supermajority approval — mirroring the constitutional amendment process in code.',
                accent: '#F59E0B',
              },
            ].map((card) => (
              <div key={card.title} style={{
                borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10,10,18,0.6)', padding: '1.5rem 1.75rem',
                borderTop: `2px solid ${card.accent}`,
              }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '0.5rem' }}>
                  {card.title}
                </h4>
                <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom Statement */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600,
              color: '#F0EDE6', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.6,
              fontStyle: 'italic',
            }}>
              &ldquo;If you are afraid of your donors being public, you should not be taking their money.&rdquo;
            </p>
            <div style={{ width: '2rem', height: '2px', background: '#2EC4B6', margin: '1rem auto 0' }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
