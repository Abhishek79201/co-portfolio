interface PatternSpotlightProps {
  dbName: string;
  body: string;
  accent: string;
}

export default function PatternSpotlight({ dbName, body, accent }: PatternSpotlightProps) {
  return (
    <div
      className="mt-8 rounded-[var(--radius)]"
      style={{
        borderLeft: `3px solid var(--${accent})`,
        padding: '16px 24px',
        backgroundColor: 'rgba(255,255,255,0.02)',
      }}
    >
      <span
        className="dev-mono text-[10px] uppercase tracking-[0.15em] block mb-2"
        style={{ color: `var(--${accent})` }}
      >
        Pattern Spotlight
      </span>
      <p className="text-[16px] font-bold text-white mb-2">
        Redis + OpenSearch + {dbName}
      </p>
      <p className="text-body text-sm">{body}</p>
    </div>
  );
}
