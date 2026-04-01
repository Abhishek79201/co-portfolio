export default function ZorovaDiagram() {
  return (
    <svg
      viewBox="0 0 800 400"
      width="100%"
      height="auto"
      aria-label="System architecture diagram for Zorova"
      role="img"
      className="block"
    >
      <defs>
        <marker
          id="arrowhead-zorova"
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
        x="90"
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
        x="310"
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
        x="510"
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
        x="690"
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
        x="510"
        y="260"
        fontSize={9}
        fill="var(--text-muted)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
        style={{ textTransform: 'uppercase' }}
      >
        Database
      </text>

      {/* Standard node: Consumer App */}
      <rect
        x="30"
        y="40"
        width={120}
        height={48}
        rx={8}
        fill="var(--bg)"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text
        x="90"
        y="60"
        fontSize={11}
        fill="var(--text-secondary)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
      >
        Consumer App
      </text>
      <text
        x="90"
        y="76"
        fontSize={9}
        fill="var(--text-muted)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
      >
        React.js
      </text>

      {/* Standard node: Provider App */}
      <rect
        x="30"
        y="150"
        width={120}
        height={48}
        rx={8}
        fill="var(--bg)"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text
        x="90"
        y="170"
        fontSize={11}
        fill="var(--text-secondary)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
      >
        Provider App
      </text>
      <text
        x="90"
        y="186"
        fontSize={9}
        fill="var(--text-muted)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
      >
        React.js
      </text>

      {/* Standard node: Node.js / Express */}
      <rect
        x="250"
        y="90"
        width={120}
        height={48}
        rx={8}
        fill="var(--bg)"
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <text
        x="310"
        y="110"
        fontSize={11}
        fill="var(--text-secondary)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
      >
        Node.js
      </text>
      <text
        x="310"
        y="126"
        fontSize={9}
        fill="var(--text-muted)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
      >
        Express
      </text>

      {/* Accent node: Redis */}
      <rect
        x="450"
        y="40"
        width={120}
        height={48}
        rx={8}
        fill="rgba(249,115,22,0.08)"
        stroke="var(--orange)"
        strokeWidth={1.5}
      />
      <text
        x="510"
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
        x="630"
        y="40"
        width={120}
        height={48}
        rx={8}
        fill="rgba(249,115,22,0.08)"
        stroke="var(--orange)"
        strokeWidth={1.5}
      />
      <text
        x="690"
        y="69"
        fontSize={11}
        fill="var(--text-secondary)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
      >
        OpenSearch
      </text>

      {/* Accent node: MongoDB */}
      <rect
        x="450"
        y="275"
        width={120}
        height={48}
        rx={8}
        fill="rgba(249,115,22,0.08)"
        stroke="var(--orange)"
        strokeWidth={1.5}
      />
      <text
        x="510"
        y="304"
        fontSize={11}
        fill="var(--text-secondary)"
        fontFamily="var(--font-mono), JetBrains Mono, monospace"
        textAnchor="middle"
      >
        MongoDB
      </text>

      {/* Arrow: Consumer App -> Node.js/Express */}
      <line
        x1="150"
        y1="64"
        x2="200"
        y2="64"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="200"
        y1="64"
        x2="200"
        y2="104"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="200"
        y1="104"
        x2="245"
        y2="104"
        stroke="var(--line-light)"
        strokeWidth={1}
        markerEnd="url(#arrowhead-zorova)"
      />

      {/* Arrow: Provider App -> Node.js/Express */}
      <line
        x1="150"
        y1="174"
        x2="200"
        y2="174"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="200"
        y1="174"
        x2="200"
        y2="124"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="200"
        y1="124"
        x2="245"
        y2="124"
        stroke="var(--line-light)"
        strokeWidth={1}
        markerEnd="url(#arrowhead-zorova)"
      />

      {/* Arrow: Node.js/Express -> Redis */}
      <line
        x1="370"
        y1="104"
        x2="410"
        y2="104"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="410"
        y1="104"
        x2="410"
        y2="64"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="410"
        y1="64"
        x2="445"
        y2="64"
        stroke="var(--line-light)"
        strokeWidth={1}
        markerEnd="url(#arrowhead-zorova)"
      />

      {/* Arrow: Node.js/Express -> OpenSearch */}
      <line
        x1="370"
        y1="114"
        x2="410"
        y2="114"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="410"
        y1="114"
        x2="410"
        y2="34"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="410"
        y1="34"
        x2="630"
        y2="34"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="630"
        y1="34"
        x2="630"
        y2="55"
        stroke="var(--line-light)"
        strokeWidth={1}
        markerEnd="url(#arrowhead-zorova)"
      />

      {/* Arrow: Node.js/Express -> MongoDB */}
      <line
        x1="310"
        y1="138"
        x2="310"
        y2="210"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="310"
        y1="210"
        x2="480"
        y2="210"
        stroke="var(--line-light)"
        strokeWidth={1}
      />
      <line
        x1="480"
        y1="210"
        x2="480"
        y2="270"
        stroke="var(--line-light)"
        strokeWidth={1}
        markerEnd="url(#arrowhead-zorova)"
      />
    </svg>
  );
}
