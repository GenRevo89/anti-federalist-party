import ScrollReveal from "./ScrollReveal";
import { PLATFORM } from "@/lib/constants";
import {
  Briefcase, Cpu, Globe, HeartPulse, BookOpen, Shield,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Briefcase, Cpu, Globe, HeartPulse, BookOpen, Shield,
};

export default function Platform() {
  return (
    <section className="section platform" id="platform">
      <div className="section-inner">
        <ScrollReveal>
          <p className="section-label">The Blueprint</p>
          <h2 className="section-title">The Platform</h2>
          <p className="section-subtitle">
            Concrete policy positions across the domains that matter most.
            Not platitudes — actionable commitments grounded in the
            Anti-Federalist principle that power belongs closest to the people.
          </p>
          <hr className="section-divider" />
        </ScrollReveal>

        <div className="platform-grid">
          {PLATFORM.map((cat, i) => {
            const Icon = ICONS[cat.icon];
            return (
              <ScrollReveal key={i} delay={Math.min(i + 1, 5)} className="h-full">
                <div className="platform-card h-full flex flex-col backdrop-blur-xl backdrop-saturate-125">
                  <div className="platform-card-icon">
                    {Icon && <Icon size={28} strokeWidth={1.5} />}
                  </div>
                  <h3 className="platform-card-title">{cat.title}</h3>
                  <ul className="platform-card-positions flex-grow">
                    {cat.positions.map((pos, j) => (
                      <li key={j}>{pos}</li>
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
