export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF7640',
        'primary-hover': '#CC5729'
      },
      backgroundImage: {
        'home-gradient': 'radial-gradient(circle, #FFE2D7, #FFFFFF)'
      }
    },
  },
  plugins: [],
}