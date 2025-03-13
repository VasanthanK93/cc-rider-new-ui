/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Adjust if needed
  safelist: [
    "bg-footergreen",
    "text-primary",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#eee',
        wccggreen: '#098139',
        teal: {
          100: '#e6fffa',
          200: '#b2f5ea',
          300: '#81e6d9',
          400: '#4fd1c5',
          500: '#38b2ac',
          600: '#319795',
          700: '#2c7a7b',
          800: '#285e61',
          900: '#234e52',
        },
        linegreen: "#B1DFB5",
        footergreen: "#07570F",
        headgreen: "#3EB549",
        nero: "#212020",
        paragreen: "#379636"

      },
      fontFamily: {
        'allura': 'Allura',
        'montserrat': 'Montserrat',
        'roboto': 'Roboto'
      },
    },
  },
  plugins: [],
};
