import { projects } from '@/data/projects';
import { caseStudies } from '@/data/case-studies';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies | Dev Studio',
  description: 'Deep technical case studies showcasing architecture decisions, system design, and engineering methodology.',
};

export default function CaseStudiesPage() {
  const caseStudyProjects = projects.filter((p) => p.hasCaseStudy);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32 pb-20">
        {/* 1. Page Header */}
        <span className="dev-mono text-xs text-[var(--violet)] tracking-[0.25em] uppercase block mb-8">
          Case Studies
        </span>
        <h1 className="heading-lg text-white mb-6">How we build.</h1>
        <p className="text-body text-lg max-w-2xl mb-20">
          Deep dives into architecture decisions, system design, and the engineering
          methodology behind our projects.
        </p>

        {/* 2. Pattern Intro Block (D-08, CASE-08) */}
        <div
          className="mb-16 rounded-[var(--radius)] backdrop-blur-sm p-6 lg:p-8"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 className="heading-md text-white mb-3">Our Signature Stack</h2>
          <p className="text-body mb-4">
            Across every project, we reach for the same proven trio: Redis for
            sub-millisecond caching, OpenSearch for intelligent full-text and vector
            search, and a primary database optimised for the workload. Three case
            studies. Three different problems. One consistent architecture pattern.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="pill pill-cyan dev-mono text-[9px]">Redis</span>
            <span className="pill pill-cyan dev-mono text-[9px]">OpenSearch</span>
            <span className="pill pill-cyan dev-mono text-[9px]">Primary DB</span>
          </div>
        </div>

        {/* 3. Case Study Cards (D-07) */}
        <div className="space-y-6">
          {caseStudyProjects.map((project, i) => {
            const cs = caseStudies.find((c) => c.projectSlug === project.slug);

            return (
              <Link
                key={project.slug}
                href={`/case-studies/${project.slug}`}
                className="group block"
                aria-label={`Read ${project.title} case study`}
              >
                <Card
                  className="case-card bg-[var(--bg-elevated)] border border-[var(--line)] rounded-[var(--radius)] p-6 lg:p-8"
                  data-accent={project.accent}
                >
                  {/* Top row: number + type badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="dev-mono text-xs text-[var(--text-muted)] tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`pill pill-${project.accent} dev-mono text-[9px]`}>
                      {project.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="case-card-title heading-md text-white mb-2">
                    {project.title}
                  </h2>

                  {/* Tagline */}
                  <p className="text-body text-sm mb-4 lg:truncate">
                    {cs?.tagline ?? project.subtitle}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className={`pill pill-${project.accent} dev-mono text-[9px]`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Read Case Study link */}
                  <span
                    className={`inline-flex items-center gap-1.5 dev-mono text-[11px] text-[var(--${project.accent})]`}
                  >
                    Read Case Study
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* 4. Bottom rule */}
        <div className="border-t border-[var(--line)] mt-12" />
      </div>
    </div>
  );
}
