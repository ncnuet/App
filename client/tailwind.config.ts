import type { Config } from 'tailwindcss'

const config: Config = {
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        cgray:{
          200: "#F9F9F9",
          400: "#838383",
          500: "#4D4D4D",
          600: "#333333"
        },
        cblue: {
          600: "#2D3748"
        },
        cgreen: {
          600: "#6C9D5E"
        },
        cred:{
          400: "#FF6961"
        }
      },
      scale:{
        '-100': '-1'
      },
      screens:{
        xs: "480px"
      }
    },
  }
}
export default config
