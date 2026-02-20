'use client';

import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import FluidCursor from '@/components/FluidCursor';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import LoadingScreen from '@/components/LoadingScreen';

function MainContent() {
  const { colors, theme } = useTheme();
  
  return (
    <>
      <LoadingScreen />
      <FluidCursor />
      <Sidebar />
      <main
        style={{
          minHeight: '100vh',
          background: colors.background,
          transition: 'background 0.5s ease',
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <style jsx global>{`
        /* Mobile - bottom nav padding */
        @media (max-width: 768px) {
          main {
            padding-bottom: 100px;
          }
        }
      `}</style>
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}
