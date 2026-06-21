import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import AskSection from "@/components/AskSection";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className="flex-1">
        <Hero />
        <ProjectGrid />
        <AskSection />
        <About />
      </main>
      <Footer />
    </>
  );
}
