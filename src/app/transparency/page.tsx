'use client';

import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from 'react';

const FACETS = [
  { name: 'Registry Facet', tag: 'IDENTITY', color: '#2EC4B6',
    description: 'Every chapter charter, officer election, membership roll change, and organizational action is recorded as an immutable on-chain event. No party official can claim authority they were never granted.',
    events: ['ChapterChartered', 'OfficerElected', 'OfficerRemoved', 'MembershipChanged', 'ChapterDissolved', 'StateBodyFormed'],
    solidity: `event ChapterChartered(\n  bytes32 indexed charterId,\n  string state,\n  string county,\n  address[] founders,\n  uint256 timestamp\n);`,
  },
  { name: 'Treasury Facet', tag: 'FINANCE', color: '#10B981',
    description: 'Every contribution, disbursement, and transfer across every chapter is published in real time. Any citizen can audit the party\'s complete financial history without requesting permission from anyone.',
    events: ['ContributionReceived', 'DisbursementApproved', 'TransferExecuted', 'QuarterlyReportPublished', 'DuesCollected', 'RefundIssued'],
    solidity: `event ContributionReceived(\n  bytes32 indexed chapterId,\n  address indexed donor,\n  uint256 amount,\n  string currency,\n  uint256 timestamp\n);`,
  },
  { name: 'Governance Facet', tag: 'VOTES', color: '#8B5CF6',
    description: 'Resolutions, endorsements, constitutional amendments, and convention votes are recorded with full delegate attribution. The entire decision history of the party is publicly verifiable.',
    events: ['ResolutionProposed', 'VoteCast', 'ResolutionRatified', 'AmendmentProposed', 'ConventionConvened', 'QuorumVerified'],
    solidity: `event VoteCast(\n  bytes32 indexed resolutionId,\n  bytes32 indexed chapterId,\n  address indexed delegate,\n  bool support,\n  uint256 weight,\n  uint256 timestamp\n);`,
  },
  { name: 'Endorsement Facet', tag: 'CANDIDATES', color: '#F59E0B',
    description: 'Candidate nominations, endorsement votes, PAC refusal affirmations, and principles certifications are recorded on-chain. No candidate can claim party endorsement without a verifiable record.',
    events: ['CandidateNominated', 'PACRefusalCertified', 'EndorsementVoteRecorded', 'EndorsementRevoked', 'PrinciplesAffirmed'],
    solidity: `event CandidateNominated(\n  bytes32 indexed nominationId,\n  string candidateName,\n  string office,\n  bytes32 indexed chapterId,\n  uint256 timestamp\n);`,
  },
  { name: 'Audit Facet', tag: 'INTEGRITY', color: '#EF4444',
    description: 'Read-only facet providing structured queries against all other facets. Any journalist, researcher, or citizen can reconstruct the complete operational history of the party from genesis block.',
    events: ['AuditQueryExecuted', 'ComplianceCheckPassed', 'PublicReportGenerated', 'AnomalyFlagged'],
    solidity: `function getChapterHistory(\n  bytes32 chapterId\n) external view returns (\n  Event[] memory events\n);`,
  },
];

const LIFECYCLE = [
  { phase: '01', title: 'Event Occurs', desc: 'A chapter charters, an officer is elected, a contribution is received, or a vote is cast at any level of the party.' },
  { phase: '02', title: 'Authorized Signer Submits', desc: 'The chapter secretary or treasurer submits the event to the Diamond contract via a multisig-authorized transaction.' },
  { phase: '03', title: 'On-Chain Emission', desc: 'The appropriate facet emits a structured event with full metadata — chapter ID, actor address, timestamp, and action details.' },
  { phase: '04', title: 'Indexed & Queryable', desc: 'The event is indexed by public infrastructure (Etherscan, The Graph, Dune Analytics) and becomes permanently queryable by anyone.' },
  { phase: '05', title: 'Public Dashboard', desc: 'The party\'s transparency dashboard at anti-federalists.com/transparency renders the on-chain data in human-readable format for all citizens.' },
];

const PRINCIPLES = [
  { title: 'No Private Chains', text: 'A private blockchain is just a database with extra steps. If the operator can censor, rewrite, or selectively reveal data, it is not transparent. We use Ethereum mainnet because no one controls it — including us.' },
  { title: 'No Admin Keys', text: 'The contract operates under a governance multisig controlled by elected National Council delegates. No single person holds a unilateral upgrade key. Facet upgrades require supermajority approval, mirroring the constitutional amendment process.' },
  { title: 'No Selective Disclosure', text: 'Every event emitted by every facet is public. We do not choose what to reveal. The contract architecture makes selective disclosure structurally impossible — if a transaction occurs, the event fires.' },
  { title: 'No Migration Risk', text: 'EIP-2535 Diamond Standard allows modular upgrades without state migration. When new reporting requirements emerge, we add a facet. Historical data is never moved, never reformatted, never at risk of loss.' },
  { title: 'No Custody of Donor Data', text: 'Contributions are recorded by amount, chapter, and wallet address. The party does not collect or store personally identifiable donor information on-chain. Donors who wish to be identified may do so voluntarily through their public wallet.' },
  { title: 'No Expiration', text: 'Ethereum mainnet has no retention policy. Data written to the chain in 2026 will be readable in 2126. The party\'s operational record outlives every officer, every convention, every generation of members.' },
];

const COMPARISONS = [
  { entity: 'Traditional Parties', method: 'Quarterly FEC filings (PDF)', delay: '45-90 days', auditability: 'Manual review only', immutability: 'Amendable' },
  { entity: 'Super PACs', method: 'Semi-annual disclosure', delay: '6+ months', auditability: 'Opaque by design', immutability: 'Redactable' },
  { entity: '501(c)(4) Dark Money', method: 'No donor disclosure required', delay: 'Never', auditability: 'None', immutability: 'N/A' },
  { entity: 'Anti-Federalist Party', method: 'Real-time on-chain events', delay: '~12 seconds (1 block)', auditability: 'Fully public, permissionless', immutability: 'Permanent & immutable' },
];

export default function TransparencyPage() {
  const [activeFacet, setActiveFacet] = useState(0);
  const f = FACETS[activeFacet];

  return (
    <SceneWrapper theme="chapters">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>

        {/* HERO */}
        <section style={{ paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.35em', color: '#8B5CF6', marginBottom: '1.5rem' }}>Radical Transparency Protocol</p>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Every Action.<br /><em style={{ fontStyle: 'italic', color: '#2EC4B6' }}>On-Chain. Forever.</em>
              </h1>
              <div style={{ width: '3rem', height: '2px', background: '#2EC4B6', margin: '0 auto 1.5rem' }} />
              <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '1.1rem', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.8 }}>
                The Anti-Federalist Party will be the first political organization in American history to publish its
                complete operational record — every contribution, every vote, every endorsement, every officer
                election — on a public, immutable blockchain. Not because we are required to.
                Because transparency that requires trust is not transparency.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #EF4444', paddingLeft: '1rem', marginBottom: '2rem' }}>
                The Problem with Political Transparency Today
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div style={{ borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,18,0.7)', backdropFilter: 'blur(20px)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        {['Entity', 'Disclosure Method', 'Time Delay', 'Auditability', 'Immutability'].map(h => (
                          <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'rgba(240,237,230,0.4)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISONS.map((c, i) => {
                        const isUs = i === COMPARISONS.length - 1;
                        return (
                          <tr key={c.entity} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: isUs ? 'rgba(46,196,182,0.05)' : 'transparent' }}>
                            <td style={{ padding: '1rem 1.25rem', fontWeight: isUs ? 700 : 400, color: isUs ? '#2EC4B6' : '#F0EDE6' }}>{c.entity}</td>
                            <td style={{ padding: '1rem 1.25rem', color: 'rgba(240,237,230,0.5)' }}>{c.method}</td>
                            <td style={{ padding: '1rem 1.25rem', color: isUs ? '#2EC4B6' : 'rgba(240,237,230,0.5)' }}>{c.delay}</td>
                            <td style={{ padding: '1rem 1.25rem', color: isUs ? '#2EC4B6' : 'rgba(240,237,230,0.5)' }}>{c.auditability}</td>
                            <td style={{ padding: '1rem 1.25rem', color: isUs ? '#2EC4B6' : 'rgba(240,237,230,0.5)' }}>{c.immutability}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.9rem', lineHeight: 1.8, marginTop: '1.5rem', maxWidth: '40rem' }}>
                The current system of political disclosure was designed in the 1970s for a paper-based world.
                Quarterly PDF filings, 90-day delays, redactable amendments, and billion-dollar dark money
                channels are not failures of the system — they are the system. We are replacing it entirely.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #8B5CF6', paddingLeft: '1rem', marginBottom: '0.5rem' }}>
                The Diamond Architecture
              </h2>
              <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.85rem', marginBottom: '2rem', paddingLeft: '1rem', marginLeft: '3px', maxWidth: '44rem' }}>
                Built on EIP-2535 — a modular smart contract standard where each operational domain is a separate &ldquo;facet&rdquo; plugged into a single diamond proxy on Ethereum mainnet.
              </p>
            </ScrollReveal>

            {/* Facet Explorer */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2.5fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <ScrollReveal>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {FACETS.map((fc, i) => (
                    <button key={fc.name} onClick={() => setActiveFacet(i)} style={{
                      textAlign: 'left', cursor: 'pointer', padding: '1rem 1.25rem',
                      borderRadius: '0.5rem', border: 'none',
                      background: activeFacet === i ? 'rgba(46,196,182,0.1)' : 'rgba(10,10,18,0.4)',
                      borderLeft: activeFacet === i ? `3px solid ${fc.color}` : '3px solid transparent',
                      transition: 'all 0.3s ease',
                    }}>
                      <span style={{ fontSize: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: activeFacet === i ? fc.color : 'rgba(240,237,230,0.3)', display: 'block', marginBottom: '0.25rem' }}>{fc.tag}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: activeFacet === i ? '#F0EDE6' : 'rgba(240,237,230,0.5)' }}>{fc.name}</span>
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div style={{ borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,18,0.7)', backdropFilter: 'blur(20px)', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: f.color, background: `${f.color}15`, padding: '3px 8px', borderRadius: '3px', border: `1px solid ${f.color}30` }}>{f.tag}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#F0EDE6', margin: 0 }}>{f.name}</h3>
                  </div>
                  <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>{f.description}</p>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(240,237,230,0.3)', marginBottom: '0.5rem' }}>Emitted Events</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {f.events.map(e => (
                        <code key={e} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#2EC4B6', background: 'rgba(46,196,182,0.06)', padding: '3px 8px', borderRadius: '3px', border: '1px solid rgba(46,196,182,0.1)' }}>{e}</code>
                      ))}
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(240,237,230,0.3)', marginBottom: '0.5rem' }}>Solidity Interface</p>
                    <pre style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.04)', overflowX: 'auto', margin: 0 }}>
                      <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#F0EDE6', lineHeight: 1.6 }}>{f.solidity}</code>
                    </pre>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* EVENT LIFECYCLE */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '2rem' }}>
                Event Lifecycle
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {LIFECYCLE.map((step, i) => (
                <ScrollReveal key={step.phase} delay={i * 0.08}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,18,0.6)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, color: '#2EC4B6', background: 'rgba(46,196,182,0.1)', padding: '6px 10px', borderRadius: '4px', flexShrink: 0 }}>{step.phase}</span>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#F0EDE6', margin: '0 0 0.25rem' }}>{step.title}</h4>
                      <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN PRINCIPLES */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #F59E0B', paddingLeft: '1rem', marginBottom: '2rem' }}>
                Design Principles
              </h2>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {PRINCIPLES.map((p, i) => (
                <ScrollReveal key={p.title} delay={i * 0.06}>
                  <div style={{ height: '100%', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,18,0.6)', padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '0.5rem' }}>{p.title}</h4>
                    <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.82rem', lineHeight: 1.7, margin: 0, flex: 1 }}>{p.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHY ETHEREUM */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #2EC4B6', paddingLeft: '1rem', marginBottom: '2rem' }}>
                Why Ethereum Mainnet
              </h2>
              <div style={{ borderRadius: '1rem', border: '1px solid rgba(46,196,182,0.12)', background: 'rgba(46,196,182,0.03)', backdropFilter: 'blur(20px)', padding: '2.5rem' }}>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  We evaluated every major blockchain ecosystem. We chose Ethereum mainnet for one reason: <strong style={{ color: '#F0EDE6' }}>it is the only network where the party cannot be censored, deplatformed, or silenced</strong>.
                </p>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Solana has had multiple outages. Avalanche subnets can be halted by validators. Private and permissioned chains are controlled by their operators. L2 rollups depend on centralized sequencers. Every alternative introduces a trust assumption that we refuse to accept.
                </p>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Ethereum mainnet has maintained 100% uptime since the Merge. It is validated by over 900,000 independent validators across 10,000+ nodes in 80+ countries. No government can shut it down. No corporation can censor a transaction. No party official can delete an inconvenient record.
                </p>
                <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
                  Yes, mainnet gas costs are higher than alternatives. We consider this a feature, not a bug. The cost of writing to the most secure public ledger in human history is the cost of genuine transparency. We will optimize with calldata encoding and batch submissions — but we will never compromise on the security of the chain we write to.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="content-wrap-md">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#F0EDE6', borderLeft: '3px solid #8B5CF6', paddingLeft: '1rem', marginBottom: '2rem' }}>
                Frequently Asked Questions
              </h2>
            </ScrollReveal>
            {[
              { q: 'What if the party needs to upgrade the contract?', a: 'The Diamond Standard (EIP-2535) was designed specifically for this. Individual facets can be added, replaced, or removed without migrating state. An upgrade to the Treasury Facet does not affect the Registry Facet. All upgrades require supermajority approval from the National Council multisig — no single person can push a change.' },
              { q: 'Does this expose donor personal information?', a: 'No. On-chain records contain wallet addresses, amounts, chapter IDs, and timestamps. The party does not collect or publish personally identifiable information on-chain. Donors who wish to be publicly identified may do so through their wallet\'s public profile. FEC-required donor disclosures remain handled through traditional compliance channels.' },
              { q: 'How do you handle gas costs at scale?', a: 'We use batch submission patterns — aggregating multiple chapter events into single transactions using calldata encoding. A chapter\'s monthly activity (dues, minutes, votes) can be batched into a single transaction for a few dollars. The National Council treasury funds gas costs as an operational expense.' },
              { q: 'What happens if Ethereum undergoes a hard fork?', a: 'We follow the canonical chain as determined by the Ethereum Foundation and the validator supermajority. In the unlikely event of a contentious fork, the National Convention would vote on which chain to recognize. Historical data exists on both forks regardless.' },
              { q: 'Can a hostile actor spam the contract?', a: 'All write functions are gated behind role-based access control. Only authorized chapter signers can emit events for their chapter. The multisig structure prevents unauthorized writes. Read access is permissionless and free — anyone can query, no one can write without authorization.' },
              { q: 'Why not just use a public database?', a: 'A database has an administrator. An administrator can alter records, selectively disclose data, or shut the system down. Ethereum mainnet has no administrator. The data we write today will be readable by anyone, forever, without our permission or cooperation. That is the difference between disclosure and transparency.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 0' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#F0EDE6', marginBottom: '0.5rem' }}>{item.q}</h4>
                  <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="content-wrap" style={{ textAlign: 'center' }}>
            <ScrollReveal>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 600, color: '#F0EDE6', maxWidth: '36rem', margin: '0 auto 1rem', lineHeight: 1.5, fontStyle: 'italic' }}>
                &ldquo;If you are afraid of your donors being public, you should not be taking their money.&rdquo;
              </p>
              <div style={{ width: '2rem', height: '2px', background: '#2EC4B6', margin: '0 auto 2rem' }} />
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/documents" style={{ padding: '0.75rem 2rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #2EC4B6, #0D7377)', color: '#0A0A12', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>
                  Party Documents
                </Link>
                <Link href="/manifesto" style={{ padding: '0.75rem 2rem', borderRadius: '0.5rem', background: 'transparent', border: '1px solid rgba(46,196,182,0.3)', color: '#2EC4B6', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>
                  Read the Manifesto
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
