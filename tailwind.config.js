/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          dark: 'var(--color-primary-dark)',
        },
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          dark: 'var(--color-gray-dark)',
        },
        yellow: {
          50: 'var(--color-yellow-50)',
          100: 'var(--color-yellow-100)',
          200: 'var(--color-yellow-200)',
          300: 'var(--color-yellow-300)',
          400: 'var(--color-yellow-400)',
          500: 'var(--color-yellow-500)',
          600: 'var(--color-yellow-600)',
          700: 'var(--color-yellow-700)',
          800: 'var(--color-yellow-800)',
          900: 'var(--color-yellow-900)',
          dark: 'var(--color-yellow-dark)',
        },
      },
    },
  },
  plugins: [],
}