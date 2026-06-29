/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette claire & luxueuse (editorial mode)
        cream: {
          DEFAULT: '#f6f2ea',
          50: '#fdfbf7',
          100: '#faf6ef',
          200: '#f1ebe0',
          300: '#e6ddcd',
        },
        noir: {
          900: '#0c0c0e',
          800: '#141417',
          700: '#1d1d22',
        },
        ink: { // conserve pour quelques bandeaux sombres de contraste
          900: '#0a0a0f',
          800: '#0f0f17',
          700: '#16161f',
          600: '#1e1e2a',
        },
        gold: {
          DEFAULT: '#bf9b46',
          soft: '#d8be7e',
          deep: '#a8852f',
          glow: 'rgba(191, 155, 70, 0.30)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.35em',
      },
      boxShadow: {
        gold: '0 20px 60px -20px rgba(191, 155, 70, 0.45)',
        soft: '0 30px 60px -25px rgba(20, 20, 23, 0.25)',
        card: '0 18px 50px -18px rgba(20, 20, 23, 0.18)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.18)',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0,0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%, -1%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        kenburns: 'kenburns 7s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 5s linear infinite',
      },
    },
  },
  plugins: [],
}
