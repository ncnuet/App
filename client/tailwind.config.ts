import type { Config } from "tailwindcss";

const config: Config = {
  plugins: [require("flowbite/plugin")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  important: true,
  important: true,
  theme: {
    extend: {
      colors: {
        cyellow: {
          100: "#FFF8E8",
          300: "#FDB81380",
          500: "#FDB813",
          600: "#FFA800"
        },
        cgray: {
          100: "#F3F2F2",
          200: "#F9F9F9",
          400: "#838383",
          500: "#4D4D4D",
          600: "#333333"
        },
        cblue: {
          300: "#0295FF",
          600: "#2D3748"
        },
        cgreen: {
          400: "#77DD77",
          600: "#6C9D5E"
        },
        cred: {
          400: "#FF6961"
        },
        "stroke-color": "#CCD7E2"
      },
      scale: {
        '-100': '-1'
      },
      screens: {
        xs: "480px"
      },
      boxShadow: {
        "sd1": "0px 10px 15px -3px rgba(0, 0, 0, 0.10)"
      }
    },
  },
};
export default config;
