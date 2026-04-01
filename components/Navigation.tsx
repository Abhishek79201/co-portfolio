'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Github, Linkedin, Mail } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  const pathname = usePathname();
  const router = useRouter();

  // Global scroll-based scrolled state (works on all routes)
  useEffect(() => {
    const onScrollGlobal = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScrollGlobal, { passive: true });
    onScrollGlobal();
    return () => window.removeEventListener('scroll', onScrollGlobal);
  }, []);

  // Homepage scroll-spy for active section
  useEffect(() => {
    if (pathname !== '/') return;

    const onScroll = () => {
      const ids = ['contact', 'projects', 'experience', 'about'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(id);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Set active state for non-homepage routes
  useEffect(() => {
    if (pathname.startsWith('/case-studies')) {
      setActive('case-studies');
    } else if (pathname !== '/') {
      setActive('');
    }
  }, [pathname]);

  const items = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && pathname !== '/') {
      e.preventDefault();
      router.push(`/${href}`);
    }
    // On homepage, default anchor behavior + Lenis smooth scroll handles it
    // For non-hash links like /case-studies, default Link behavior handles it
  };

  return (
    <header role="banner">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}
           aria-label="Main navigation">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <Link href="/" className="font-flagfies text-lg text-white hover:opacity-70 transition-opacity duration-300" aria-label="Abhishek Vaghela — Home">
              AV<span className="text-[var(--violet)]">.</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8" role="menubar">
              {items.map((item) => {
                const isActive = item.href.startsWith('#')
                  ? active === item.href.slice(1)
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    role="menuitem"
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Social */}
            <div className="hidden md:flex items-center gap-4">
              <a href="https://github.com/abhishekvaghela" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--text-muted)] hover:text-white transition-colors duration-300" aria-label="GitHub profile">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com/in/abhishekvaghela" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--text-muted)] hover:text-white transition-colors duration-300" aria-label="LinkedIn profile">
                <Linkedin size={16} />
              </a>
              <a href="mailto:vaghelaabhishek2580@gmail.com"
                 className="text-[var(--text-muted)] hover:text-white transition-colors duration-300" aria-label="Send email">
                <Mail size={16} />
              </a>
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden p-2 text-[var(--text-muted)]" onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen}>
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-px w-5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-px w-5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`h-px w-5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
               role="menu">
            <div className="border-t border-[var(--line)] pt-4 space-y-4 pb-2">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  role="menuitem"
                  className="block text-[var(--text-secondary)] hover:text-white text-sm transition-colors"
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-2" role="group" aria-label="Social links">
                <a href="https://github.com/abhishekvaghela" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-white" aria-label="GitHub"><Github size={16} /></a>
                <a href="https://linkedin.com/in/abhishekvaghela" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-white" aria-label="LinkedIn"><Linkedin size={16} /></a>
                <a href="mailto:vaghelaabhishek2580@gmail.com" className="text-[var(--text-muted)] hover:text-white" aria-label="Email"><Mail size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
