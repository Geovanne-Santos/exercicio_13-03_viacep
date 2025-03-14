/** @type {import('tailwindcss').Config} */
module.exports = {
  // Atualizando o content para incluir especificamente as pastas app e components
  content: [
    "./app/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {},
  plugins: [],
}