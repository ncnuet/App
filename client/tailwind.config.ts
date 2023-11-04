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
        cblue: {
          600: "#2D3748"
        }
      },
      scale:{
        '-100': '-1'
      },
      screens:{
        xm: "480px"
      }
    },
  }
}
export default config
