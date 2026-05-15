import { FOOTER_QUOTE } from "@/lib/constants";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-quote">
          <blockquote>&ldquo;{FOOTER_QUOTE.text}&rdquo;</blockquote>
          <cite>— {FOOTER_QUOTE.author}</cite>
        </div>

        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-about-title">
              <Image 
                src="/images/logo.png" 
                alt="Anti-Federalist Party" 
                width={20} 
                height={20} 
                style={{ filter: 'opacity(0.9)' }}
              />
              The Anti-Federalist Party
            </div>
            <p>
              A political movement born in New Mexico, built for the nation.
              Carrying forward the vision of the founders who understood that
              liberty is only preserved when power remains close to the people.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Movement</div>
            <ul>
              <li><a href="/manifesto">The Manifesto</a></li>
              <li><a href="/#pillars">Our Pillars</a></li>
              <li><a href="/#platform">The Platform</a></li>
              <li><a href="/chapters">State Chapters</a></li>
              <li><a href="/cities">Municipal Directory</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Resources</div>
            <ul>
              <li><a href="/library/papers">Anti-Federalist Papers</a></li>
              <li><a href="/refuting-the-federalist-papers">Refuting the Federalists</a></li>
              <li><a href="/compare/parties">Compare Parties</a></li>
              <li><a href="/compare/politicians">Compare Politicians</a></li>
              <li><a href="/founders">The Founders</a></li>
              <li><a href="/documents">Party Documents</a></li>
              <li><a href="/manifesto">Policy Library</a></li>
              <li><a href="/#join">Join Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Connect</div>
            <ul>
              <li><a href="mailto:contact@antifederalist.org">Contact</a></li>
              <li><a href="https://x.com" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="/#join">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 The Anti-Federalist Party. All rights reserved.</span>
          <div className="footer-origin">
            <span style={{ display: "inline-flex", gap: "2px" }}>
              <span style={{ display: "block", width: "2px", height: "10px", background: "var(--teal-bright)", borderRadius: "1px" }} />
              <span style={{ display: "block", width: "2px", height: "10px", background: "var(--teal-bright)", borderRadius: "1px" }} />
              <span style={{ display: "block", width: "2px", height: "10px", background: "var(--teal-bright)", borderRadius: "1px" }} />
            </span>
            Born in New Mexico
          </div>
        </div>
      </div>
    </footer>
  );
}
