/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './App.tsx',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {},
  },
  plugins: [],
};
