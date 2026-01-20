// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
            'nativewind/babel',
        ],
    };
};


// compiled from babel.config.ts: biên dịch ts sang js
// babel.config.js không dùng esm mà dùng commonjs
// 📌 Trong dự án React Native + Expo, file này giúp:
// Biên dịch JSX / TS / TSX
// Hỗ trợ syntax mới (ES6+)
// Cho phép plugin (ví dụ NativeWind, Reanimated, v.v.) hoạt động đúng