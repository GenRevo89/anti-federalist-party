"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Solid fullscreen backdrop that covers everything when menu is open */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#08080F',
            zIndex: 98,
          }}
        />
      )}

      <nav
        className={`navbar ${scrolled || menuOpen ? "scrolled" : ""}`}
        style={{ zIndex: 100, background: menuOpen ? '#08080F' : undefined }}
      >
        <a href="/" className="navbar-brand" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image 
            src="/images/logo.png" 
            alt="Anti-Federalist Logo" 
            width={32} 
            height={32} 
            className="navbar-logo"
          />
          Anti-Federalist
        </a>

        <ul
          className={`navbar-links ${menuOpen ? "open" : ""}`}
          style={menuOpen ? { background: '#08080F', zIndex: 99 } : undefined}
        >
          <li><a href="/manifesto" onClick={() => setMenuOpen(false)}>Manifesto</a></li>
          <li><a href="/library/papers" onClick={() => setMenuOpen(false)}>Archive</a></li>
          <li><a href="/transparency" onClick={() => setMenuOpen(false)}>Transparency</a></li>
          <li><a href="/chapters" onClick={() => setMenuOpen(false)}>Chapters</a></li>
          <li><a href="/#join" className="navbar-cta" onClick={() => setMenuOpen(false)}>Join the Movement</a></li>
        </ul>

        <button
          className="navbar-mobile-toggle"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}} />
        </button>
      </nav>
    </>
  );
}
