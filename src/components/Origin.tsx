import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

export default function Origin() {
  return (
    <section className="origin" id="origin">
      <div className="origin-image-wrap">
        <Image
          src="/images/nm-landscape.png"
          alt="New Mexico mesa landscape at golden hour"
          width={1920}
          height={800}
          priority
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="origin-overlay" />
      </div>
      <div className="origin-content">
        <ScrollReveal>
          <p className="section-label">The Origin</p>
          <h2 className="origin-title">Born in the Land of Enchantment</h2>
          <hr className="section-divider" style={{ margin: "2rem auto" }} />
          <p className="origin-text">
            New Mexico — where the legendary light reveals everything and hides nothing.
            Where the distance between the people and their government has always been
            measured in more than miles. Where communities have governed themselves since
            before the republic existed.
          </p>
          <p className="origin-text">
            This is where the Anti-Federalist Party was born — not in a boardroom or a
            think tank, but in the recognition that the founders who feared consolidation
            were right. The system has become exactly what they warned it would become.
            And the correction must begin here, from the ground up, the way they intended.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
