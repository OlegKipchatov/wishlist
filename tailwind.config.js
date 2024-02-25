const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./svg/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      white: '#fff',
      gray: {
          '0': 'hsl(var(--th-gray-0))',
        '100': 'hsl(var(--th-gray-100))',
        '200': 'hsl(var(--th-gray-200))',
        '300': 'hsl(var(--th-gray-300))',
        '400': 'hsl(var(--th-gray-400))',
        '500': 'hsl(var(--th-gray-500))',
        '600': 'hsl(var(--th-gray-600))',
        '700': 'hsl(var(--th-gray-700))',
        '800': 'hsl(var(--th-gray-800))',
        '900': 'hsl(var(--th-gray-900))',
      },
      red: {
          '0': 'hsl(var(--th-red-0))',
        '100': 'hsl(var(--th-red-100))',
        '200': 'hsl(var(--th-red-200))',
        '300': 'hsl(var(--th-red-300))',
        '400': 'hsl(var(--th-red-400))',
        '500': 'hsl(var(--th-red-500))',
        '600': 'hsl(var(--th-red-600))',
        '700': 'hsl(var(--th-red-700))',
        '800': 'hsl(var(--th-red-800))',
        '900': 'hsl(var(--th-red-900))',
      },
      yellow: {
          '0': 'hsl(var(--th-yellow-0))',
        '100': 'hsl(var(--th-yellow-100))',
        '200': 'hsl(var(--th-yellow-200))',
        '300': 'hsl(var(--th-yellow-300))',
        '400': 'hsl(var(--th-yellow-400))',
        '500': 'hsl(var(--th-yellow-500))',
        '600': 'hsl(var(--th-yellow-600))',
        '700': 'hsl(var(--th-yellow-700))',
        '800': 'hsl(var(--th-yellow-800))',
        '900': 'hsl(var(--th-yellow-900))',
      },
      green: {
          '0': 'hsl(var(--th-green-0))',
        '100': 'hsl(var(--th-green-100))',
        '200': 'hsl(var(--th-green-200))',
        '300': 'hsl(var(--th-green-300))',
        '400': 'hsl(var(--th-green-400))',
        '500': 'hsl(var(--th-green-500))',
        '600': 'hsl(var(--th-green-600))',
        '700': 'hsl(var(--th-green-700))',
        '800': 'hsl(var(--th-green-800))',
        '900': 'hsl(var(--th-green-900))',
      },
    },
    extend: {
      colors: {
        primary: {
            '0': 'hsl(var(--th-primary-0))',
          '100': 'hsl(var(--th-primary-100))',
          '200': 'hsl(var(--th-primary-200))',
          '300': 'hsl(var(--th-primary-300))',
          '400': 'hsl(var(--th-primary-400))',
          '500': 'hsl(var(--th-primary-500))',
          '600': 'hsl(var(--th-primary-600))',
          '700': 'hsl(var(--th-primary-700))',
          '800': 'hsl(var(--th-primary-800))',
          '900': 'hsl(var(--th-primary-900))',
          DEFAULT: 'hsl(var(--th-primary-500))',
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [nextui({
    prefix: 'th',
  })],
};
