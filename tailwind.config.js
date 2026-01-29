// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   // මෙහි folder path නිවැරදිදැයි බලන්න.
//   // ඔබ screens folder එකක් භාවිතා කරන්නේ නම් එය අනිවාර්යයෙන්ම මෙහි තිබිය යුතුයි.
//   content: [
//     "./App.{js,jsx,ts,tsx}",
//     "./screens/**/*.{js,jsx,ts,tsx}", // screens folder එක ඇතුළේ ඇති files
//     "./components/**/*.{js,jsx,ts,tsx}",
//   ],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Dark Mode එක manually control කිරීමට මෙය අත්‍යවශ්‍ය වේ
  darkMode: "class",

  // ඔබේ project එකේ සියලුම files මෙහි cover වී ඇත්දැයි බලන්න
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Expo Router භාවිතා කරන්නේ නම් මෙය වැදගත් වේ
    "./screens/**/*.{js,jsx,ts,tsx}", // Screens folder එක සඳහා
    "./components/**/*.{js,jsx,ts,tsx}", // Components folder එක සඳහා
    "./src/**/*.{js,jsx,ts,tsx}", // ඔබ src folder එකක් භාවිතා කරන්නේ නම්
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {},
  },

  plugins: [],
};
