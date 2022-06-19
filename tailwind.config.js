module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#36bcfb',
        secondary: '#5ec9fc',
        'black-default': '#070b0d',
        'white-dafault': '#ffffff',
        'dark-1': '#151a1e',
        'dark-2': '#22262a',
        'dark-3': '#2a2e32',
        'dark-4': '#3a2e32',
        'light-1': '#e9ebed',
        'light-2': '#a4a8ac',
        'light-3': '#9ca1a5',
      },
      fontFamily: {
        sans: ['Inter'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
