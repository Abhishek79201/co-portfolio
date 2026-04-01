'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

interface CaseStudyAnimationsProps {
  children: React.ReactNode;
  accentRgb: string; // e.g. "236,72,153"
}

export default function CaseStudyAnimations({ children, accentRgb }: CaseStudyAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      const { isDesktop, isMobile, reduceMotion } = context.conditions!;

      // All animated sections
      const sections = container.querySelectorAll('.cs-section');
      // All metric cards
      const cards = container.querySelectorAll('.metric-card');

      if (reduceMotion) {
        // Instant final state -- no motion (per D-15)
        gsap.set(sections, { opacity: 1, y: 0, clearProps: 'all' });
        gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
        return;
      }

      // Section reveals -- each section fades up on scroll entry (per D-06)
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: isMobile ? 20 : 40,
          duration: isMobile ? 0.4 : 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            once: true,
          },
        });
      });

      // Metric card stagger + accent flash (per D-08, UI-SPEC metric card flash spec)
      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
          delay: i * 0.08,
        });
        // Fade up
        tl.from(card, {
          opacity: 0, y: isMobile ? 15 : 30,
          duration: isMobile ? 0.3 : 0.5,
          ease: 'power3.out',
        });
        // Accent flash -- box-shadow glow (desktop only, skip on mobile for perf)
        if (isDesktop) {
          tl.to(card, {
            boxShadow: `0 0 20px rgba(${accentRgb},0.2)`,
            duration: 0.2, ease: 'power2.in',
          }, '>-0.1');
          tl.to(card, {
            boxShadow: '0 0 0px transparent',
            duration: 0.4, ease: 'power2.out',
          });
        }
      });
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}
