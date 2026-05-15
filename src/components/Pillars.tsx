import ScrollReveal from "./ScrollReveal";
import { PILLARS } from "@/lib/constants";
import { LockOpen, Zap, Scale, type LucideIcon } from "lucide-react";
import Image from "next/image";

const ICONS: Record<string, LucideIcon> = { LockOpen, Zap, Scale };
const PILLAR_IMAGES = [
  "/images/community-power.png",
  "/images/digital-sovereignty.png",
  "/images/surveillance-state.png",
];

export default function Pillars() {
  return (
    <section className="section pillars" id="pillars">
      <div className="section-inner">
        <ScrollReveal>
          <p className="section-label">The Foundation</p>
          <h2 className="section-title">Three Pillars of the New Compact</h2>
          <p className="section-subtitle">
            The original Anti-Federalists fought for the people&apos;s power
            over government. We extend that fight to every institution that
            governs modern life — corporate, algorithmic, and political.
          </p>
          <hr className="section-divider" />
        </ScrollReveal>

        <div className="pillars-grid">
          {PILLARS.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            return (
              <ScrollReveal key={i} delay={i + 1} className="h-full">
                <div className="pillar-card h-full flex flex-col bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl">
                  <div className="pillar-card-image">
                    <Image
                      src={PILLAR_IMAGES[i]}
                      alt={pillar.name}
                      width={400}
                      height={180}
                      style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" }}
                    />
                  </div>
                  <div className="pillar-icon">
                    {Icon && <Icon size={36} strokeWidth={1.5} />}
                  </div>
                  <h3 className="pillar-name">{pillar.name}</h3>
                  <p className="pillar-desc flex-grow">{pillar.desc}</p>
                  <ul className="pillar-points">
                    {pillar.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
