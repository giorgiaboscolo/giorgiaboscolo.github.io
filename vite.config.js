import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: "esnext",
    },
    plugins: [
        vue({
            reactivityTransform: true,
        }),
        vueI18n({
            include: path.resolve(__dirname, "./src/locales/**"),
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
    },
});
