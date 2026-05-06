/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy:    '#0b0d17',
        card:    '#1e293b',
        divider: '#334155',
        text:    '#f1f5f9',
        muted:   '#94a3b8',
        operational: '#22d3ee',
        organizational: '#fbbf24',
        systemic: '#c084fc',
        action:  '#34d399',
        critical: '#f87171',
        high:    '#fb923c',
        moderate: '#facc15',
        emerging: '#a78bfa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
