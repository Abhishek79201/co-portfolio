import { projects } from '@/data/projects';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Dev Studio',
  description: 'Deep technical case studies showcasing architecture decisions, system design, and engineering methodology.',
};

export default function CaseStudiesPage() {
  const caseStudyProjects = projects.filter((p) => p.hasCaseStudy);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32 pb-20">
        <span className="dev-mono text-xs text-[var(--violet)] tracking-[0.25em] uppercase block mb-8">
          Case Studies
        </span>
        <h1 className="heading-lg text-white mb-6">
          How we build.
        </h1>
        <p className="text-body text-lg max-w-2xl mb-20">
          Deep dives into architecture decisions, system design, and the engineering
          methodology behind our projects.
        </p>

        <div className="space-y-px">
          {caseStudyProjects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/case-studies/${project.slug}`}
              className="group block border-t border-[var(--line)] hover:border-[var(--line-light)] transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 py-8">
                <div className="flex items-baseline gap-4 lg:gap-6">
                  <span className="dev-mono text-xs text-[var(--text-muted)] tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[var(--${project.accent})] transition-colors`}>
                      {project.title}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-10 lg:ml-0">
                  <span className={`pill pill-${project.accent} dev-mono text-[9px]`}>
                    {project.type}
                  </span>
                  <div className="hidden md:flex gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className={`pill pill-${project.accent} dev-mono text-[9px]`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="border-t border-[var(--line)]" />
        </div>
      </div>
    </div>
  );
}
