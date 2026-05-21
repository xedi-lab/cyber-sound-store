/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        v: {
          bg:       '#080808',
          surface:  '#101010',
          surface2: '#161616',
          border:   '#1e1e1e',
          border2:  '#2a2a2a',
          white:    '#f0f0f0',
          gray1:    '#aaaaaa',
          gray2:    '#6b6b6b',
          gray3:    '#333333',
        },
      },
      fontFamily: {
        mono:    ['"JetBrains Mono"', 'Courier New', 'monospace'],
        display: ['"Orbitron"', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 9s infinite',
        'vu':      'vu 0.65s ease-in-out infinite alternate',
        'hum':     'hum 4s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%,93%,100%': { opacity: '1' },
          '94%':          { opacity: '0.82' },
          '95%':          { opacity: '1' },
          '97%':          { opacity: '0.88' },
          '98%':          { opacity: '1' },
        },
        vu: {
          from: { transform: 'scaleY(0.15)', opacity: '0.3' },
          to:   { transform: 'scaleY(1)',    opacity: '0.9' },
        },
        hum: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.92' },
        },
      },
    },
  },
  plugins: [],
}
