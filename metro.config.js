const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })

// metro.config.js không dùng esm mà dùng commonjs
// metro.config.js là file cấu hình cho Metro bundler (trình build của Expo/React Native),
// dùng để quyết định cách app được build và xử lý code/assets.
// 📌 Với NativeWind, file này giúp:
// Metro hiểu className
// Nạp global.css
// Cho phép Tailwind hoạt động trong React Native