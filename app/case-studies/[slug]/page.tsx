import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';
import { projects } from '@/data/projects';
import type { Metadata } from 'next';
import PatternSpotlight from '@/components/PatternSpotlight';
import GleeMeetDiagram from '@/components/diagrams/GleeMeetDiagram';
import CareerBoxDiagram from '@/components/diagrams/CareerBoxDiagram';
import ZorovaDiagram from '@/components/diagrams/ZorovaDiagram';
import CaseStudyAnimations from '@/components/case-studies/CaseStudyAnimations';
import { ArrowRight } from 'lucide-react';

const diagramMap: Record<string, React.ComponentType> = {
  gleemeet: GleeMeetDiagram,
  careerbox: CareerBoxDiagram,
  zorova: ZorovaDiagram,
};

const accentRgbMap: Record<string, string> = {
  pink: '236,72,153',
  violet: '168,85,247',
  orange: '249,115,22',
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: `${caseStudy.title} | Dev Studio`,
    description: caseStudy.tagline,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const project = projects.find((p) => p.slug === caseStudy.projectSlug);
  const DiagramComponent = diagramMap[caseStudy.architectureDiagram];
  const accentRgb = project ? accentRgbMap[project.accent] : undefined;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32 pb-20">
        <CaseStudyAnimations accentRgb={accentRgb || '168,85,247'}>
        <article>
          {/* Section 01 — Hero */}
          <section className="cs-section mb-20 relative">
            {accentRgb && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top right, rgba(${accentRgb},0.05) 0%, transparent 60%)`,
                }}
                aria-hidden="true"
              />
            )}
            <div className="relative">
              <span
                className="dev-mono text-xs tracking-[0.25em] uppercase block mb-8"
                style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
              >
                Case Study
              </span>
              <h1 className="heading-lg text-white mb-4">{caseStudy.title}</h1>
              <p className="text-body text-lg max-w-3xl">{caseStudy.tagline}</p>
              {project && (
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {project.tech.map((t) => (
                    <span key={t} className={`pill pill-${project.accent} dev-mono text-[9px]`}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Section 02 — Challenge */}
          <section
            className="cs-section mb-20 border-t border-[var(--line)] pt-12"
            aria-labelledby="section-02-heading"
          >
            <span
              className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
              style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
            >
              02 /
            </span>
            <h2 id="section-02-heading" className="heading-md text-white mb-6">
              The Challenge
            </h2>
            {caseStudy.challenge.split('\n\n').map((para, i) => (
              <p key={i} className="text-body max-w-prose mb-4 last:mb-0">{para}</p>
            ))}
          </section>

          {/* Section 03 — Architecture */}
          <section
            className="cs-section mb-20 border-t border-[var(--line)] pt-12"
            aria-labelledby="section-03-heading"
          >
            <span
              className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
              style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
            >
              03 /
            </span>
            <h2 id="section-03-heading" className="heading-md text-white mb-6">
              Architecture
            </h2>
            <div className="bg-[var(--bg-elevated)] border border-[var(--line)] rounded-[var(--radius)] p-6">
              {DiagramComponent && <DiagramComponent />}
            </div>
            {project && (
              <PatternSpotlight
                dbName={caseStudy.patternSpotlight.dbName}
                body={caseStudy.patternSpotlight.body}
                accent={project.accent}
              />
            )}
          </section>

          {/* Section 04 — Tech Rationale */}
          <section
            className="cs-section mb-20 border-t border-[var(--line)] pt-12"
            aria-labelledby="section-04-heading"
          >
            <span
              className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
              style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
            >
              04 /
            </span>
            <h2 id="section-04-heading" className="heading-md text-white mb-6">
              Tech Rationale
            </h2>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
              {caseStudy.techRationale.map((item) => (
                <div
                  key={item.technology}
                  className="bg-[var(--bg-elevated)] border border-[var(--line)] rounded-[var(--radius)] p-6"
                >
                  <h3 className="dev-mono text-[11px] uppercase tracking-[0.15em] text-white mb-3">
                    {item.technology}
                  </h3>
                  <p className="text-body text-sm mb-2">
                    <span className="text-[var(--text-muted)]">Problem: </span>{item.problem}
                  </p>
                  <p className="text-body text-sm">
                    <span className="text-[var(--text-muted)]">Solution: </span>{item.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 05 — Implementation Highlights */}
          <section
            className="cs-section mb-20 border-t border-[var(--line)] pt-12"
            aria-labelledby="section-05-heading"
          >
            <span
              className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
              style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
            >
              05 /
            </span>
            <h2 id="section-05-heading" className="heading-md text-white mb-6">
              Implementation Highlights
            </h2>
            <ol className="space-y-8">
              {caseStudy.implementationHighlights.map((item, i) => (
                <li key={item.title} className="flex gap-6">
                  <span
                    className="dev-mono text-[2rem] font-bold leading-none shrink-0"
                    style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-[1rem] mb-2">{item.title}</h3>
                    <p className="text-body">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 06 — Results & Impact */}
          <section
            className="cs-section mb-20 border-t border-[var(--line)] pt-12"
            aria-labelledby="section-06-heading"
          >
            <span
              className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
              style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
            >
              06 /
            </span>
            <h2 id="section-06-heading" className="heading-md text-white mb-6">
              Results &amp; Impact
            </h2>
            <div className={`grid gap-4 ${caseStudy.results.length === 4
              ? 'sm:grid-cols-2 lg:grid-cols-4'
              : 'sm:grid-cols-2'}`}
            >
              {caseStudy.results.map((item) => (
                <div
                  key={item.metric}
                  className="metric-card bg-[var(--bg-elevated)] border border-[var(--line)] rounded-[var(--radius)] p-6"
                >
                  <span className="dev-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] block mb-3">
                    {item.metric}
                  </span>
                  <p className="heading-md text-white">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 07 — Team */}
          <section
            className="cs-section mb-20 border-t border-[var(--line)] pt-12"
            aria-labelledby="section-07-heading"
          >
            <span
              className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
              style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
            >
              07 /
            </span>
            <h2 id="section-07-heading" className="heading-md text-white mb-6">
              Team
            </h2>
            <div className="space-y-4">
              {caseStudy.team.map((member) => (
                <div key={member.name} className="flex items-start gap-3">
                  <span className="pill pill-cyan dev-mono text-[9px] shrink-0">
                    {member.name}
                  </span>
                  <p className="text-body text-sm">{member.contribution}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 08 — CTA */}
          <section
            className="cs-section border-t border-[var(--line)] pt-12 text-center"
            aria-labelledby="section-08-heading"
          >
            <span
              className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
              style={{ color: project ? `var(--${project.accent})` : 'var(--violet)' }}
            >
              08 /
            </span>
            <h2 id="section-08-heading" className="heading-md text-white mb-4">
              Want similar results?
            </h2>
            <p className="text-body mb-8">
              Let&apos;s talk about what you&apos;re building.
            </p>
            <div
              style={{ boxShadow: '0 0 40px rgba(168,85,247,0.15)' }}
              className="inline-block rounded-full"
            >
              <a
                href="/#contact"
                className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-[var(--violet)] hover:text-white transition-colors duration-300"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>
        </article>
        </CaseStudyAnimations>
      </div>
    </div>
  );
}
