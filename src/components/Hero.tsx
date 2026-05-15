export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <p className="hero-est">Est. New Mexico · 2026</p>

        <h1 className="hero-title">
          THE<br />
          <em>ANTI-FEDERALIST</em><br />
          PARTY
        </h1>

        <hr className="hero-divider" />

        <p className="hero-pillars">
          ACCESS <span>·</span> AGENCY <span>·</span> ACCOUNTABILITY
        </p>

        <p className="hero-subtitle">
          Restoring the vision of the founders who foresaw what America
          would become — and fought to prevent it. The republic has drifted.
          It is time to bring it home.
        </p>

        <div className="hero-actions">
          <a href="#join" className="btn-primary">Join the Movement</a>
          <a href="#prophecy" className="btn-ghost">Read the Prophecy</a>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
