const colors = require('tailwindcss/colors')
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{html,vue,js,ts,jsx,tsx,css,scss}",
        "./node_modules/@lebowska/**/*.{html,vue,js,ts,jsx,tsx,css,scss}",
    ],
    theme: {
        fontFamily: {
            serif: ["'Cormorant Garamond'", "serif"],
            sans: ["Poppins", "sans-serif"],
        },
        colors: {
            slate: colors.slate,
            gray: colors.gray,
            zinc: colors.zinc,
            neutral: colors.neutral,
            stone: colors.stone,
            black: colors.black,
            white: colors.white,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
            transparent: 'transparent',
            green_giorgia: {
                50: "#D0E1DC",
                100: "#C1D7D0",
                200: "#b1cdc4",
                300: "#93ACA4",
                400: "#6F9085",
                500: "#4B7467",
                600: "#3C5D52",
                700: "#2D463E",
                800: "#091314",
                900: "#070F10",
            },
            purple_giorgia: {
                50: "#F3EFF2",
                100: "#E6DFE5",
                200: "#CDBFCB",
                300: "#B4A0B0",
                400: "#9B8096",
                500: "#82607c",
                600: "#684D63",
                700: "#4E3A4A",
                800: "#342632",
                900: "#1A1319",
            },
        },
        extend: {
            gradientColorStopPositions: {
                62: '62%',
            }
        }
    },
};
