import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Stats from '@/components/Stats';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Projects />
      <Skills />
      <Experience />
      <CTA />
    </>
  );
}
