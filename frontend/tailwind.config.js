/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        v: {
          bg:       '#111111',
          surface:  '#1a1a1a',
          surface2: '#222222',
          border:   '#2a2a2a',
          border2:  '#363636',
          white:    '#f0f0f0',
          gray1:    '#bbbbbb',
          gray2:    '#888888',
          gray3:    '#555555',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Courier New', 'monospace'],
      },
      animation: {
        'vu':      'vu 0.65s ease-in-out infinite alternate',
        'dot':     'dot 3s ease-in-out infinite',
      },
      keyframes: {
        vu: {
          from: { transform: 'scaleY(0.12)', opacity: '0.25' },
          to:   { transform: 'scaleY(1)',    opacity: '0.85' },
        },
        dot: {
          '0%,100%': { opacity: '0.2' },
          '50%':     { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
