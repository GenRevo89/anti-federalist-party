"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { ShieldAlert, Network, Fingerprint, Scale, Landmark, BookOpen, Sword, Coins, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Manifesto() {
  const [activeSection, setActiveSection] = useState("act-1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    document.querySelectorAll(".manifesto-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <SceneWrapper theme="main">
      <Navbar />
      <main className="relative z-10" style={{ background: 'transparent' }}>
        
        {/* ─── HERO ─── */}
        <section className="manifesto-hero">
          <ScrollReveal>
            <h1 className="manifesto-title">The Manifesto</h1>
            <p className="manifesto-subtitle">
              In 1787, they warned us. Today, their warnings are our reality. We are the inheritors of the Anti-Federalist tradition, standing against the consolidation of power, the erasure of the individual, and the tyranny of the administrative state.
            </p>
          </ScrollReveal>
        </section>

        <div className="manifesto-layout">
          
          {/* ─── TABLE OF CONTENTS ─── */}
          <aside className="manifesto-toc">
            <h3 className="manifesto-toc-title">Contents</h3>
            <ul className="manifesto-toc-list">
              <li>
                <a href="#act-1" className={`manifesto-toc-link ${activeSection === 'act-1' ? 'active' : ''}`}>
                  I. The Prophecy Fulfilled
                </a>
              </li>
              <li>
                <a href="#act-2" className={`manifesto-toc-link ${activeSection === 'act-2' ? 'active' : ''}`}>
                  II. The Doctrine of Decentralization
                </a>
              </li>
              <li>
                <a href="#act-3" className={`manifesto-toc-link ${activeSection === 'act-3' ? 'active' : ''}`}>
                  III. The Sovereign Citizen
                </a>
              </li>
              <li>
                <a href="#act-4" className={`manifesto-toc-link ${activeSection === 'act-4' ? 'active' : ''}`}>
                  IV. The Return of the Republic
                </a>
              </li>
            </ul>
          </aside>

          {/* ─── CONTENT BODY ─── */}
          <div className="manifesto-body">
            
            {/* ─── ACT I ─── */}
            <ScrollReveal>
              <section id="act-1" className="manifesto-section">
                <div className="manifesto-card">
                  <span className="manifesto-act-num">Act I</span>
                  <h2 className="manifesto-act-title">The Prophecy Fulfilled</h2>
                  
                  <p className="manifesto-paragraph manifesto-dropcap">
                    When the Constitution was drafted, a coalition of patriots—the Anti-Federalists—sounded the alarm. They warned that a central government, vested with expansive and vaguely defined powers, would inevitably swallow the states, strip the people of their autonomy, and erect a distant, unaccountable oligarchy. They were dismissed as alarmists and agitators.
                  </p>
                  <p className="manifesto-paragraph">
                    History has vindicated them entirely.
                  </p>
                  <p className="manifesto-paragraph">
                    Look around. The federal apparatus has swollen into an administrative leviathan. Unelected bureaucrats issue edicts with the force of law. Financial cartels and corporate monopolies dictate policy, shielded by the very government instituted to regulate them. The illusion of choice masks a uniparty system where the centralization of authority remains the only bipartisan consensus.
                  </p>
                  
                  <div className="manifesto-quote">
                    "It is a truth confirmed by the unerring experience of ages, that every man, and every body of men, invested with power, are ever disposed to increase it, and to acquire a superiority over every thing that stands in their way."
                    <div className="manifesto-signature">— Brutus, 1787</div>
                  </div>

                  <p className="manifesto-paragraph">
                    We are not here to rewrite history; we are here to reclaim our future. The modern Anti-Federalist Party is the resurrection of America's original opposition movement. We do not seek to reform the bureaucratic machine. We seek to dismantle it. The consolidation of the United States into a singular, homogenized empire was the exact nightmare our forebears sought to prevent. It is our duty to reverse it.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* ─── ACT II ─── */}
            <ScrollReveal>
              <section id="act-2" className="manifesto-section">
                <div className="manifesto-card">
                  <span className="manifesto-act-num">Act II</span>
                  <h2 className="manifesto-act-title">The Doctrine of Decentralization</h2>
                  
                  <div className="manifesto-icon-block">
                    <Network className="manifesto-icon" size={40} />
                    <div>
                      <h3 className="manifesto-block-title">Localism over Globalism</h3>
                      <p className="manifesto-paragraph">
                        Power must reside where it is felt. The centralization of political and economic authority in Washington D.C. has severed the feedback loop between the governed and the governing. We demand the radical devolution of power back to the states, the counties, and the communities. A free republic cannot be administered from afar; it must be managed by the people who live within its borders. 
                      </p>
                      <p className="manifesto-paragraph">
                        Globalist frameworks that subordinate local sovereignty to international treaties or multinational corporate interests must be systematically rejected. We will govern ourselves.
                      </p>
                    </div>
                  </div>

                  <div className="manifesto-icon-block" style={{ marginTop: '3rem' }}>
                    <ShieldAlert className="manifesto-icon" size={40} />
                    <div>
                      <h3 className="manifesto-block-title">Nullification of the Administrative State</h3>
                      <p className="manifesto-paragraph">
                        The alphabet agencies—the CDC, FBI, ATF, EPA, and others—operate as a fourth branch of government, bypassing the legislative process entirely. We reject the doctrine of Chevron deference and assert the right of states to nullify unconstitutional federal mandates.
                      </p>
                      <p className="manifesto-paragraph">
                        Rule by "experts" is not democracy; it is technocracy. The power to legislate belongs solely to the elected representatives of the people. Agencies that operate outside this constitutional boundary must be stripped of their authority, defunded, and dismantled.
                      </p>
                    </div>
                  </div>
                  
                  <div className="manifesto-icon-block" style={{ marginTop: '3rem' }}>
                    <Landmark className="manifesto-icon" size={40} />
                    <div>
                      <h3 className="manifesto-block-title">The Repeal of the 17th Amendment</h3>
                      <p className="manifesto-paragraph">
                        The Senate was designed to represent the sovereign States, serving as a bulwark against federal overreach. The 17th Amendment reduced the Senate to a second House of Representatives, severing the States' direct influence over federal power. We advocate for its repeal, restoring the appointment of Senators to state legislatures and re-establishing the structural balance of the Republic.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* ─── ACT III ─── */}
            <ScrollReveal>
              <section id="act-3" className="manifesto-section">
                <div className="manifesto-card">
                  <span className="manifesto-act-num">Act III</span>
                  <h2 className="manifesto-act-title">The Sovereign Citizen</h2>
                  
                  <p className="manifesto-paragraph manifesto-dropcap">
                    True liberty in the modern age requires sovereignty in both the physical and digital realms. As the federal government colludes with corporate monopolies to build a panopticon of surveillance and control, the defense of the individual becomes our paramount duty.
                  </p>

                  <div className="manifesto-icon-block" style={{ marginTop: '3rem' }}>
                    <Coins className="manifesto-icon" size={40} />
                    <div>
                      <h3 className="manifesto-block-title">Financial Autonomy</h3>
                      <p className="manifesto-paragraph">
                        We stand in absolute opposition to Central Bank Digital Currencies (CBDCs) and social credit systems. The right to transact privately, to hold physical cash, and to utilize decentralized cryptocurrencies is fundamental to preventing digital serfdom. 
                      </p>
                      <p className="manifesto-paragraph">
                        We demand an end to the weaponization of the financial system against dissidents and political opponents. Operation Choke Point and its successors are a direct assault on the economic liberty of the American citizen.
                      </p>
                    </div>
                  </div>

                  <div className="manifesto-icon-block" style={{ marginTop: '3rem' }}>
                    <Cpu className="manifesto-icon" size={40} />
                    <div>
                      <h3 className="manifesto-block-title">Digital Privacy & Anti-Surveillance</h3>
                      <p className="manifesto-paragraph">
                        The Fourth Amendment applies to the digital public square. We demand an immediate end to warrantless mass surveillance, the bulk collection of metadata, and the unconstitutional partnerships between intelligence agencies and major tech platforms to suppress domestic speech.
                      </p>
                    </div>
                  </div>

                  <div className="manifesto-icon-block" style={{ marginTop: '3rem' }}>
                    <Sword className="manifesto-icon" size={40} />
                    <div>
                      <h3 className="manifesto-block-title">Absolute Property & Self-Defense</h3>
                      <p className="manifesto-paragraph">
                        The foundation of a free society is the inviolability of private property and the right to self-defense. We reject civil asset forfeiture, exorbitant property taxation that effectively rents your home back to you, and any federal infringement on the Second Amendment. A disarmed populace is not a citizenry; it is a subject class.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* ─── ACT IV ─── */}
            <ScrollReveal>
              <section id="act-4" className="manifesto-section">
                <div className="manifesto-card">
                  <span className="manifesto-act-num">Act IV</span>
                  <h2 className="manifesto-act-title">The Return of the Republic</h2>
                  
                  <p className="manifesto-paragraph manifesto-dropcap">
                    Our movement is not confined to theory; it is a blueprint for political reclamation. The federal government will never willingly relinquish the power it has usurped. We must force its retreat.
                  </p>

                  <p className="manifesto-paragraph">
                    We are building a parallel civic infrastructure—county by county, state by state. We are running candidates who swear allegiance not to the party establishments, but to the Constitution as it was originally understood. 
                  </p>

                  <div className="manifesto-icon-block" style={{ marginTop: '2.5rem' }}>
                    <BookOpen className="manifesto-icon" size={32} />
                    <div>
                      <h3 className="manifesto-block-title" style={{ fontSize: '1.4rem' }}>Our Non-Negotiable Demands:</h3>
                      <ul className="manifesto-paragraph" style={{ marginLeft: '1.5rem', listStyleType: 'disc' }}>
                        <li style={{ marginBottom: '0.75rem' }}><strong>The Federal Reserve:</strong> A full, unredacted audit and subsequent transition back to sound money principles.</li>
                        <li style={{ marginBottom: '0.75rem' }}><strong>Term Limits:</strong> Strict, constitutionally mandated term limits for all members of Congress and federal bureaucrats.</li>
                        <li style={{ marginBottom: '0.75rem' }}><strong>Corporate Separation:</strong> A permanent ban on corporate lobbying, the revolving door between regulatory agencies and industry, and congressional stock trading.</li>
                        <li style={{ marginBottom: '0.75rem' }}><strong>Local Education:</strong> The abolition of the Federal Department of Education and the return of curriculum control to parents and local districts.</li>
                      </ul>
                    </div>
                  </div>

                  <p className="manifesto-paragraph" style={{ marginTop: '2.5rem' }}>
                    We invite every American who recognizes the danger of a consolidated empire to join our ranks. The Anti-Federalists lost the debate in 1787, but they left us the map. It is time to finish what they started. 
                  </p>
                  
                  <div className="text-center" style={{ marginTop: '4rem', marginBottom: '1rem' }}>
                    <a href="/#join" className="btn-primary" style={{ background: 'var(--gold)', color: 'var(--black)', padding: '1rem 3rem', fontSize: '1.2rem' }}>
                      Join the Vanguard
                    </a>
                  </div>
                </div>
              </section>
            </ScrollReveal>

          </div>
        </div>

      </main>
      <Footer />
    </SceneWrapper>
  );
}
