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
        "5p": "5px",
        "7p": "7px",
        "9p": "9px",
        13: "13px",
        18: "18px",
        25: "25px",
        30: "30px",
        35: "35px",
        38: "38px",
        "44p": "44px",
        75: "75px",
        100: "100px",
        135: "135px",
        340: "340px",
        380: "380px",
        390: "390px",
        444: "444px",
        n1w: "-1vw",
        "0.2w": "0.2vw",
        "0.5w": "0.5vw",
        "0.5h": "0.5vh",
        "0.8r": "0.8rem",
        "1w": "1vw",
        "1.2w": "1.2vw",
        "2.5w": "2.5vw",
        "2.85w": "2.85vw",
        "3h": "3vh",
        "3.5w": "3.5vw",
        "5w": "5vw",
        "6.5w": "6.5vw",
        "8w": "8vw",
        "9h": "9vh",
        "10w": "10vw",
        "11w": "11vw",
        "12w": "12vw",
        "14w": "14vw",
        "20w": "20vw",
        "21w": "21vw",
        "24w": "24vw",
        "25w": "25vw",
        "29r": "29rem",
        "32.5w": "32.5vw",
        "38w": "38vw",
        "40w": "40vw",
        "44w": "44vw",
        "45h": "45vh",
        "45w": "45vw",
        "50w": "50vw",
        "60w": "60vw",
        "62.23h": "62.23vh",
        "67w": "67vw",
        "68w": "68vw",
        "70h": "70vh",
        "71.7w": "71.7vw",
        "80w": "80vw",
        "85w": "85vw",
        "90h": "90vh",
        "95w": "95vw",
        "35pr": "35%",
        "65pr": "65%",
        "full-w": "100vw",
        "full-h": "100vh",
        "100vh-56": "calc(100vh-56px)",
        "100vh-57r": "calc(100vh-57rem)",
        "100vh-1.75rem": "calc(100vh-1.75rem)",
        inherit: "inherit",
      },
      maxWidth: {},
      minWidth: {
        "4.5r": "4.5rem",
      },
      maxHeight: {
        "100vh-154px": "calc(100vh-154px)",
      },
      minHeight: {
        "100vh-56": "calc(100vh-56px)",
        "21r": "21rem",
        "24r": "24rem",
      },
      borderRadius: {
        10: "10px",
        20: "20px",
      },
      fontSize: {
        10: "10px",
        13: "13px",
      },
      opacity: {
        0.11: "0.11",
      },
      zIndex: {
        1: "1",
      },
      lineHeight: {
        17: "17px",
      },
    },
    screens: {
      xs: "450px",
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
