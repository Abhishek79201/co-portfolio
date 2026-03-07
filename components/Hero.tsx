'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STACK = ['REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'MONGODB', 'AWS', 'DOCKER', 'REDIS'];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&';

// Pre-render characters in JSX so text is visible without JS (good LCP)
const CharLine = ({ text, className, innerRef }: { text: string; className: string; innerRef: React.Ref<HTMLSpanElement> }) => (
  <span ref={innerRef} className={className} aria-hidden="true">
    {text.split('').map((c, i) => (
      <span key={i} className="hero-char inline-block">{c}</span>
    ))}
  </span>
);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const name1Ref = useRef<HTMLSpanElement>(null);
  const name2Ref = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);

  const [corpCount, setCorpCount] = useState(0);
  const [freeCount, setFreeCount] = useState(0);
  const [projCount, setProjCount] = useState(0);

  const scramble = useCallback((el: HTMLElement, finalText: string) => {
    let iteration = 0;
    const interval = setInterval(() => {
      el.innerText = finalText.split('').map((char, i) => {
        if (i < iteration) return char;
        if (char === ' ') return ' ';
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
      if (iteration >= finalText.length) clearInterval(interval);
      iteration += 0.5;
    }, 22);
  }, []);

  // Mouse parallax for blobs (passive, debounced)
  const onMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    if (blob1.current) gsap.to(blob1.current, { x: x * 35, y: y * 25, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
    if (blob2.current) gsap.to(blob2.current, { x: x * -25, y: y * -18, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      // Blobs — fade in (no blur, just opacity + scale)
      [blob1, blob2].forEach((b, i) => {
        if (!b.current) return;
        tl.from(b.current, { scale: 0.6, opacity: 0, duration: 1.8, ease: 'power2.out' }, i * 0.1);
      });

      // Name chars — gsap.from() so text is visible by default (great for LCP)
      // Characters animate FROM hidden TO their natural visible state
      [name1Ref, name2Ref].forEach((ref, lineIdx) => {
        if (!ref.current) return;
        const chars = ref.current.querySelectorAll('.hero-char');
        tl.from(chars, {
          opacity: 0, y: '140%',
          rotation: () => (Math.random() - 0.5) * 30,
          scale: 0.5,
          duration: 1.2, stagger: 0.025,
          ease: 'elastic.out(1, 0.55)',
        }, 0.1 + lineIdx * 0.1);
      });

      // Role — scramble decode
      if (roleRef.current) {
        tl.from(roleRef.current, { opacity: 0, duration: 0.01 }, 0.5);
        tl.call(() => { if (roleRef.current) scramble(roleRef.current, 'FULL STACK DEVELOPER'); }, [], 0.5);
      }

      // Description — clip reveal from left
      if (descRef.current) {
        tl.from(descRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1, ease: 'power3.inOut',
        }, 0.85);
      }

      // CTA — bounce in
      if (ctaRef.current?.children) {
        tl.from(ctaRef.current.children, {
          opacity: 0, y: 25, scale: 0.85,
          duration: 0.7, stagger: 0.08, ease: 'back.out(2.5)',
        }, 1.1);
      }

      // Marquee
      if (marqueeRef.current) {
        tl.from(marqueeRef.current, { opacity: 0, x: 50, duration: 0.8, ease: 'power3.out' }, 1.0);
      }

      // Stats
      if (statsRef.current?.children) {
        tl.from(statsRef.current.children, {
          opacity: 0, y: 30, scale: 0.85,
          duration: 0.6, stagger: 0.1, ease: 'back.out(3)',
        }, 1.3);
      }

      // SCROLL-LINKED: Name parallaxes up faster + fades
      [name1Ref, name2Ref].forEach((ref) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          y: -180, opacity: 0.2, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
      });

      // Blob scroll parallax
      [blob1, blob2].forEach((b, i) => {
        if (!b.current) return;
        gsap.to(b.current, {
          y: -250 - i * 80, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        });
      });
    }, sectionRef);

    // Counters
    setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=0.1;setCorpCount(Math.min(c,2.5));if(c>=2.5)clearInterval(iv)},22); }, 1600);
    setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=0.1;setFreeCount(Math.min(c,2));if(c>=2)clearInterval(iv)},28); }, 1800);
    setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=1;setProjCount(Math.min(c,18));if(c>=18)clearInterval(iv)},38); }, 2000);

    return () => { ctx.revert(); window.removeEventListener('mousemove', onMouseMove); };
  }, [scramble, onMouseMove]);

  const marqueeText = STACK.map(s => `${s}  /  `).join('');

  return (
    <section ref={sectionRef} aria-label="Introduction" className="min-h-[100dvh] flex flex-col relative overflow-hidden">

      {/* Ambient blobs — NO blur (expensive paint), just radial gradient with opacity */}
      <div ref={blob1} className="absolute -top-32 right-[-8%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full animate-blob pointer-events-none opacity-60"
           style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.14), transparent 65%)' }} aria-hidden="true" />
      <div ref={blob2} className="absolute bottom-[-8%] left-[-8%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full animate-blob pointer-events-none opacity-50"
           style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent 65%)', animationDelay: '-4s' }} aria-hidden="true" />

      <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 xl:px-24 pt-24 pb-6 relative z-10">
        <div className="max-w-[1400px] mx-auto w-full">

          {/* Availability */}
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lime)]" />
            </span>
            <span className="dev-mono text-[11px] text-[var(--text-muted)] tracking-[0.2em] uppercase">Available for work</span>
          </div>

          {/* Name — pre-rendered chars, visible by default */}
          <h1 className="mb-3">
            <span className="sr-only">Abhishek Vaghela — Full Stack Developer</span>
            <CharLine text="Abhishek" className="heading-brutal block text-white" innerRef={name1Ref} />
            <CharLine text="Vaghela" className="heading-brutal block text-outline" innerRef={name2Ref} />
          </h1>

          {/* Role — scramble effect */}
          <div ref={roleRef} className="dev-mono text-sm sm:text-base text-[var(--text-muted)] tracking-[0.15em] mt-3 mb-7" aria-hidden="true">
            FULL STACK DEVELOPER
          </div>

          {/* Description — clip reveal */}
          <p ref={descRef} className="text-body max-w-lg mb-7" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
            Building scalable products for 4.5+ years across corporate and freelance.
            Turning complex problems into clean, performant code that users love.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <a href="#projects"
               className="magnetic-btn inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-[var(--violet)] hover:text-white transition-colors duration-300"
               aria-label="View featured projects">
              See my work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#contact"
               className="magnetic-btn inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-[var(--text-secondary)] border border-[var(--line-light)] hover:text-white hover:border-white/20 transition-all duration-300"
               aria-label="Get in touch">
              Let's talk
            </a>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div ref={marqueeRef} className="border-y border-[var(--line)] py-3" aria-hidden="true">
        <div className="animate-marquee whitespace-nowrap">
          <span className="dev-mono text-[10px] text-[var(--text-muted)] tracking-[0.3em]">{marqueeText}{marqueeText}</span>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="px-6 lg:px-16 xl:px-24 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-end gap-x-14 gap-y-3">
          <div>
            <span className="dev-mono text-2xl sm:text-3xl font-bold text-white">{corpCount.toFixed(1)}<span className="text-[var(--violet)]">+</span></span>
            <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">Yrs Corporate</span>
          </div>
          <div>
            <span className="dev-mono text-2xl sm:text-3xl font-bold text-white">{freeCount.toFixed(0)}<span className="text-[var(--pink)]">+</span></span>
            <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">Yrs Freelance</span>
          </div>
          <div>
            <span className="dev-mono text-2xl sm:text-3xl font-bold text-white">{projCount}<span className="text-[var(--cyan)]">+</span></span>
            <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">Projects</span>
          </div>
          <div className="hidden lg:flex flex-1 justify-end">
            <a href="#about" className="dev-mono text-[10px] text-[var(--text-muted)] hover:text-white tracking-[0.2em] uppercase transition-colors flex items-center gap-2" aria-label="Scroll down">
              Scroll
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="animate-bounce" aria-hidden="true">
                <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
