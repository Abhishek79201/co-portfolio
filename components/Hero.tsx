'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STACK = ['REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'MONGODB', 'AWS', 'DOCKER', 'REDIS'];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>{}[]';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const name1Ref = useRef<HTMLDivElement>(null);
  const name2Ref = useRef<HTMLDivElement>(null);
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

  // Text scramble effect
  const scramble = useCallback((el: HTMLElement, finalText: string, delay: number = 0) => {
    setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        el.innerText = finalText.split('').map((char, i) => {
          if (i < iteration) return char;
          if (char === ' ') return ' ';
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('');
        if (iteration >= finalText.length) clearInterval(interval);
        iteration += 0.4;
      }, 25);
    }, delay);
  }, []);

  // Mouse parallax for blobs
  const onMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    if (blob1.current) gsap.to(blob1.current, { x: x * 40, y: y * 30, duration: 1.2, ease: 'power2.out' });
    if (blob2.current) gsap.to(blob2.current, { x: x * -30, y: y * -20, duration: 1.2, ease: 'power2.out' });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);

    const ctx = gsap.context(() => {
      const master = gsap.timeline({ delay: 0.1 });

      // Blobs — scale in
      [blob1, blob2].forEach((b, i) => {
        if (b.current) {
          gsap.set(b.current, { scale: 0, opacity: 0 });
          master.to(b.current, { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, i * 0.15);
        }
      });

      // Name lines — chars fly in with EXTREME spring + rotation
      [name1Ref, name2Ref].forEach((ref, lineIdx) => {
        if (!ref.current) return;
        const text = ref.current.dataset.text || '';
        ref.current.innerHTML = text.split('').map((c: string) =>
          `<span class="inline-block will-change-transform" style="opacity:0;transform:translateY(140%) rotate(${(Math.random()-0.5)*30}deg) scale(0.5)">${c === ' ' ? '&nbsp;' : c}</span>`
        ).join('');
        master.to(ref.current.querySelectorAll('span'), {
          opacity: 1, y: '0%', rotation: 0, scale: 1,
          duration: 1.2, stagger: 0.025, ease: 'elastic.out(1, 0.5)'
        }, 0.15 + lineIdx * 0.12);
      });

      // Role — scramble decode
      if (roleRef.current) {
        gsap.set(roleRef.current, { opacity: 0 });
        master.to(roleRef.current, { opacity: 1, duration: 0.01 }, 0.6);
        master.call(() => {
          if (roleRef.current) scramble(roleRef.current, 'FULL STACK DEVELOPER', 0);
        }, [], 0.6);
      }

      // Description — clip reveal from left
      if (descRef.current) {
        gsap.set(descRef.current, { clipPath: 'inset(0 100% 0 0)', opacity: 1 });
        master.to(descRef.current, {
          clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut'
        }, 1.0);
      }

      // CTA — slide + scale with bounce
      if (ctaRef.current?.children) {
        gsap.set(ctaRef.current.children, { opacity: 0, y: 30, scale: 0.8 });
        master.to(ctaRef.current.children, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(2.5)'
        }, 1.3);
      }

      // Marquee
      if (marqueeRef.current) {
        gsap.set(marqueeRef.current, { opacity: 0, x: 60 });
        master.to(marqueeRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, 1.1);
      }

      // Stats — counter bounce
      if (statsRef.current?.children) {
        gsap.set(statsRef.current.children, { opacity: 0, y: 40, scale: 0.8 });
        master.to(statsRef.current.children, {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(3)'
        }, 1.5);
      }

      // SCROLL-LINKED: Name parallaxes up 1.5x faster + slight scale
      [name1Ref, name2Ref].forEach((ref) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          y: -200, scale: 0.95, opacity: 0.3, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current, start: 'top top',
            end: 'bottom top', scrub: 0.8,
          }
        });
      });

      // Blobs parallax
      [blob1, blob2].forEach((b, i) => {
        if (!b.current) return;
        gsap.to(b.current, {
          y: -300 - i * 100, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current, start: 'top top',
            end: 'bottom top', scrub: 1,
          }
        });
      });

    }, sectionRef);

    // Counters with bounce finish
    setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=0.1;setCorpCount(Math.min(c,2.5));if(c>=2.5)clearInterval(iv)},22); }, 1800);
    setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=0.1;setFreeCount(Math.min(c,2));if(c>=2)clearInterval(iv)},30); }, 2000);
    setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=1;setProjCount(Math.min(c,18));if(c>=18)clearInterval(iv)},40); }, 2200);

    return () => { ctx.revert(); window.removeEventListener('mousemove', onMouseMove); };
  }, [scramble, onMouseMove]);

  const marqueeText = STACK.map(s => `${s}  /  `).join('');

  return (
    <section ref={sectionRef} aria-label="Introduction" className="min-h-[100dvh] flex flex-col relative overflow-hidden">

      {/* Blobs with mouse-follow parallax */}
      <div ref={blob1} className="absolute -top-40 right-[-10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full animate-blob pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.13), transparent 65%)' }} aria-hidden="true" />
      <div ref={blob2} className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full animate-blob pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.09), transparent 65%)', animationDelay: '-4s' }} aria-hidden="true" />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 xl:px-24 pt-24 pb-6 relative z-10">
        <div className="max-w-[1400px] mx-auto w-full">

          {/* Availability tag */}
          <div className="flex items-center gap-3 mb-6 lg:mb-10">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--lime)]" />
            </span>
            <span className="dev-mono text-[11px] text-[var(--text-muted)] tracking-[0.25em] uppercase">Available for work</span>
          </div>

          {/* Name — BRUTAL, fills viewport width */}
          <h1 className="mb-2 lg:mb-0">
            <span className="sr-only">Abhishek Vaghela — Full Stack Developer</span>
            <span ref={name1Ref} data-text="Abhishek" className="heading-brutal block text-white" aria-hidden="true" />
            <span ref={name2Ref} data-text="Vaghela" className="heading-brutal block gradient-text" aria-hidden="true" />
          </h1>

          {/* Role — scramble decode */}
          <div ref={roleRef} className="dev-mono text-sm sm:text-base lg:text-lg text-[var(--text-muted)] tracking-[0.15em] mt-4 mb-8 opacity-0" aria-hidden="true">
            FULL STACK DEVELOPER
          </div>

          {/* Description — clip reveal */}
          <p ref={descRef} className="text-body max-w-lg mb-8 opacity-0" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
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
      <div ref={marqueeRef} className="border-y border-[var(--line)] py-3 opacity-0" aria-hidden="true">
        <div className="animate-marquee whitespace-nowrap">
          <span className="dev-mono text-[10px] text-[var(--text-muted)]/60 tracking-[0.3em]">{marqueeText}{marqueeText}</span>
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
