/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'random-move-1': 'randomPath1 60s infinite alternate ease-in-out',
        'random-move-2': 'randomPath2 40s infinite alternate ease-in-out',
        'random-move-3': 'randomPath3 35s infinite alternate ease-in-out',
      },
      keyframes: {
        randomPath1: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(50vw, 20vh)' },
          '50%': { transform: 'translate(-30vw, 80vh)' },
          '75%': { transform: 'translate(70vw, 50vh)' },
          '100%': { transform: 'translate(-10vw, -10vh)' },
        },
        randomPath2: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-40vw, 70vh)' },
          '50%': { transform: 'translate(60vw, -30vh)' },
          '75%': { transform: 'translate(-20vw, 40vh)' },
          '100%': { transform: 'translate(30vw, -80vh)' },
        },
        randomPath3: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(60vw, -20vh)' },
          '50%': { transform: 'translate(-50vw, 60vh)' },
          '75%': { transform: 'translate(30vw, -50vh)' },
          '100%': { transform: 'translate(-30vw, 100vh)' },
        },
      },
    },
  },
  plugins: [],
};
