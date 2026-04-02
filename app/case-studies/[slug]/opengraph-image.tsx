import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { caseStudies } from '@/data/case-studies'
import { projects } from '@/data/projects'

export const alt = 'Dev Studio Case Study'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = caseStudies.find((cs) => cs.slug === slug)
  const project = projects.find((p) => p.slug === caseStudy?.projectSlug)

  // Load local font — process.cwd() is project root at build time
  const jetbrainsMono = await readFile(
    join(process.cwd(), 'public/fonts/ttf/JetBrainsMono-SemiBold.ttf')
  )

  // Per D-02: accent colors per project — pink for GleeMeet, violet for CareerBox, orange for Zorova
  // Use literal hex values — Satori does NOT support CSS custom properties
  const accentColorMap: Record<string, string> = {
    pink: '#ec4899',
    violet: '#a855f7',
    orange: '#f97316',
    cyan: '#06b6d4',
    lime: '#84cc16',
  }
  const accentColor = accentColorMap[project?.accent ?? 'violet'] ?? '#a855f7'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0a0a',
          padding: '60px',
          fontFamily: 'JetBrains Mono',
          position: 'relative',
        }}
      >
        {/* Per D-02: accent gradient edge bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
          }}
        />

        {/* Per D-01: studio name */}
        <div
          style={{
            color: accentColor,
            fontSize: 14,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            marginBottom: 32,
          }}
        >
          Dev Studio
        </div>

        {/* Per D-01: case study title */}
        <div
          style={{
            color: '#fafafa',
            fontSize: 48,
            fontWeight: 600,
            marginBottom: 16,
            maxWidth: 900,
            lineHeight: 1.1,
          }}
        >
          {caseStudy?.title ?? 'Case Study'}
        </div>

        {/* Per D-01: tagline */}
        <div
          style={{
            color: '#a1a1aa',
            fontSize: 20,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {caseStudy?.tagline ?? ''}
        </div>

        {/* Per D-01: tech pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          {(project?.tech ?? []).slice(0, 5).map((t) => (
            <div
              key={t}
              style={{
                color: accentColor,
                border: `1px solid ${accentColor}`,
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 12,
                letterSpacing: '0.1em',
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Per D-01: domain URL */}
        <div
          style={{
            color: '#52525b',
            fontSize: 12,
            letterSpacing: '0.1em',
            position: 'absolute',
            bottom: 28,
            right: 60,
          }}
        >
          abhishekvaghela.dev
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'JetBrains Mono',
          data: jetbrainsMono,
          weight: 600,
          style: 'normal' as const,
        },
      ],
    },
  )
}
