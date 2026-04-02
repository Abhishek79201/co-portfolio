'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

const Projects = () => {
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
        // Scramble hover effect still works (it's a callback, not GSAP animation)
        const allAnimated = section.querySelectorAll('.section-label, .section-heading, .project-row, .cta-row');
        gsap.set(allAnimated, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'all' });
        return;
      }

      // Label -- clip reveal
      const label = section.querySelector('.section-label');
      if (label) {
        gsap.fromTo(label,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut',
            scrollTrigger: { trigger: label, start: 'top 90%' } }
        );
      }

      // Heading -- slide up
      const heading = section.querySelector('.section-heading');
      if (heading) {
        gsap.from(heading, {
          y: isMobile ? 30 : 60, opacity: 0,
          duration: isMobile ? 0.4 : 1, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        });
      }

      // Project rows -- y + opacity + scale, NO rotation on mobile (simplified per D-13)
      section.querySelectorAll('.project-row').forEach((row, i) => {
        gsap.fromTo(row,
          {
            y: isMobile ? 30 : 60,
            opacity: 0,
            scale: isMobile ? 1 : 0.97,
          },
          {
            y: 0, opacity: 1, scale: 1,
            duration: isMobile ? 0.4 : 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 92%' },
            delay: i * 0.06,
          }
        );
      });

      // CTA
      const cta = section.querySelector('.cta-row');
      if (cta) {
        gsap.fromTo(cta,
          { y: isMobile ? 15 : 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: isMobile ? 0.3 : 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: cta, start: 'top 90%' },
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} aria-label="Featured projects" className="py-32 lg:py-44 content-auto">
      <div className="section-line" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32">

        <span className="section-label dev-mono text-xs text-[var(--cyan)] tracking-[0.25em] uppercase block mb-8">03 / Projects</span>
        <h2 className="section-heading heading-lg text-white mb-20" aria-label="Selected work">
          Selected work.
        </h2>

        <div role="list" aria-label="Featured projects">
          <div className="border-t border-[var(--line)]" aria-hidden="true" />
          {projects.map((project, i) => {
            const isLive = Boolean(project.liveUrl);
            const Tag = isLive ? 'a' : 'div';
            const linkProps = isLive
              ? {
                  href: project.liveUrl,
                  target: '_blank' as const,
                  rel: 'noopener noreferrer',
                }
              : {};

            return (
              <Tag
                key={i}
                {...linkProps}
                className="project-row block group"
                data-accent={project.accent}
                role="listitem"
                aria-label={
                  isLive
                    ? `${project.title} — ${project.subtitle}. Visit ${project.liveUrl}`
                    : `${project.title} — ${project.subtitle}`
                }
              >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="flex items-baseline gap-4 lg:gap-6">
                    <span className="dev-mono text-xs text-[var(--text-muted)] tabular-nums" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                    <h3 className="project-title text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white"
                        data-text={project.title}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-5 lg:gap-8 ml-8 lg:ml-0">
                    <span className="text-xs text-[var(--text-muted)] hidden sm:block">{project.subtitle}</span>
                    <div className="hidden md:flex gap-1.5">
                      {project.tech.slice(0,3).map((t) => (
                        <span key={t} className={`pill pill-${project.accent} dev-mono text-[9px]`}>{t}</span>
                      ))}
                      {project.tech.length > 3 && <span className={`pill pill-${project.accent} dev-mono text-[9px]`}>+{project.tech.length-3}</span>}
                    </div>
                    {isLive && (
                      <ArrowUpRight size={18} className="project-arrow text-[var(--text-muted)] group-hover:text-white flex-shrink-0" aria-hidden="true" />
                    )}
                  </div>
                </div>

                <div className="project-details ml-8 lg:ml-[3.25rem]">
                  <p className="text-[var(--text-secondary)] max-w-2xl leading-relaxed text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3 sm:hidden">
                    {project.tech.map((t) => <span key={t} className={`pill pill-${project.accent} dev-mono text-[9px]`}>{t}</span>)}
                  </div>
                </div>
              </Tag>
            );
          })}
        </div>

        <div className="cta-row mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
          <p className="text-[var(--text-muted)] text-xs dev-mono">More on GitHub</p>
          <a href="https://github.com/abhishekvaghela" target="_blank" rel="noopener noreferrer"
             className="magnetic-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-[var(--violet)] hover:text-white transition-colors duration-300">
            View GitHub <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
