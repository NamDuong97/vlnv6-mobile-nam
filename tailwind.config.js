/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
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
        }
      }
    },
  },
  plugins: [],
}

// tailwind.config.js không dùng esm mà dùng commonjs
// tailwind.config.js là file cấu hình Tailwind CSS, 
// dùng để định nghĩa các class utility mà bạn được phép dùng trong app React Native (Expo) khi sử dụng NativeWind.
// 📌 Trong dự án React Native + Expo, file này giúp:
// Khai báo màu sắc, font, spacing, breakpoints
// Bật class NativeWind (className)
// Chỉ định file nào được scan để sinh class