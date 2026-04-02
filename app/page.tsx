import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Methodology from '@/components/Methodology';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <Experience />
        <Methodology />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
