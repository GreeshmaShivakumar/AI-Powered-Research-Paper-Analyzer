/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth: {
        '3': '3px',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
  safelist: [
    // Color classes for dynamic usage
    'from-blue-500', 'to-blue-600', 'from-purple-500', 'to-purple-600',
    'from-emerald-500', 'to-emerald-600', 'from-pink-500', 'to-pink-600',
    'bg-blue-100', 'bg-purple-100', 'bg-emerald-100', 'bg-pink-100',
    'text-blue-600', 'text-purple-600', 'text-emerald-600', 'text-pink-600',
    'border-blue-500', 'border-purple-500', 'border-emerald-500', 'border-pink-500',
    'shadow-blue-500/25', 'shadow-purple-500/25', 'shadow-emerald-500/25', 'shadow-pink-500/25',
    // Dark mode variants
    'dark:bg-blue-500/20', 'dark:bg-purple-500/20', 'dark:bg-emerald-500/20', 'dark:bg-pink-500/20',
    'dark:text-blue-400', 'dark:text-purple-400', 'dark:text-emerald-400', 'dark:text-pink-400',
    'dark:border-blue-500/50', 'dark:border-purple-500/50', 'dark:border-emerald-500/50', 'dark:border-pink-500/50',
  ],
};