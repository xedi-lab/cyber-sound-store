/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        v: {
          bg:       '#0a0a0a',
          surface:  '#0e0e0e',
          surface2: '#131313',
          border:   '#181818',
          border2:  '#222222',
          white:    '#efefef',
          gray1:    '#999999',
          gray2:    '#555555',
          gray3:    '#2a2a2a',
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
