/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
      grey: "#DDDDDD",
      primaryGrey: "#DDDDDD",
      primaryYellow:"#F8B959",
      blue:"#008cba",
      csname:"#0033cc",
      warning:"#F95A50",
      purple:"#4335A7",
      purple2:"#9694FF",
      lightPurple:"#EBEAFF",
      btnRedHover:"#b02a37",
      red:"#E6a5a1",
      primaryGreen:"#B4F8C8",
      forestGreen:"#228b22",
      tagColor:"#FDEACD",
      hoverOrange:"#FFC700",
      white:"#FFFFFF",
      black:"#000000",
      blurBG: "rgba(0 , 0 ,0 , 0.2)",
      transparent:"#00000000",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
