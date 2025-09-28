'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <div className={`fade-in-up ${inView ? 'animate' : ''}`}>
          <h1 className="heading-xl text-gray-900 mb-8">
            Full Stack Developer
            <br />
            <span className="text-accent">Building Digital Experiences</span>
          </h1>
        </div>
        
        <div className={`fade-in-up ${inView ? 'animate' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
            Passionate MERN stack developer with 2.5+ years of corporate experience and 2+ years of freelancing. 
            Currently building cutting-edge platforms and creating functional software that makes a difference.
          </p>
        </div>

        <div className={`fade-in-up ${inView ? 'animate' : ''}`} style={{ transitionDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <a
              href="#projects"
              className="button-primary"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="button-secondary"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className={`fade-in-up ${inView ? 'animate' : ''}`} style={{ transitionDelay: '0.6s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">2.5+</div>
              <div className="text-gray-600">Years Corporate Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">2+</div>
              <div className="text-gray-600">Years Freelancing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">18+</div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
          <ArrowDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;