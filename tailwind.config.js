/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "start-blue": "#4C49D9",
        "start-cyan": "#3D3BAC",
        "start-text": "#F8F8F8",
        "start-paragraph": "#908B8B",
        "color-text": "#F8F8F8",
        "footer-color": "#1A1A1C",
        violets: "#8C3F9F",
        reds: "#AD3838",
        grens: "#3F9F49",
        grays: "#393939",
        whites: "#ECECEC",
        patternbg: "#E2E2E2",
        nftbg: "#D9D9D9",
        prices: "#CACACA",
        modalbg: "#5837B6",
      },
      backgroundImage: {
        home: "url(../public/HomePage.jpg)",
      },
      fontFamily: {
        lalezar: ["Lalezar"],
        Kumbh: ["Kumbh Sans"],
      },
      animation: {
        pulsets: "pulset .6s",
        up: "up 7s infinite",
        down: "down 7s infinite",
        left20 :"left20 7s infinite",
        show : "show 7s infinite"
      },
      keyframes: {
        up: {
          "0%": { transform: "translate(0px, 0px) ", opacity:0.3 },
          "10%": { transform: "translate(0px, 0px) ",opacity:1 },
          "50%": { transform: "translate(700px,-700px)", opacity: 0.1 },
          "95%": { transform: "translate(700px, -700px)", opacity: 0.1 },
        },
        down: {
          "0%": { transform: "translate(0px, 0px) ", opacity:0.3 },
          "10%": { transform: "translate(0px, 0px) " ,opacity:1 },
          "50%": { transform: "translate(-700px, 700px)", opacity: 0.1 },
          "95%": { transform: "translate(-700px, 700px)", opacity: 0.1 },     
        },

        left20: {
          "0%": {  transform: "translate(0px, -40px)", opacity: 0 },
          "30%": {  transform: "translate(0px, -40px)", opacity: 0 },
          "52%": {  transform: "translate(0px, 0px)", opacity: 1 },    
          "100%": {  transform: "translate(0px, -40px)", opacity: 0 },
        },

     

        pulset: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
