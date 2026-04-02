'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

const steps = [
  {
    num: '01 /',
    title: 'Discover',
    body: 'Two weeks of questions before a single line of code. We map your domain, users, and constraints into a technical spec you can read.',
  },
  {
    num: '02 /',
    title: 'Build MVP',
    body: 'Ship the smallest version that proves the idea. Real tech, real users \u2014 no mock-ups masquerading as products.',
  },
  {
    num: '03 /',
    title: 'Iterate',
    body: 'Weekly cycles. You review, we refine. Every feedback loop tightens the product toward what actually works.',
  },
  {
    num: '04 /',
    title: 'Scale',
    body: 'Once the pattern is proven, we harden it \u2014 caching layers, optimized queries, infrastructure that grows with demand.',
  },
];

const Methodology = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add({
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      const { isMobile, reduceMotion } = context.conditions!;

      if (reduceMotion) {
        gsap.set(
          section.querySelectorAll('.section-label, .section-heading, .step-block'),
          { opacity: 1, y: 0, clearProps: 'all' }
        );
        return;
      }

      // Section label clip reveal
      const label = section.querySelector('.section-label');
      if (label) {
        gsap.fromTo(label,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut',
            scrollTrigger: { trigger: label, start: 'top 90%' } }
        );
      }

      // Heading slide up
      const heading = section.querySelector('.section-heading');
      if (heading) {
        gsap.from(heading, {
          y: isMobile ? 30 : 60, opacity: 0,
          duration: isMobile ? 0.4 : 1, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        });
      }

      // Step blocks stagger reveal
      section.querySelectorAll('.step-block').forEach((el, i) => {
        gsap.fromTo(el,
          { y: isMobile ? 20 : 40, opacity: 0 },
          { y: 0, opacity: 1,
            duration: isMobile ? 0.4 : 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
            delay: i * 0.15 }
        );
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="methodology" ref={sectionRef} aria-label="How we work" className="py-32 lg:py-44 content-auto">
      <div className="section-line" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32">
        <span className="section-label dev-mono text-xs text-[var(--violet)] tracking-[0.25em] uppercase block mb-8">
          04 / How We Work
        </span>
        <h2 className="section-heading heading-lg text-white mb-12">
          Our process.
        </h2>
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step) => (
            <div key={step.num} className="step-block">
              <div className="dev-mono font-bold text-[var(--violet)] leading-none mb-3"
                   style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
                {step.num}
              </div>
              <h3 className="text-sm font-bold text-white leading-tight mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]" style={{ lineHeight: 1.6 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
