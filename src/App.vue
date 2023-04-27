<template>
    <div class="bg-green_giorgia-200 w-full h-full" ref="appContainer">
        <router-view name="default" />
        <router-view name="body" />
    </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { Ref, ref, onMounted, onUnmounted } from "vue";

import { useThemes } from './store';

const themes = useThemes();

const appContainer: Ref<HTMLInputElement | null> = ref(null);

const windowHTML: Ref<HTMLElement | null> = ref(null);
const resizeObserver: Ref<ResizeObserver | null> = ref(null);
const resizeTimerId: Ref<number | null> = ref(null);

const smWidth = 640;
const mdWidth = 768;
const lgWidth = 1024;
const xlWidth = 1280;
const xxlWidth = 1536;

onMounted(() => {
    addObserver();
});
onUnmounted(() => {
    resetObserver();
});


function resetObserver() {
    if (resizeTimerId.value !== null) {
        clearInterval(resizeTimerId.value);
        resizeTimerId.value = null;
    } else if (resizeObserver.value !== null) {
        resizeObserver.value.disconnect();
        resizeObserver.value = null;
    }
}
function addObserver() {
    windowHTML.value = appContainer.value as HTMLElement | null;
    if (window.ResizeObserver && windowHTML.value) {
        resizeObserver.value = new ResizeObserver((/* elements */) => themes.windowWidth = windowHTML.value!.clientWidth);
        resizeObserver.value.observe(windowHTML.value);
    } else {
        resizeTimerId.value = window.setInterval(() => themes.windowWidth = windowHTML.value!.clientWidth, 500);
    }
}

watchDebounced(
    () => themes.windowWidth,
    () => {
        onWindowWidthUpdate();
    },
    { debounce: 500 },
);

function onWindowWidthUpdate() {
    if (themes.windowWidth > xxlWidth) {
        themes.is2XL = true;
        themes.isXL = false;
        themes.isLG = false;
        themes.isMD = false;
        themes.isSM = false;
    } else if (themes.windowWidth > xlWidth) {
        themes.is2XL = false;
        themes.isXL = true;
        themes.isLG = false;
        themes.isMD = false;
        themes.isSM = false;
    } else if (themes.windowWidth > lgWidth) {
        themes.is2XL = false;
        themes.isXL = false;
        themes.isLG = true;
        themes.isMD = false;
        themes.isSM = false;
    } else if (themes.windowWidth > mdWidth) {
        themes.is2XL = false;
        themes.isXL = false;
        themes.isLG = false;
        themes.isMD = true;
        themes.isSM = false;
    } else {
        themes.is2XL = false;
        themes.isXL = false;
        themes.isLG = false;
        themes.isMD = false;
        themes.isSM = true;
    }
}

</script>
