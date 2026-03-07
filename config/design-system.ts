// Design System — Gen Z Electric Palette

export const colors = {
  bg: { DEFAULT: '#0a0a0a', surface: '#111111', card: '#161616', cardHover: '#1c1c1c' },
  violet: { DEFAULT: '#a855f7', light: '#c084fc', dark: '#7c3aed' },
  pink: { DEFAULT: '#ec4899', light: '#f472b6' },
  cyan: { DEFAULT: '#06b6d4', light: '#22d3ee' },
  lime: { DEFAULT: '#84cc16', light: '#a3e635' },
  orange: { DEFAULT: '#f97316' },
  yellow: { DEFAULT: '#facc15' },
  text: { DEFAULT: '#fafafa', secondary: '#a1a1aa', muted: '#52525b' },
  border: { DEFAULT: '#27272a', light: '#3f3f46' },
} as const;

export const typography = {
  fonts: {
    display: ['Flagfies', 'Inter', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
  },
} as const;

export default { colors, typography };
