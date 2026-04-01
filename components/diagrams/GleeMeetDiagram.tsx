'use client';

import { useRef } from 'react';
import { gsap, DrawSVGPlugin, ScrollTrigger, useGSAP } from '@/lib/gsap';

export default function GleeMeetDiagram() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      const { isMobile, reduceMotion } = context.conditions!;

      const lines = svg.querySelectorAll('line');
      const rects = svg.querySelectorAll('rect');
      // Layer labels at y="20" (Client, API, Cache, Search, Database) and y="260" (ML)
      const texts = svg.querySelectorAll('text:not([y="20"]):not([y="260"])');

      if (reduceMotion) {
        // Instant final state (per D-15)
        gsap.set([lines, rects, texts], { opacity: 1, clearProps: 'all' });
        return;
      }

      // Start with all elements hidden
      gsap.set(lines, { drawSVG: 0 });
      gsap.set(rects, { opacity: 0, scale: 0.85, transformOrigin: 'center center' });
      gsap.set(texts, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 80%',
          once: true,
        }
      });

      // Phase 1: Draw arrow lines sequentially (per D-03, UI-SPEC)
      tl.from(lines, {
        drawSVG: 0,
        duration: isMobile ? 0.3 : 0.4,
        stagger: isMobile ? 0.08 : 0.12,
        ease: 'power2.inOut',
      });

      // Phase 2: Nodes fade + scale in at endpoints (per D-03)
      tl.from(rects, {
        opacity: 0, scale: 0.85,
        transformOrigin: 'center center',
        duration: isMobile ? 0.25 : 0.35,
        stagger: isMobile ? 0.05 : 0.08,
        ease: 'back.out(2)',
      }, '-=0.3');

      // Phase 3: Node labels fade in
      tl.from(texts, {
        opacity: 0,
        duration: 0.25,
        stagger: 0.04,
      }, '-=0.2');
    });
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef}>
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        width="100%"
        height="auto"
        aria-label="System architecture diagram for GleeMeet"
        role="img"
        className="block"
      >
        <defs>
          <marker
            id="arrowhead-glee"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--line-light)" />
          </marker>
        </defs>

        {/* Layer labels */}
        <text
          x="70"
          y="20"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          Client
        </text>
        <text
          x="230"
          y="20"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          API
        </text>
        <text
          x="400"
          y="20"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          Cache
        </text>
        <text
          x="560"
          y="20"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          Search
        </text>
        <text
          x="720"
          y="20"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          Database
        </text>
        <text
          x="400"
          y="260"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          ML
        </text>

        {/* Standard node: Next.js + Redux */}
        <rect
          x="10"
          y="40"
          width={120}
          height={48}
          rx={8}
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth={1.5}
        />
        <text
          x="70"
          y="60"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Next.js
        </text>
        <text
          x="70"
          y="76"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          + Redux
        </text>

        {/* Standard node: Node.js / Express */}
        <rect
          x="170"
          y="40"
          width={120}
          height={48}
          rx={8}
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth={1.5}
        />
        <text
          x="230"
          y="60"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Node.js
        </text>
        <text
          x="230"
          y="76"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Express
        </text>

        {/* Standard node: WebSocket Server */}
        <rect
          x="170"
          y="150"
          width={120}
          height={48}
          rx={8}
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth={1.5}
        />
        <text
          x="230"
          y="179"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          WebSocket
        </text>

        {/* Accent node: Redis */}
        <rect
          x="340"
          y="40"
          width={120}
          height={48}
          rx={8}
          fill="rgba(236,72,153,0.08)"
          stroke="var(--pink)"
          strokeWidth={1.5}
        />
        <text
          x="400"
          y="69"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Redis
        </text>

        {/* Accent node: OpenSearch */}
        <rect
          x="500"
          y="40"
          width={120}
          height={48}
          rx={8}
          fill="rgba(236,72,153,0.08)"
          stroke="var(--pink)"
          strokeWidth={1.5}
        />
        <text
          x="560"
          y="69"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          OpenSearch
        </text>

        {/* Accent node: DynamoDB */}
        <rect
          x="660"
          y="40"
          width={120}
          height={48}
          rx={8}
          fill="rgba(236,72,153,0.08)"
          stroke="var(--pink)"
          strokeWidth={1.5}
        />
        <text
          x="720"
          y="69"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          DynamoDB
        </text>

        {/* Standard node: BERT Matching */}
        <rect
          x="340"
          y="275"
          width={120}
          height={48}
          rx={8}
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth={1.5}
        />
        <text
          x="400"
          y="295"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          BERT
        </text>
        <text
          x="400"
          y="311"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Matching
        </text>

        {/* Arrow: Next.js -> Node.js/Express */}
        <line
          x1="130"
          y1="64"
          x2="165"
          y2="64"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-glee)"
        />

        {/* Arrow: Next.js -> WebSocket */}
        <line
          x1="70"
          y1="88"
          x2="70"
          y2="130"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="70"
          y1="130"
          x2="165"
          y2="174"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-glee)"
        />

        {/* Arrow: Node.js/Express -> Redis */}
        <line
          x1="290"
          y1="64"
          x2="335"
          y2="64"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-glee)"
        />

        {/* Arrow: Node.js/Express -> OpenSearch */}
        <line
          x1="290"
          y1="54"
          x2="320"
          y2="54"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="320"
          y1="54"
          x2="320"
          y2="34"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="320"
          y1="34"
          x2="500"
          y2="34"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="500"
          y1="34"
          x2="500"
          y2="55"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-glee)"
        />

        {/* Arrow: Node.js/Express -> DynamoDB */}
        <line
          x1="290"
          y1="74"
          x2="320"
          y2="74"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="320"
          y1="74"
          x2="320"
          y2="100"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="320"
          y1="100"
          x2="660"
          y2="100"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="660"
          y1="100"
          x2="660"
          y2="80"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-glee)"
        />

        {/* Arrow: Node.js/Express -> BERT */}
        <line
          x1="230"
          y1="88"
          x2="230"
          y2="220"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="230"
          y1="220"
          x2="370"
          y2="220"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="370"
          y1="220"
          x2="370"
          y2="270"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-glee)"
        />

        {/* Arrow: BERT -> DynamoDB */}
        <line
          x1="460"
          y1="299"
          x2="720"
          y2="299"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="720"
          y1="299"
          x2="720"
          y2="93"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-glee)"
        />

        {/* Arrow: Redis -> WebSocket (pub/sub) */}
        <line
          x1="340"
          y1="80"
          x2="340"
          y2="174"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="340"
          y1="174"
          x2="295"
          y2="174"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-glee)"
        />
      </svg>
    </div>
  );
}
