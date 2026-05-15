import ScrollReveal from "./ScrollReveal";
import { PROPHECIES } from "@/lib/constants";
import Image from "next/image";

const PROPHECY_IMAGES: Record<number, { src: string; alt: string }> = {
  0: { src: "/images/judicial-supremacy.png", alt: "Judicial supremacy — the unelected court above all" },
  1: { src: "/images/military-industrial.png", alt: "The imperial presidency and permanent war" },
  2: { src: "/images/aristocratic-capture.png", alt: "Aristocratic capture of Congress by the wealthy elite" },
  3: { src: "/images/surveillance-state.png", alt: "The surveillance state realized" },
  4: { src: "/images/global-military.png", alt: "Standing armies spanning the globe" },
};

export default function Prophecy() {
  return (
    <section className="section prophecy" id="prophecy">
      <div className="section-inner">
        <ScrollReveal>
          <p className="section-label">What They Foresaw</p>
          <h2 className="section-title">The Prophecy of the Founders</h2>
          <p className="section-subtitle">
            Over two centuries ago, the Anti-Federalists warned precisely what
            would happen if power was consolidated in a distant central
            government. They were dismissed as alarmists. History proved them
            prophets.
          </p>
          <hr className="section-divider" />
        </ScrollReveal>

        <ScrollReveal>
          <div className="prophecy-hero-image">
            <Image
              src="/images/founding-debate.png"
              alt="The Constitutional Convention of 1787"
              width={1280}
              height={540}
              style={{ width: "100%", height: "auto", borderRadius: "12px", marginBottom: "1rem" }}
            />
            <p className="prophecy-hero-caption">
              The Constitutional Convention, 1787 — where the Anti-Federalists fought for the people&apos;s liberty
            </p>
          </div>
        </ScrollReveal>

        <div className="prophecy-grid">
          {PROPHECIES.map((p, i) => (
            <ScrollReveal key={i} delay={Math.min(i + 1, 5)} className="h-full">
              <div className="prophecy-card prophecy-card-enhanced h-full backdrop-blur-xl backdrop-saturate-125">
                <div className="prophecy-card-image">
                  <Image
                    src={PROPHECY_IMAGES[i].src}
                    alt={PROPHECY_IMAGES[i].alt}
                    width={400}
                    height={200}
                    style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" }}
                  />
                </div>
                <div className="prophecy-card-content">
                  <div className="prophecy-who">
                    {p.who}
                    <small>{p.real}</small>
                  </div>
                  <div className="prophecy-columns">
                    <div>
                      <div className="prophecy-col-label warn">They Warned</div>
                      <p className="prophecy-warned">{p.warned}</p>
                    </div>
                    <div>
                      <div className="prophecy-col-label real">What Happened</div>
                      <p className="prophecy-reality">{p.reality}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
