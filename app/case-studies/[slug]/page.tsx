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
          <h2 className="text-xl font-bold text-white mb-4">{caseStudy.challenge.heading}</h2>
          <p className="text-body">{caseStudy.challenge.content}</p>
        </section>

        {/* Architecture */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">{caseStudy.architecture.heading}</h2>
          <p className="text-body">{caseStudy.architecture.content}</p>
        </section>

        {/* Tech Stack */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudy.techStack.map((group) => (
              <div key={group.category}>
                <h3 className="dev-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="pill pill-violet dev-mono text-[9px]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">{caseStudy.results.heading}</h2>
          <p className="text-body">{caseStudy.results.content}</p>
        </section>

        {/* Team */}
        <section className="mb-20 border-t border-[var(--line)] pt-12">
          <h2 className="text-xl font-bold text-white mb-4">Team</h2>
          <div className="flex gap-4">
            {caseStudy.team.map((name) => (
              <span key={name} className="pill pill-cyan dev-mono text-[9px]">
                {name}
              </span>
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
