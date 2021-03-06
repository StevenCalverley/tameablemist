const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      maxHeight: {
        56: '14rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'outline-success': '0 0 0 3px rgba(72, 187, 120, .7)',
        'outline-error': '0 0 0 3px rgba(245, 101, 101, .5)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
};
