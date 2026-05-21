/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          // Accent
          red:        '#ff2020',
          'red-dim':  '#cc1a1a',
          'red-glow': '#ff202033',
          spark:      '#ff6600',
          amber:      '#ffaa00',
          // Backgrounds
          black:      '#070709',
          dark:       '#0c0c0f',
          card:       '#0f0f12',
          'card-2':   '#141418',
          // Borders
          border:     '#1e1e24',
          'border-2': '#2a2a32',
          'border-hot':'#ff202044',
          // Text
          white:      '#f0f0f4',
          'text-1':   '#c8c8d0',
          'text-2':   '#808088',
          'text-3':   '#444450',
        },
      },
      fontFamily: {
        mono:    ['"JetBrains Mono"', 'Courier New', 'monospace'],
        display: ['"Orbitron"', 'monospace'],
      },
      boxShadow: {
        'red-sm':  '0 0 8px #ff202044',
        'red-md':  '0 0 16px #ff202044, 0 0 32px #ff202022',
        'red-lg':  '0 0 24px #ff202066, 0 0 48px #ff202033',
        'card':    '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.6), 0 0 1px #ff202033',
      },
      animation: {
        'glitch':   'glitch 4s infinite',
        'flicker':  'flicker 6s infinite',
        'scanline': 'scanline 6s linear infinite',
        'bolt':     'bolt 4s ease-in-out infinite',
        'pulse-red':'pulseRed 3s ease-in-out infinite',
        'vu':       'vu 0.7s ease-in-out infinite alternate',
      },
      keyframes: {
        glitch: {
          '0%,90%,100%': { transform:'translate(0)',        opacity:'1' },
          '91%':          { transform:'translate(-3px,1px)', opacity:'0.9' },
          '92%':          { transform:'translate(3px,-1px)', opacity:'0.85' },
          '93%':          { transform:'translate(0)',        opacity:'1' },
        },
        flicker: {
          '0%,96%,100%': { opacity:'1' },
          '97%':          { opacity:'0.7' },
          '98%':          { opacity:'1' },
          '99%':          { opacity:'0.5' },
        },
        scanline: {
          '0%':   { top:'-2px' },
          '100%': { top:'100vh' },
        },
        bolt: {
          '0%,80%,100%': { opacity:'0.2' },
          '85%':          { opacity:'1', filter:'drop-shadow(0 0 6px #ff6600)' },
          '87%':          { opacity:'0.4' },
          '89%':          { opacity:'1' },
          '91%':          { opacity:'0.2' },
        },
        pulseRed: {
          '0%,100%': { boxShadow:'0 0 8px #ff202044' },
          '50%':     { boxShadow:'0 0 20px #ff202066, 0 0 40px #ff202033' },
        },
        vu: {
          from: { transform:'scaleY(0.15)', opacity:'0.6' },
          to:   { transform:'scaleY(1)',    opacity:'1' },
        },
      },
    },
  },
  plugins: [],
}
