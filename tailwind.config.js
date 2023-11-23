import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          100: "#F16476",
        },
        black: {
          100: "#161A1D",
          200: "#22262C",
          300: "#292E36",
          400: "#383F47",
          500: "#000000",
          600: "#2E333B",
          700: "#161A1D",
          800: "#40444B",
          900: "#25292D",
        },
        gray: {
          100: "#00000014",
          200: "#F2F2F2",
          300: "#FAF9F6",
          400: "#8B8C8F",
          500: "#00000033",
          600: "#00000029",
          700: "#F4F4F4",
          800: "#0000000F",
          900: "#30343B",
          101: "#757575",
          102: "#D4D4D4",
          103: "#979797",
          104: "#B9B9B9",
          105: "#ced4da",
        },
        white: {
          100: "#6175FC00",
          200: "#5A9EF500",
          300: "#383F4700",
          400: "#F4F4F400",
          500: "#FFFFFF",
          600: "#FFFFFF00",
          700: "#E8E8E8",
        },
        blue: {
          100: "#0977FF",
          200: "#6370FF",
        },
        lavendar: {
          100: "#6370FF66",
          200: "#617AFD2E",
        },
        green: {
          100: "#2CB67D",
          200: "#269569",
          300: "#3A9F2D",
        },
        teal: {
          100: "#41E2D8",
        },
        yellow: {
          100: "#FDA44F",
        },
      },
      spacing: {
        7: "7px",
        13: "13px",
        18: "18px",
        44: "44px",
        444: "444px",
        "0.5w": "0.5vw",
        "0.5h": "0.5vh",
      },
      borderRadius: {
        8: "8px",
      },
      fontSize: {
        14: "14px",
      },
      opacity: {
        0.11: "0.11",
      },
    },
    screens: {
      sm: "640px",
      md: "850px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "2100px",
    },
    fontFamily: {
      helvetica: "Arial, sans-serif, Helvetica Neue",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const filterUtilities = {
        ".filter": {
          filter: "var(--filter)",
        },
        ".invert-12": {
          "--filter": "invert(12%)",
        },
        ".sepia-9": {
          "--filter": "sepia(9%)",
        },
        ".saturate-682": {
          "--filter": "saturate(682%)",
        },
        ".hue-rotate-201": {
          "--filter": "hue-rotate(201deg)",
        },
        ".brightness-88": {
          "--filter": "brightness(88%)",
        },
        ".contrast-88": {
          "--filter": "contrast(88%)",
        },
        ".drop-shadow": {
          filter: "drop-shadow(0px 3px 16px #00000029)",
        },
      };

      addUtilities(filterUtilities, ["responsive", "hover"]);
    }),
  ],
};
