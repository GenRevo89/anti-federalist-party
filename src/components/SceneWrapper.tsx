"use client";

import { useEffect, useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function SceneWrapper({ children, theme = 'main' }: { children: ReactNode, theme?: 'main' | 'library' | 'chapters' | 'county' }) {
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = h > 0 ? window.scrollY / h : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scene-fixed">
        <ThreeScene scrollRef={scrollRef} theme={theme} />
      </div>
      <div className="scene-content">
        {children}
      </div>
    </>
  );
}
