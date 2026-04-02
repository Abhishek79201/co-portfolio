'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const experiences = [
  {
    company: 'CareerBox.in', role: 'Full Stack Developer',
    location: 'Remote', duration: 'Mar 2025 — Present', current: true, accent: 'cyan',
    description: 'Building and scaling a modern career platform connecting job seekers with opportunities. Developing end-to-end features with a focus on performance, SEO, and seamless user experience.',
  },
  {
    company: 'Screenplay', role: 'Full Stack Developer',
    location: 'Remote', duration: 'Nov 2024 — Mar 2025', current: false, accent: 'violet',
    description: 'Spearheading backend development for a creative platform empowering writers and producers. Built rich editor experience with Prose Mirror & Tiptap, designed scalable real-time collaboration architectures.',
  },
  {
    company: 'Xbyte Solutions', role: 'Full Stack Developer',
    location: 'Ahmedabad', duration: 'Aug 2023 — Nov 2024', current: false, accent: 'pink',
    description: 'Owned full-stack development for internal products end-to-end. Built scalable MERN applications, managed AWS infrastructure and DevOps pipelines across multiple project lifecycles.',
  },
  {
    company: 'Simform Solutions', role: 'Full Stack Developer',
    location: 'Ahmedabad', duration: 'Feb 2023 — Jul 2023', current: false, accent: 'cyan',
    description: 'Developed 18+ responsive web apps optimized for SEO & performance. Built secure API dashboards, integrated analytics tools, maintained rigorous documentation and testing standards.',
  },
  {
    company: 'Impactoverse', role: 'Frontend Developer',
    location: 'Remote', duration: 'Jul 2021 — Dec 2022', current: false, accent: 'lime',
    description: 'Designed and built visually engaging React.js applications with complex animations. Optimized rendering performance through careful state management and lifecycle optimization.',
  },
];

const Experience = () => {
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
      const { isDesktop, isMobile, reduceMotion } = context.conditions!;

      if (reduceMotion) {
        // Instant final state -- no motion (per D-15)
        const allAnimated = section.querySelectorAll('.section-label, .section-heading, .exp-row');
        gsap.set(allAnimated, { opacity: 1, x: 0, y: 0, clearProps: 'all' });
        return;
      }

      // Label clip reveal
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

      // Experience rows -- alternating x slide, NO rotation (per UI-SPEC easing overhaul)
      section.querySelectorAll('.exp-row').forEach((row, i) => {
        const fromX = i % 2 === 0
          ? (isMobile ? -30 : -80)
          : (isMobile ? 30 : 80);
        gsap.fromTo(row,
          { x: fromX, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: isMobile ? 0.4 : 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          }
        );
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="experience" ref={sectionRef} aria-label="Work experience" className="py-32 lg:py-44 content-auto">
      <div className="section-line" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32">

        <span className="section-label dev-mono text-xs text-[var(--pink)] tracking-[0.25em] uppercase block mb-8">02 / Experience</span>
        <h2 className="section-heading heading-lg text-white mb-20" aria-label="Where we've worked">
          Where we've worked.
        </h2>

        <div role="list" aria-label="Work experience">
          {experiences.map((exp, i) => (
            <article key={i} className="exp-row border-t border-[var(--line)] py-10 lg:py-14" role="listitem">
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: `var(--${exp.accent})` }} aria-hidden="true">
                      {exp.current && <span className="block w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: `var(--${exp.accent})`, opacity: 0.5 }} />}
                    </div>
                    <h3 className="text-white text-xl lg:text-2xl font-semibold">{exp.role}</h3>
                  </div>
                  <div className="ml-5 flex items-center gap-3 text-sm">
                    <span style={{ color: `var(--${exp.accent})` }} className="font-medium">{exp.company}</span>
                    {exp.current && <span className={`pill pill-${exp.accent} text-[9px] uppercase font-bold tracking-wider`}>Now</span>}
                  </div>
                  <div className="ml-5 dev-mono text-[10px] text-[var(--text-muted)] mt-1.5">{exp.duration} / {exp.location}</div>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-[var(--text-secondary)] leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </article>
          ))}
          <div className="border-t border-[var(--line)]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
