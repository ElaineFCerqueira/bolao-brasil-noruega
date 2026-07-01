/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF9F2',
        ink: '#152018',
        'ink-soft': '#3D4A42',
        muted: '#7C8880',
        brasil: {
          green: '#0B5D3B',
          'green-deep': '#083F29',
          gold: '#F4B740',
          'gold-soft': '#FCE3A0',
        },
        noruega: {
          red: '#B5122A',
          blue: '#1B2E63',
        },
        panel: '#FFFFFF',
        line: '#E7E1D3',
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        flap: '0 2px 0 rgba(0,0,0,0.15), 0 8px 16px -8px rgba(0,0,0,0.25)',
        card: '0 1px 0 rgba(21,32,24,0.04), 0 12px 32px -16px rgba(21,32,24,0.18)',
      },
      borderRadius: {
        flap: '6px',
      },
    },
  },
  plugins: [],
}
