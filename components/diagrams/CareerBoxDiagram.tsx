export default function CareerBoxDiagram() {
  return (
    <div>
      <svg
        viewBox="0 0 800 400"
        width="100%"
        height="auto"
        aria-label="System architecture diagram for CareerBox"
        role="img"
        className="block"
      >
        <defs>
          <marker
            id="arrowhead-career"
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
          x="120"
          y="30"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          Client
        </text>
        <text
          x="300"
          y="30"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          API
        </text>
        <text
          x="480"
          y="30"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          Cache
        </text>
        <text
          x="660"
          y="30"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          Search
        </text>
        <text
          x="480"
          y="230"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          Database
        </text>

        {/* Standard node: Next.js (SSR) */}
        <rect
          x="60"
          y="50"
          width={120}
          height={48}
          rx={8}
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth={1.5}
        />
        <text
          x="120"
          y="70"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Next.js
        </text>
        <text
          x="120"
          y="86"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          SSR
        </text>

        {/* Standard node: Node.js / Express */}
        <rect
          x="240"
          y="50"
          width={120}
          height={48}
          rx={8}
          fill="var(--bg)"
          stroke="var(--line)"
          strokeWidth={1.5}
        />
        <text
          x="300"
          y="70"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Node.js
        </text>
        <text
          x="300"
          y="86"
          fontSize={9}
          fill="var(--text-muted)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Express
        </text>

        {/* Accent node: Redis */}
        <rect
          x="420"
          y="50"
          width={120}
          height={48}
          rx={8}
          fill="rgba(168,85,247,0.08)"
          stroke="var(--violet)"
          strokeWidth={1.5}
        />
        <text
          x="480"
          y="79"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          Redis
        </text>

        {/* Accent node: OpenSearch */}
        <rect
          x="600"
          y="50"
          width={120}
          height={48}
          rx={8}
          fill="rgba(168,85,247,0.08)"
          stroke="var(--violet)"
          strokeWidth={1.5}
        />
        <text
          x="660"
          y="79"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          OpenSearch
        </text>

        {/* Accent node: MongoDB */}
        <rect
          x="420"
          y="245"
          width={120}
          height={48}
          rx={8}
          fill="rgba(168,85,247,0.08)"
          stroke="var(--violet)"
          strokeWidth={1.5}
        />
        <text
          x="480"
          y="274"
          fontSize={11}
          fill="var(--text-secondary)"
          fontFamily="var(--font-mono), JetBrains Mono, monospace"
          textAnchor="middle"
        >
          MongoDB
        </text>

        {/* Arrow: Next.js -> Node.js/Express */}
        <line
          x1="180"
          y1="74"
          x2="235"
          y2="74"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-career)"
        />

        {/* Arrow: Node.js/Express -> Redis (session cache) */}
        <line
          x1="360"
          y1="74"
          x2="415"
          y2="74"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-career)"
        />

        {/* Arrow: Redis -> Node.js/Express (bidirectional for sessions) */}
        <line
          x1="420"
          y1="84"
          x2="365"
          y2="84"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-career)"
        />

        {/* Arrow: Node.js/Express -> OpenSearch */}
        <line
          x1="360"
          y1="64"
          x2="390"
          y2="64"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="390"
          y1="64"
          x2="390"
          y2="44"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="390"
          y1="44"
          x2="600"
          y2="44"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="600"
          y1="44"
          x2="600"
          y2="65"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-career)"
        />

        {/* Arrow: Node.js/Express -> MongoDB */}
        <line
          x1="300"
          y1="98"
          x2="300"
          y2="180"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="300"
          y1="180"
          x2="450"
          y2="180"
          stroke="var(--line-light)"
          strokeWidth={1}
        />
        <line
          x1="450"
          y1="180"
          x2="450"
          y2="240"
          stroke="var(--line-light)"
          strokeWidth={1}
          markerEnd="url(#arrowhead-career)"
        />
      </svg>
    </div>
  );
}
