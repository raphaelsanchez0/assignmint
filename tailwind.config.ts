import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0D664D',
        'secondary': '#656262',

        "background": "#FAF9FF",
        'off-black': '#353535',
      },
      spacing: {
        'sidebar-width': '4rem',
      }
    },
  },
  plugins: [],
}
export default config
