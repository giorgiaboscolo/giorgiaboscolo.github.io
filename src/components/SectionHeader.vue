<template>
    <div class="w-full md:max-w-2xl md:mx-auto lg:max-w-7xl px-4 md:px-0 lg:px-8" :class="spacedBottom ? 'pb-16' : ''">
        <div class="relative tracking-widest font-serif text-green_giorgia-700 font-semibold text-5xl md:text-6xl">
            <span class="z-0 absolute text-purple_giorgia-500 font-bold about-me-title-initial uppercase md:-bottom-4 xl:bottom-auto left-0"
                style="color: #9fc1b6;">{{ initial }}</span>
            <span class="z-10 relative uppercase">
                {{ text }}
                <span class="about-me-purple-thing"></span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";
interface Props {
    initial: string;
    text: string;
    spacedBottom: boolean
}
const { initial = "A", text = "Aaaa", spacedBottom = false } = defineProps<Props>();
</script>

<style lang="scss">
// TITLE
.about-me-purple-thing {
    position: absolute;
    bottom: 1px;
    height: 4px;
    z-index: -1;
    @apply bg-purple_giorgia-600 w-full left-4 lg:left-8;
}

// TITLE INITIAL
.about-me-title-initial {
    font-size: 147px;
    margin-top: -80px;
}

@media (min-width: 1280px) {
    .about-me-title-initial {
        font-size: 194px;
        margin-top: -109px;
    }
}
</style>
