const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        'bar-1': 'bar 1s ease-in-out infinite',
        'bar-2': 'bar2 1.5s ease-in-out infinite',
        'bar-3': 'bar3 1.5s ease-in-out infinite'
      },
      keyframes: {
        bar: {
          '0%, 100%': { transform: 'scaleY(1.0) translateY(0rem)' },
          '50%': { transform: 'scaleY(1.5) translateY(-0.082rem)' }
        },
        bar2: {
          '0%, 100%': { transform: 'scaleY(1.0) translateY(0rem)' },
          '50%': { transform: 'scaleY(3) translateY(-0.083rem)' }
        },
        bar3: {
          '0%, 100%': { transform: 'scaleY(1.0) translateY(0rem)' },
          '50%': { transform: 'scaleY(0.5) translateY(0.37rem)' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
