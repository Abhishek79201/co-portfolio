'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Send } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label clip
      const label = section.querySelector('.section-label');
      if (label) {
        gsap.fromTo(label,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut',
            scrollTrigger: { trigger: label, start: 'top 90%' } }
        );
      }

      // Heading — chars fly in
      const heading = section.querySelector('.section-heading');
      if (heading) {
        const text = heading.textContent || '';
        heading.innerHTML = text.split('').map((c: string) =>
          `<span class="inline-block" style="opacity:0;transform:translateY(60%) rotate(${(Math.random()-0.5)*8}deg)">${c === ' ' ? '&nbsp;' : c}</span>`
        ).join('');
        gsap.to(heading.querySelectorAll('span'), {
          opacity: 1, y: '0%', rotation: 0, duration: 0.7,
          stagger: 0.02, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        });
      }

      // Contact links — stagger slide up
      section.querySelectorAll('.contact-link').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%' },
            delay: i * 0.06 }
        );
      });

      // Form — clip reveal
      const form = section.querySelector('.contact-form');
      if (form) {
        gsap.fromTo(form,
          { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
          { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: form, start: 'top 85%' } }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:vaghelaabhishek2580@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailto;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const links = [
    { label: 'Email', value: 'vaghelaabhishek2580@gmail.com', href: 'mailto:vaghelaabhishek2580@gmail.com' },
    { label: 'Phone', value: '+91 8200394360', href: 'tel:+918200394360' },
    { label: 'GitHub', value: 'github/abhishekvaghela', href: 'https://github.com/abhishekvaghela' },
    { label: 'LinkedIn', value: 'linkedin/abhishekvaghela', href: 'https://linkedin.com/in/abhishekvaghela' },
  ];

  return (
    <section id="contact" ref={sectionRef} aria-label="Contact" className="py-32 lg:py-44 content-auto">
      <div className="section-line" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32">

        <span className="section-label dev-mono text-xs text-[var(--lime)] tracking-[0.25em] uppercase block mb-8">04 / Contact</span>
        <h2 className="section-heading heading-lg text-white mb-16" aria-label="Let's build something">
          Let's build something.
        </h2>

        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-20">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="text-body mb-10 text-lg">
              Got a project in mind? I'm always down to collaborate on
              interesting products and ideas.
            </p>

            <div className="flex items-center gap-3 mb-10">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--lime)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--lime)]" />
              </span>
              <span className="text-[var(--lime)] text-sm font-medium">Available for projects</span>
            </div>

            <nav aria-label="Contact links">
              {links.map((link, i) => (
                <a key={i} href={link.href}
                   target={link.href.startsWith('http') ? '_blank' : undefined}
                   rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                   className="contact-link group flex items-center justify-between py-4 border-b border-[var(--line)] hover:border-[var(--line-light)] transition-colors">
                  <div>
                    <div className="dev-mono text-[9px] text-[var(--text-muted)] uppercase tracking-[0.2em] mb-0.5">{link.label}</div>
                    <div className="text-[var(--text-secondary)] text-sm group-hover:text-white transition-colors">{link.value}</div>
                  </div>
                  <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              ))}
            </nav>
            <p className="text-[10px] text-[var(--text-muted)] dev-mono mt-4">Usually responds within 24h</p>
          </div>

          {/* Right — form with clip reveal */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="contact-form space-y-8" aria-label="Contact form">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-[10px] dev-mono text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3">Name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="input-dark" placeholder="Your name" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] dev-mono text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3">Email</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="input-dark" placeholder="your@email.com" autoComplete="email" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-[10px] dev-mono text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3">Subject</label>
                <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="input-dark" placeholder="What's this about?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-[10px] dev-mono text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3">Message</label>
                <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={5} className="input-dark resize-none" placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-[var(--violet)] hover:text-white transition-colors duration-300">
                <Send size={15} aria-hidden="true" /> Send Message
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-32 pt-6 border-t border-[var(--line)]" role="contentinfo">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-[10px] text-[var(--text-muted)] dev-mono">&copy; {new Date().getFullYear()} Abhishek Vaghela</p>
            <p className="text-[10px] text-[var(--text-muted)] dev-mono">Next.js + GSAP + late nights</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
