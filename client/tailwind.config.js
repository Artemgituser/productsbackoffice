/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
<<<<<<< HEAD
    extend: {
      colors: {
        primary: "#006666",
        secondary: "#F1F2F5",
        success: "#00A63D",
        warning: "#FE9900",
        danger: "#FF2157",
        surface: "#E7E5E4",
        text: "#0F172A",
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        neumorphic: '8px 8px 16px #c4c2c1, -8px -8px 16px #ffffff',
        'neumorphic-inset': 'inset 4px 4px 8px #c4c2c1, inset -4px -4px 8px #ffffff',
      }
    },
=======
    extend: {},
>>>>>>> 53d7e9f (first commit)
  },
  plugins: [],
}
