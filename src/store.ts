import { defineStore } from 'pinia';

export const useThemes = defineStore({
    id: 'themes',
    state: () => ({
        windowWidth: 0,
        isSM: false,
        isMD: false,
        isLG: false,
        isXL: false,
        is2XL: false,
        darkMode: false,
    }),
    actions: {
        updateWindowWidth(value: number) {
            this.windowWidth = value;
        },
        updateIsSM(value: boolean) {
            this.isSM = value;
        },
        updateIsMD(value: boolean) {
            this.isMD = value;
        },
        updateIsLG(value: boolean) {
            this.isLG = value;
        },
        updateIsXL(value: boolean) {
            this.isXL = value;
        },
        updateIs2XL(value: boolean) {
            this.is2XL = value;
        },
        updateDarkMode(value: boolean) {
            this.darkMode = value;
        }
    }
})
