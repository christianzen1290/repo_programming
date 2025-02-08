module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Look for tailwind classes in the app folder
    './pages/**/*.{js,ts,jsx,tsx}', // If you still have pages directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}