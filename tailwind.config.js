/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./svg/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      white: '#fff',
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        // ====================
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
        neutral: {
          '0': 'hsl(var(--th-neutral-0))',
          '100': 'hsl(var(--th-neutral-100))',
          '200': 'hsl(var(--th-neutral-200))',
          '300': 'hsl(var(--th-neutral-300))',
          '400': 'hsl(var(--th-neutral-400))',
          '500': 'hsl(var(--th-neutral-500))',
          '600': 'hsl(var(--th-neutral-600))',
          '700': 'hsl(var(--th-neutral-700))',
          '800': 'hsl(var(--th-neutral-800))',
          '900': 'hsl(var(--th-neutral-900))',
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
};
