import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontSize: {},
    },
    screens: {
      sm: "640px",
      md: "850px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      helvetica: "Arial, sans-serif, Helvetica Neue",
    },
  },
  plugins: [
    plugin(function ({addUtilities}) {
      const filterUtilities = {
        '.filter': {
          'filter': 'var(--filter)',
        },
        '.invert-12': {
          '--filter': 'invert(12%)',
        },
        '.sepia-9': {
          '--filter': 'sepia(9%)',
        },
        '.saturate-682': {
          '--filter': 'saturate(682%)',
        },
        '.hue-rotate-201': {
          '--filter': 'hue-rotate(201deg)',
        },
        '.brightness-88': {
          '--filter': 'brightness(88%)',
        },
        '.contrast-88': {
          '--filter': 'contrast(88%)',
        },
        '.drop-shadow': {
          'filter': 'drop-shadow(0px 3px 16px #00000029)',
        },
      };

      addUtilities(filterUtilities, ['responsive', 'hover']);

    }),
  ],
};
