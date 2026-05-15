import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

export default function Directories() {
  return (
    <section className="section" id="directories">
      <div className="section-inner">
        <ScrollReveal>
          <p className="section-label">Explore</p>
          <h2 className="section-title">The Network & Archive</h2>
          <hr className="section-divider" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 mt-16">
          <ScrollReveal delay={1} className="h-full">
            <Link href="/library/papers" className="block h-full">
              <div className="h-full flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl backdrop-saturate-125 bg-[#0D7377]/10 border border-[#2EC4B6]/20 shadow-2xl transition-all duration-300 hover:bg-[#0D7377]/20 hover:border-[#2EC4B6]/50 hover:-translate-y-2 group">
                <div className="w-full h-56 relative overflow-hidden">
                  <Image 
                    src="/images/historical_archive.png" 
                    alt="Historical Archive" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] to-transparent opacity-80" />
                </div>
                <div style={{ padding: "3rem 2.5rem" }} className="flex flex-col items-center text-center flex-grow">
                  <h3 style={{ textWrap: "balance" }} className="text-3xl font-[family-name:var(--font-display)] font-bold text-[#F0EDE6] mb-4">
                    The Historical Archive
                  </h3>
                  <p style={{ textWrap: "balance" }} className="text-[#F0EDE6]/70 mb-6 flex-grow text-[1.05rem] leading-relaxed max-w-sm">
                    Read the original Anti-Federalist Papers and speeches. We have compiled the foundational texts that warned of consolidated power into a massive, searchable database.
                  </p>
                  <div className="mt-auto text-[#2EC4B6] font-bold tracking-widest uppercase text-sm group-hover:text-white transition-colors">
                    Explore the Archive &rarr;
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={2} className="h-full">
            <Link href="/chapters" className="block h-full">
              <div className="h-full flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl backdrop-saturate-125 bg-[#0D7377]/10 border border-[#2EC4B6]/20 shadow-2xl transition-all duration-300 hover:bg-[#0D7377]/20 hover:border-[#2EC4B6]/50 hover:-translate-y-2 group">
                <div className="w-full h-56 relative overflow-hidden">
                  <Image 
                    src="/images/local_chapters.png" 
                    alt="Local Chapters Network" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] to-transparent opacity-80" />
                </div>
                <div style={{ padding: "3rem 2.5rem" }} className="flex flex-col items-center text-center flex-grow">
                  <h3 style={{ textWrap: "balance" }} className="text-3xl font-[family-name:var(--font-display)] font-bold text-[#F0EDE6] mb-4">
                    Local Chapters Directory
                  </h3>
                  <p style={{ textWrap: "balance" }} className="text-[#F0EDE6]/70 mb-6 flex-grow text-[1.05rem] leading-relaxed max-w-sm">
                    The movement is growing from the ground up. Find your local chapter, connect with the vanguard in your county, and take direct civic action.
                  </p>
                  <div className="mt-auto text-[#2EC4B6] font-bold tracking-widest uppercase text-sm group-hover:text-white transition-colors">
                    Find Your Chapter &rarr;
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
