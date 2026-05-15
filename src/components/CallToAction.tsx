"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { INVOLVEMENT } from "@/lib/constants";
import {
  Users, Megaphone, Landmark, ScrollText, Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Users, Megaphone, Landmark, ScrollText,
};

export default function CallToAction() {
  const [formData, setFormData] = useState({
    name: "", email: "", state: "", involvement: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const [first_name, ...lastNameParts] = formData.name.trim().split(" ");
    const last_name = lastNameParts.join(" ") || "N/A";

    const data = new FormData();
    data.append("form_slug", "anti-federalist-contact-form-2d0c8e80");
    data.append("source_url", window.location.href);
    if (document.referrer) data.append("referrer", document.referrer);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("utm_source")) data.append("utm_source", urlParams.get("utm_source")!);
    if (urlParams.has("utm_medium")) data.append("utm_medium", urlParams.get("utm_medium")!);
    if (urlParams.has("utm_campaign")) data.append("utm_campaign", urlParams.get("utm_campaign")!);

    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("email", formData.email);
    data.append("state", formData.state);
    data.append("how_can_we_help", formData.involvement);

    try {
      const res = await fetch("https://crm.basalthq.com/api/forms/submit", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert(result.error || "Submission failed");
      }
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section cta" id="join">
      <div className="section-inner">
        <ScrollReveal>
          <p className="section-label">The Movement</p>
          <h2 className="section-title">Join the Anti-Federalists</h2>
          <p className="section-subtitle">
            This is not a spectator movement. The original Anti-Federalists
            changed the Constitution with the force of their conviction.
            We intend to do the same.
          </p>
          <hr className="section-divider" />
        </ScrollReveal>

        <ScrollReveal>
          <div className="cta-hero-image">
            <img
              src="/images/movement-rising.png"
              alt="The movement rising at dawn"
              style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px", marginBottom: "1rem" }}
            />
          </div>
        </ScrollReveal>

        <div className="cta-grid">
          <ScrollReveal delay={1} className="h-full">
            <div className="cta-text h-full flex flex-col justify-center">
              <h3>The Republic Has Drifted.<br />Help Us Bring It Home.</h3>
              <p>
                Every signature of support strengthens our case for ballot
                access. Every volunteer expands our reach. Every voice
                amplifies the message that the people — not distant
                institutions — hold the sovereign authority.
              </p>
              <div className="cta-stats">
                <div className="cta-stat">
                  <div className="cta-stat-num">2026</div>
                  <div className="cta-stat-label">Founded</div>
                </div>
                <div className="cta-stat">
                  <div className="cta-stat-num">33</div>
                  <div className="cta-stat-label">Counties</div>
                </div>
                <div className="cta-stat">
                  <div className="cta-stat-num">∞</div>
                  <div className="cta-stat-label">Potential</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2} className="h-full">
            <div className="cta-form-card h-full backdrop-blur-xl backdrop-saturate-125">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <Zap size={40} strokeWidth={1.5} style={{ color: "var(--teal-bright)", marginBottom: "1rem" }} />
                  <h4>Welcome to the Movement</h4>
                  <p style={{ color: "var(--white-60)", marginTop: "0.5rem" }}>
                    The founders would be proud. We&apos;ll be in touch.
                  </p>
                </div>
              ) : (
                <>
                  <h4>Stand With Us</h4>
                  <p>Join the movement to restore the founders&apos; vision.</p>
                  <form className="cta-form" onSubmit={handleSubmit}>
                    <input type="text" className="cta-input backdrop-blur-md" placeholder="Full Name" required
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input type="email" className="cta-input backdrop-blur-md" placeholder="Email Address" required
                      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <div className="cta-input-row">
                      <input type="text" className="cta-input backdrop-blur-md" placeholder="State"
                        value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                      <select className="cta-select backdrop-blur-md" value={formData.involvement}
                        onChange={(e) => setFormData({ ...formData, involvement: e.target.value })}>
                        <option value="">How can you help?</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="donate">Donate</option>
                        <option value="run">Run for Office</option>
                        <option value="policy">Draft Policy</option>
                        <option value="spread">Spread the Word</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                      {isSubmitting ? "Joining..." : "Join the Anti-Federalists →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>

        <div className="involve-grid" style={{ marginTop: "5rem" }}>
          {INVOLVEMENT.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <ScrollReveal key={i} delay={i + 1} className="h-full">
                <div className="involve-card h-full flex flex-col backdrop-blur-xl backdrop-saturate-125">
                  <div className="involve-icon">
                    {Icon && <Icon size={32} strokeWidth={1.5} />}
                  </div>
                  <div className="involve-title">{item.title}</div>
                  <div className="involve-desc flex-grow">{item.desc}</div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
