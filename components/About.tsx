'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, SplitText, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { team } from '@/data/team';
import { Github, Linkedin } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const [yearsCount, setYearsCount] = useState(0);
  const [shippedCount, setShippedCount] = useState(0);
  const [techCount, setTechCount] = useState(0);

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
        gsap.set(
          section.querySelectorAll('.section-label, .section-heading, .stat-num, .team-card, .skill-pill'),
          { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'all' }
        );
        if (introRef.current) gsap.set(introRef.current, { opacity: 1, clearProps: 'all' });
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

      // Word-by-word scroll reveal (narrative paragraph)
      if (introRef.current) {
        SplitText.create(introRef.current, {
          type: 'words',
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(self.words,
              { opacity: 0.15, color: 'var(--text-muted)' },
              { opacity: 1, color: 'var(--text)', stagger: 0.04,
                scrollTrigger: {
                  trigger: introRef.current,
                  start: 'top 75%', end: 'bottom 40%', scrub: 1,
                }
              }
            );
          }
        });
      }

      // Stat numbers scale in
      section.querySelectorAll('.stat-num').forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0.85, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0,
            duration: isMobile ? 0.3 : 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' }, delay: i * 0.1 }
        );
      });

      // Team cards slide from right, staggered
      section.querySelectorAll('.team-card').forEach((el, i) => {
        gsap.fromTo(el,
          { x: isMobile ? 20 : 40, opacity: 0 },
          { x: 0, opacity: 1,
            duration: isMobile ? 0.4 : 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }, delay: i * 0.12 }
        );
      });

      // Skill pills pop in with stagger (capped at 8)
      section.querySelectorAll('.skill-pill').forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1,
            duration: isMobile ? 0.2 : 0.35,
            ease: isMobile ? 'power2.out' : 'back.out(3)',
            scrollTrigger: { trigger: el, start: 'top 95%' },
            delay: Math.min(i, 8) * 0.015 }
        );
      });
    });
  }, { scope: sectionRef });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Counter 1: "8" (Combined Years) -- integer, increment by 1
        setTimeout(() => { let c = 0; const iv = setInterval(() => { c += 1; setYearsCount(Math.min(c, 8)); if (c >= 8) clearInterval(iv); }, 60); }, 300);
        // Counter 2: "6" (Products Shipped) -- integer, increment by 1
        setTimeout(() => { let c = 0; const iv = setInterval(() => { c += 1; setShippedCount(Math.min(c, 6)); if (c >= 6) clearInterval(iv); }, 80); }, 500);
        // Counter 3: "50" (Technologies) -- integer, increment by 1
        setTimeout(() => { let c = 0; const iv = setInterval(() => { c += 1; setTechCount(Math.min(c, 50)); if (c >= 50) clearInterval(iv); }, 30); }, 400);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(section);
    return () => { observer.disconnect(); };
  }, []);

  const pillColors = ['violet', 'cyan', 'pink', 'lime'];

  return (
    <section id="team" ref={sectionRef} aria-label="About the studio" className="pt-12 pb-32 lg:pt-16 lg:pb-44 content-auto">
      <div className="section-line" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-16">

        <span className="section-label dev-mono text-xs text-[var(--violet)] tracking-[0.25em] uppercase block mb-8">01 / About</span>

        <h2 className="section-heading heading-lg text-white mb-12">We build together.</h2>

        {/* Studio narrative -- word-by-word scroll reveal */}
        <p ref={introRef}
           className="text-white max-w-4xl mb-20"
           style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
          Two GEC Modasa alumni who&apos;ve been the go-to dev agency for companies like X-Byte Solutions
          and Screenplay — shipping their most critical products as indie partners. We&apos;ve built dating
          apps, career platforms, marketplace tools, and contributed to OpenSearch — together. Dev
          Studio is what happens when two builders who ship together start shipping for you.
        </p>

        {/* Studio stats counters */}
        <div className="flex flex-wrap gap-14 mb-16">
          <div className="stat-num">
            <div className="dev-mono font-bold text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
              {yearsCount}<span className="text-[var(--violet)]">+</span>
            </div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mt-2">Combined Years</div>
          </div>
          <div className="stat-num">
            <div className="dev-mono font-bold text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
              {shippedCount}<span className="text-[var(--pink)]">+</span>
            </div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mt-2">Products Shipped</div>
          </div>
          <div className="stat-num">
            <div className="dev-mono font-bold text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
              {techCount}<span className="text-[var(--cyan)]">+</span>
            </div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mt-2">Technologies</div>
          </div>
        </div>

        {/* Team cards grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member) => {
            const initials = member.name.split(' ').map(n => n[0]).join('');
            return (
              <div key={member.name} className="team-card bg-[var(--line)] border border-[var(--line-light)] rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-[var(--violet)] flex items-center justify-center mb-4">
                  <span className="dev-mono text-sm font-bold text-white">{initials}</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight mb-1">{member.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]" style={{ lineHeight: 1.4 }}>{member.role}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.skills.map((skill, si) => (
                    <span key={skill} className={`skill-pill pill pill-${pillColors[si % 4]} dev-mono`}>{skill}</span>
                  ))}
                </div>
                <div className="flex gap-1 mt-4">
                  <a href={member.github} target="_blank" rel="noopener noreferrer"
                     aria-label={`${member.name} on GitHub`}
                     className="p-3 text-[var(--text-muted)] hover:text-white transition-colors duration-300">
                    <Github size={16} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                     aria-label={`${member.name} on LinkedIn`}
                     className="p-3 text-[var(--text-muted)] hover:text-white transition-colors duration-300">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
