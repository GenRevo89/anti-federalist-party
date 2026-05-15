import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Prophecy from "@/components/Prophecy";
import Pillars from "@/components/Pillars";
import Platform from "@/components/Platform";
import Origin from "@/components/Origin";
import OnChainTransparency from "@/components/OnChainTransparency";
import CallToAction from "@/components/CallToAction";
import Directories from "@/components/Directories";
import Footer from "@/components/Footer";
import SceneWrapper from "@/components/SceneWrapper";

export default function Home() {
  return (
    <SceneWrapper>
      <Navbar />
      <main>
        <Hero />
        <div className="scene-break" />
        <Prophecy />
        <div className="scene-break" />
        <Pillars />
        <div className="scene-break" />
        <Platform />
        <div className="scene-break" />
        <OnChainTransparency />
        <div className="scene-break" />
        <Origin />
        <div className="scene-break" />
        <Directories />
        <div className="scene-break" />
        <CallToAction />
      </main>
      <Footer />
    </SceneWrapper>
  );
}
