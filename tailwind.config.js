/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF6EA',
        'cream-soft': '#F3EBD9',
        forest: '#315F4A',
        'forest-deep': '#173D30',
        sage: '#A8BDA8',
        'sage-light': '#D8E3D6',
        terracotta: '#D99B4A',
        'terracotta-soft': '#E9BD86',
        ink: '#173226',
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 8px 30px -12px rgba(23, 61, 48, 0.25)',
        soft: '0 4px 18px -6px rgba(23, 61, 48, 0.18)',
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeSlideOut: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-10px)' },
        },
        pulseCheck: {
          '0%': { transform: 'scale(0.6)', opacity: 0 },
          '60%': { transform: 'scale(1.08)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(217, 155, 74, 0.45)' },
          '50%': { boxShadow: '0 0 0 10px rgba(217, 155, 74, 0)' },
        },
      },
      animation: {
        fadeSlideIn: 'fadeSlideIn 0.35s ease-out both',
        fadeSlideOut: 'fadeSlideOut 0.25s ease-in both',
        pulseCheck: 'pulseCheck 0.32s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
        marquee: 'marquee 32s linear infinite',
        glowPulse: 'glowPulse 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
