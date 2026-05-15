"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled backdrop-blur-2xl backdrop-saturate-150" : ""}`}>
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

      <ul className="navbar-links">
        <li><a href="/manifesto">Manifesto</a></li>
        <li><a href="/library/papers">Archive</a></li>
        <li><a href="/chapters">Chapters</a></li>
        <li><a href="/#join" className="navbar-cta">Join the Movement</a></li>
      </ul>

      <button className="navbar-mobile-toggle" aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
