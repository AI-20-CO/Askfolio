'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'work', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: isScrolled ? '16px 0' : '24px 0',
          backgroundColor: isScrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
          backdropFilter: 'blur(12px)',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          
          {/* Logo */}
          <Link href="#home" style={{ 
            fontSize: '20px', 
            fontWeight: 300, 
            letterSpacing: '0.1em',
            color: '#ededed',
            textDecoration: 'none'
          }}>
            AYAAN<span style={{ color: '#c4a35a' }}>.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none' }} className="md:block">
            <ul style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '48px', 
              listStyle: 'none', 
              margin: 0, 
              padding: 0 
            }}>
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{
                      position: 'relative',
                      fontSize: '14px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: activeSection === item.href.slice(1) ? '#ededed' : '#666',
                      textDecoration: 'none',
                      padding: '8px 0',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ededed'}
                    onMouseLeave={(e) => {
                      if (activeSection !== item.href.slice(1)) {
                        e.currentTarget.style.color = '#666';
                      }
                    }}
                  >
                    {item.name}
                    {activeSection === item.href.slice(1) && (
                      <motion.span
                        layoutId="activeNav"
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: '#c4a35a',
                        }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'none',
              fontSize: '14px',
              letterSpacing: '0.1em',
              padding: '10px 20px',
              border: '1px solid #333',
              borderRadius: '999px',
              color: '#ededed',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
            className="md:inline-flex"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c4a35a';
              e.currentTarget.style.borderColor = '#c4a35a';
              e.currentTarget.style.color = '#0a0a0a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#333';
              e.currentTarget.style.color = '#ededed';
            }}
          >
            Let&apos;s Talk →
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#ededed',
                display: 'block',
                transformOrigin: 'center',
              }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#ededed',
                display: 'block',
              }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#ededed',
                display: 'block',
                transformOrigin: 'center',
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              backgroundColor: '#0a0a0a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="md:hidden"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                style={{ margin: '16px 0' }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    fontSize: '36px',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    color: activeSection === item.href.slice(1) ? '#c4a35a' : '#ededed',
                    textDecoration: 'none',
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
