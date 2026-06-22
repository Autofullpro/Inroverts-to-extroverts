module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand1: '#7c3aed',
        brand2: '#06b6d4'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(2,6,23,0.6)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
