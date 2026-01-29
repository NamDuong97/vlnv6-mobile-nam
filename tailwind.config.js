/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e0b',
        background: '#f8fafc',
        card: '#ffffff',
        text: {
          primary: '#0f172a',
          secondary: '#64748b',
        },
        aqua: {
          100: 'rgb(220, 249, 247)',
          // Có thể thêm các shade khác
          200: 'rgb(200, 239, 237)',
          300: 'rgb(180, 229, 227)',
        },
        grey: {
          200: '#212325',
          100: 'rgb(100, 100, 109)',
          50: 'rgb(49 49 75)',
        },
        greenx: {
          200: 'rgb(87, 190, 131)',
          100: 'rgb(242, 251 246)',
          300: 'rgb(7, 137, 89)'
        }

      },
      fontFamily: {
        // Định nghĩa các font family
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
        'mono': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}