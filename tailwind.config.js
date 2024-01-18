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
          101: "#29292A",
          102: "#202021",
          103: "#424245",
          104: "#232323",
          105: "#1A1A1B",
          106: "#14181E",
          107: "#272C34",
          108: "#21262D",
          109: "#0C1117",
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
          106: "#9E9E9F",
          107: "#1E1E1F",
          108: "#333437",
        },
        white: {
          100: "#6175FC00",
          200: "#5A9EF500",
          300: "#383F4700",
          400: "#F4F4F400",
          500: "#FFFFFF",
          600: "#FFFFFF00",
          700: "#E8E8E8",
          800: "#EDEDED",
          900: "#FBFBFC",
        },
        blue: {
          100: "#0977FF",
          200: "#6370FF",
          300: "#4861D5",
        },
        lavendar: {
          100: "#6370FF66",
          200: "#617AFD2E",
        },
        green: {
          100: "#2CB67D",
          200: "#269569",
          300: "#3A9F2D",
          400: "#729F70",
        },
        teal: {
          100: "#41E2D8",
        },
        yellow: {
          100: "#FDA44F",
          200: "#CE813A",
          300: "#CB7F3A",
        },
        red: {
          100: "#D26060",
          200: "#623737",
          300: "#CE7668",
          400: "#CC5D5E",
        },
      },
      spacing: {
        1.7: "1.7px",
        "5p": "5px",
        "7p": "7px",
        "9p": "9px",
        13: "13px",
        18: "18px",
        25: "25px",
        30: "30px",
        35: "35px",
        38: "38px",
        39: "39px",
        "44p": "44px",
        75: "75px",
        100: "100px",
        135: "135px",
        154: "154px",
        340: "340px",
        380: "380px",
        390: "390px",
        444: "444px",
        n1w: "-1vw",
        "0.2w": "0.2vw",
        "0.5w": "0.5vw",
        "0.5h": "0.5vh",
        "0.75w": "0.75vw",
        "0.8r": "0.8rem",
        "1w": "1vw",
        "1.2w": "1.2vw",
        "1.25r": "1.25rem",
        "1.75r": "1.75rem",
        "2w": "2vw",
        "2h": "2vh",
        "2.3r": "2.3rem",
        "2.5w": "2.5vw",
        "2.85w": "2.85vw",
        "3h": "3vh",
        "3.5w": "3.5vw",
        "5w": "5vw",
        "6.5w": "6.5vw",
        "8w": "8vw",
        "9h": "9vh",
        "10w": "10vw",
        "11r": "11rem",
        "11w": "11vw",
        "12w": "12vw",
        "14w": "14vw",
        "15w": "15vw",
        "20w": "20vw",
        "21w": "21vw",
        "24w": "24vw",
        "25w": "25vw",
        "21r": "21rem",
        "29r": "29rem",
        "31.4w": "31.4vw",
        "32.5w": "32.5vw",
        "32.8h": "32.8vh",
        "38w": "38vw",
        "40w": "40vw",
        "43w": "43vw",
        "44w": "44vw",
        "45h": "45vh",
        "45w": "45vw",
        "46r": "46rem",
        "50w": "50vw",
        "51w": "51vw",
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
        "100vw-1r": "calc(100vw-1rem)",
        inherit: "inherit",
      },
      maxWidth: {
        200: "200px",
      },
      minWidth: {
        "4.5r": "4.5rem",
        "11r": "11rem",
        31: "31px",
      },
      maxHeight: {
        528: "528px",
        "100vh-154px": "calc(100vh-154px)",
      },
      minHeight: {
        "100vh-56": "calc(100vh-56px)",
        "16r": "16rem",
        "21r": "21rem",
        "24r": "24rem",
      },
      borderRadius: {
        8: "8px",
        10: "10px",
        12: "12px",
        20: "20px",
      },
      fontSize: {
        8: "8px",
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
      boxShadow: {
        "2px-white": "0 0 0 2px #ffffff",
      },
    },
    screens: {
      xs: "450px",
      480: "480px",
      sm: "640px",
      md: "850px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "2100px",
    },
    fontFamily: {
      helvetica: "Helvetica Neue, sans-serif",
      IBM: "IBM Plex Mono, monospace",
    },
  },
  safelist: [
    "w-[1%]",
    "w-[2%]",
    "w-[3%]",
    "w-[4%]",
    "w-[5%]",
    "w-[6%]",
    "w-[7%]",
    "w-[8%]",
    "w-[9%]",
    "w-[10%]",
    "w-[11%]",
    "w-[12%]",
    "w-[13%]",
    "w-[14%]",
    "w-[15%]",
    "w-[16%]",
    "w-[17%]",
    "w-[18%]",
    "w-[19%]",
    "w-[20%]",
    "w-[21%]",
    "w-[22%]",
    "w-[23%]",
    "w-[24%]",
    "w-[25%]",
    "w-[26%]",
    "w-[27%]",
    "w-[28%]",
    "w-[29%]",
    "w-[30%]",
    "w-[31%]",
    "w-[32%]",
    "w-[33%]",
    "w-[34%]",
    "w-[35%]",
    "w-[36%]",
    "w-[37%]",
    "w-[38%]",
    "w-[39%]",
    "w-[40%]",
    "w-[41%]",
    "w-[42%]",
    "w-[43%]",
    "w-[44%]",
    "w-[45%]",
    "w-[46%]",
    "w-[47%]",
    "w-[48%]",
    "w-[49%]",
    "w-[50%]",
    "w-[51%]",
    "w-[52%]",
    "w-[53%]",
    "w-[54%]",
    "w-[55%]",
    "w-[56%]",
    "w-[57%]",
    "w-[58%]",
    "w-[59%]",
    "w-[60%]",
    "w-[61%]",
    "w-[62%]",
    "w-[63%]",
    "w-[64%]",
    "w-[65%]",
    "w-[66%]",
    "w-[67%]",
    "w-[68%]",
    "w-[69%]",
    "w-[70%]",
    "w-[71%]",
    "w-[72%]",
    "w-[73%]",
    "w-[74%]",
    "w-[75%]",
    "w-[76%]",
    "w-[77%]",
    "w-[78%]",
    "w-[79%]",
    "w-[80%]",
    "w-[81%]",
    "w-[82%]",
    "w-[83%]",
    "w-[84%]",
    "w-[85%]",
    "w-[86%]",
    "w-[87%]",
    "w-[88%]",
    "w-[89%]",
    "w-[90%]",
    "w-[91%]",
    "w-[92%]",
    "w-[93%]",
    "w-[94%]",
    "w-[95%]",
    "w-[96%]",
    "w-[97%]",
    "w-[98%]",
    "w-[99%]",
    "w-[100%]",
    { pattern: /grid-cols-./ },
  ],
};
