/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#222222",
        "text-dimmed": "#717171",
      },
    },
  },
  plugins: [],
};

module.exports = config;
