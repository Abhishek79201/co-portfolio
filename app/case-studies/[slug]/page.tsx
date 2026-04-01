import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';
import { projects } from '@/data/projects';
import type { Metadata } from 'next';

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

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32 pb-20">
        {/* Hero */}
        <section className="mb-20">
          <span className="dev-mono text-xs text-[var(--violet)] tracking-[0.25em] uppercase block mb-8">
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
        </section>

        {/* Challenge */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">The Challenge</h2>
          <div className="text-body whitespace-pre-line">{caseStudy.challenge}</div>
        </section>

        {/* Pattern Spotlight */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">Pattern Spotlight: Redis + OpenSearch + {caseStudy.patternSpotlight.dbName}</h2>
          <p className="text-body">{caseStudy.patternSpotlight.body}</p>
        </section>

        {/* Tech Rationale */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">Tech Rationale</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudy.techRationale.map((item) => (
              <div key={item.technology}>
                <h3 className="dev-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3">
                  {item.technology}
                </h3>
                <p className="text-body text-sm mb-2"><strong>Problem:</strong> {item.problem}</p>
                <p className="text-body text-sm"><strong>Solution:</strong> {item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Highlights */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">Implementation Highlights</h2>
          <div className="space-y-6">
            {caseStudy.implementationHighlights.map((item) => (
              <div key={item.title}>
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-body">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">Results &amp; Impact</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {caseStudy.results.map((item) => (
              <div key={item.metric}>
                <h3 className="dev-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mb-2">
                  {item.metric}
                </h3>
                <p className="text-body">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">Team</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {caseStudy.team.map((member) => (
              <div key={member.name}>
                <span className="pill pill-cyan dev-mono text-[9px] mb-2 inline-block">
                  {member.name}
                </span>
                <p className="text-body text-sm">{member.contribution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA placeholder */}
        <section className="border-t border-[var(--line)] pt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want similar results?</h2>
          <p className="text-body mb-6">Let&apos;s talk about your project.</p>
          <a
            href="/#contact"
            className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-[var(--violet)] hover:text-white transition-colors duration-300"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  );
}
