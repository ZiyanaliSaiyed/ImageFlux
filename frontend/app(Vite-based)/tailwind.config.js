/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Scans all HTML files in the root directory (index.html, about.html, etc.)
    "./assets/js/*.js" // Scans JS files in assets/js/ for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

