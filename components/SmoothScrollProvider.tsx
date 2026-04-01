'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // INFRA-07 FIX: Store named function reference for proper cleanup
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback); // Same reference -- proper cleanup
    };
  }, []);

  // INFRA-08: Route change handler -- kill stale ScrollTriggers, reset scroll
  useEffect(() => {
    // Kill all ScrollTrigger instances from previous route
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Reset scroll position immediately (not animated)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Refresh ScrollTrigger after DOM settles for new route
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return <>{children}</>;
}
