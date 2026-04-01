'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const [expCount, setExpCount] = useState(0);
  const [techCount, setTechCount] = useState(0);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section label — clip reveal
    const label = section.querySelector('.section-label');
    if (label) {
      gsap.fromTo(label,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: label, start: 'top 90%' } }
      );
    }

    // Heading — slide up
    const heading = section.querySelector('.section-heading');
    if (heading) {
      gsap.from(heading, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 85%' },
      });
    }

    // WORD-BY-WORD SCROLL REVEAL — the waabi.ai effect
    if (introRef.current) {
      const text = introRef.current.textContent || '';
      introRef.current.innerHTML = text.split(' ').map((word: string) =>
        `<span class="word-reveal-dim inline">${word}</span>`
      ).join(' ');

      const words = introRef.current.querySelectorAll('span');
      gsap.to(words, {
        className: 'word-reveal-lit inline',
        stagger: 0.08,
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 1,
        }
      });
    }

    // Stats — scale bounce in
    section.querySelectorAll('.stat-num').forEach((el, i) => {
      gsap.fromTo(el,
        { scale: 0.3, opacity: 0, y: 40 },
        {
          scale: 1, opacity: 1, y: 0, duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          delay: i * 0.1,
        }
      );
    });

    // Education — slide from left
    const edu = section.querySelector('.edu-block');
    if (edu) {
      gsap.fromTo(edu,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: edu, start: 'top 85%' } }
      );
    }

    // Skill groups — stagger slide from right
    section.querySelectorAll('.skill-group').forEach((el, i) => {
      gsap.fromTo(el,
        { x: 60, opacity: 0, rotate: 2 },
        {
          x: 0, opacity: 1, rotate: 0, duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          delay: i * 0.08,
        }
      );
    });

    // Skill pills — pop in
    section.querySelectorAll('.skill-pill').forEach((el, i) => {
      gsap.fromTo(el,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.35,
          ease: 'back.out(3)',
          scrollTrigger: { trigger: el, start: 'top 95%' },
          delay: i * 0.025,
        }
      );
    });
  }, { scope: sectionRef });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=0.1;setExpCount(Math.min(c,5));if(c>=5)clearInterval(iv)},30); }, 300);
        setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=1;setTechCount(Math.min(c,15));if(c>=15)clearInterval(iv)},45); }, 500);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(section);

    return () => { observer.disconnect(); };
  }, []);

  const skillGroups = [
    { label: 'Frontend', color: 'violet', items: ['JavaScript', 'React.js', 'Next.js 14', 'TypeScript', 'Redux', 'GSAP', 'Tailwind CSS'] },
    { label: 'Backend', color: 'cyan', items: ['Node.js', 'Express.js', 'TypeScript'] },
    { label: 'Database', color: 'pink', items: ['MongoDB', 'MySQL', 'Firebase', 'DynamoDB', 'Redis', 'OpenSearch'] },
    { label: 'DevOps', color: 'lime', items: ['Docker', 'AWS', 'CI/CD'] },
  ];

  return (
    <section id="about" ref={sectionRef} aria-label="About me" className="py-32 lg:py-44 content-auto">
      <div className="section-line" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32">

        <span className="section-label dev-mono text-xs text-[var(--violet)] tracking-[0.25em] uppercase block mb-8">01 / About</span>

        <h2 className="section-heading heading-lg text-white mb-12" aria-label="I build things for the web">
          I build things for the web.
        </h2>

        {/* Word-by-word scroll reveal paragraph */}
        <p ref={introRef} className="text-2xl sm:text-3xl lg:text-4xl font-light leading-snug text-white max-w-4xl mb-20" style={{ letterSpacing: '-0.02em' }}>
          Full Stack Developer with a strong MERN stack foundation. Started freelancing during college, went corporate to sharpen the craft, and now I bring startup speed with enterprise discipline to every product I ship.
        </p>

        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-20">
          {/* Left — stats + education */}
          <div className="lg:col-span-5">
            <div className="flex gap-14 mb-16">
              <div className="stat-num">
                <div className="dev-mono text-5xl lg:text-7xl font-bold text-white leading-none">
                  {expCount.toFixed(1)}<span className="text-[var(--violet)]">+</span>
                </div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mt-2">Years building</div>
              </div>
              <div className="stat-num">
                <div className="dev-mono text-5xl lg:text-7xl font-bold text-white leading-none">
                  {techCount}<span className="text-[var(--pink)]">+</span>
                </div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mt-2">Technologies</div>
              </div>
            </div>

            <div className="edu-block border-l-2 border-[var(--line-light)] pl-6">
              <div className="dev-mono text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase mb-2">Education / 2019 — 2023</div>
              <h3 className="text-white text-xl font-semibold mb-1">B.E. Computer Engineering</h3>
              <p className="text-[var(--text-secondary)] text-sm">Government Engineering College, Modasa</p>
              <span className="text-[var(--violet)] text-xs dev-mono mt-1 inline-block">NAAC A++</span>
            </div>
          </div>

          {/* Right — skills */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-32 space-y-8">
              <h3 className="dev-mono text-[10px] text-[var(--text-muted)] tracking-[0.25em] uppercase mb-6">Stack</h3>
              {skillGroups.map((group) => (
                <div key={group.label} className="skill-group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(--${group.color})` }} aria-hidden="true" />
                    <span className="text-white text-xs font-bold uppercase tracking-[0.15em]">{group.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <span key={tech} className={`skill-pill pill pill-${group.color} dev-mono`}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
