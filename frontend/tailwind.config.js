/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          red:       '#ff1a1a',
          'red-dim': '#cc0000',
          'red-deep':'#8b0000',
          'red-glow':'#ff1a1a33',
          spark:     '#ff6600',
          amber:     '#ffaa00',
          black:     '#060606',
          dark:      '#0c0c0c',
          card:      '#100808',
          border:    '#2a0a0a',
          'border-hot':'#ff1a1a44',
          gray:      '#2a1a1a',
          'text-dim':'#553333',
        },
      },
      fontFamily: {
        mono:    ['"JetBrains Mono"', '"Space Mono"', 'Courier New', 'monospace'],
        display: ['"Orbitron"', '"Share Tech Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-red':    '0 0 10px #ff1a1a, 0 0 20px #ff1a1a66, 0 0 40px #ff1a1a33',
        'neon-red-sm': '0 0 5px #ff1a1a, 0 0 10px #ff1a1a66',
        'neon-spark':  '0 0 8px #ff6600, 0 0 16px #ff660066',
        'neon-card':   '0 0 1px #ff1a1a44, inset 0 0 30px #ff1a1a08',
      },
      animation: {
        'glitch':      'glitch 3s infinite',
        'electric':    'electric 0.15s steps(1) infinite',
        'scanline':    'scanline 5s linear infinite',
        'flicker':     'flicker 4s infinite',
        'spark':       'spark 2s ease-in-out infinite',
        'bolt':        'bolt 3s ease-in-out infinite',
        'arc':         'arc 1.5s steps(2) infinite',
        'pulse-red':   'pulseRed 2s ease-in-out infinite',
        'shake':       'shake 0.1s steps(2) infinite',
      },
      keyframes: {
        glitch: {
          '0%,88%,100%': { transform:'translate(0)',       opacity:'1' },
          '89%':          { transform:'translate(-3px,1px)',opacity:'0.9' },
          '90%':          { transform:'translate(3px,-1px)',opacity:'0.85' },
          '91%':          { transform:'translate(-1px,2px)',opacity:'0.9' },
          '92%':          { transform:'translate(0)',       opacity:'1' },
        },
        electric: {
          '0%':   { opacity:'1',   transform:'scaleX(1)' },
          '50%':  { opacity:'0.4', transform:'scaleX(0.98) skewX(1deg)' },
          '100%': { opacity:'1',   transform:'scaleX(1)' },
        },
        scanline: {
          '0%':   { top:'-4px' },
          '100%': { top:'100vh' },
        },
        flicker: {
          '0%,94%,100%': { opacity:'1' },
          '95%':          { opacity:'0.6' },
          '96%':          { opacity:'1' },
          '97%':          { opacity:'0.3' },
          '98%':          { opacity:'1' },
        },
        spark: {
          '0%,100%':  { boxShadow:'0 0 5px #ff1a1a,  0 0 10px #ff1a1a66' },
          '50%':      { boxShadow:'0 0 20px #ff6600, 0 0 40px #ff660066, 0 0 80px #ff1a1a33' },
        },
        bolt: {
          '0%,85%,100%': { opacity:'0', transform:'scaleY(1)' },
          '86%':          { opacity:'1', transform:'scaleY(0.9) skewX(-2deg)' },
          '87%':          { opacity:'0.6', transform:'scaleY(1.05) skewX(1deg)' },
          '88%':          { opacity:'1', transform:'scaleY(0.95)' },
          '89%':          { opacity:'0' },
        },
        arc: {
          '0%':   { borderColor:'#ff1a1a44', boxShadow:'none' },
          '50%':  { borderColor:'#ff6600',   boxShadow:'0 0 8px #ff6600' },
          '100%': { borderColor:'#ff1a1a44', boxShadow:'none' },
        },
        pulseRed: {
          '0%,100%': { boxShadow:'0 0 5px #ff1a1a, 0 0 10px #ff1a1a66' },
          '50%':     { boxShadow:'0 0 20px #ff1a1a, 0 0 40px #ff1a1a66, 0 0 80px #ff1a1a33' },
        },
        shake: {
          '0%':   { transform:'translate(0)' },
          '25%':  { transform:'translate(1px,-1px)' },
          '50%':  { transform:'translate(-1px,1px)' },
          '75%':  { transform:'translate(1px,0)' },
          '100%': { transform:'translate(0)' },
        },
      },
    },
  },
  plugins: [],
}
