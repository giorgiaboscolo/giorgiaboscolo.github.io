<template>
    <div class="relative w-full xl:h-full">
        <div class="bg-green_giorgia-800 w-full xl:h-full">
            <div class="relative w-full xl:h-full">
                <div class="mx-auto max-w-7xl">
                    <div class="relative z-10 pt-14 lg:w-full lg:max-w-2xl xl:h-screen">

                        <!-- DIAGONAL -->
                        <svg class="absolute inset-y-0 right-8 hidden w-80 h-full translate-x-1/2 transform lg:block fill-green_giorgia-800"
                            viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polygon points="0,0 90,0 50,100 0,100" />
                        </svg>

                        <div class="relative px-4 py-10 sm:py-40 lg:py-56 xl:pb-0 xl:pt-24 xl:h-full lg:px-8 lg:pr-0">
                            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">

                                <!-- ICON -->
                                <div class="flex justify-center pb-16">
                                    <BrandIconMoonNew size="180px"/>
                                </div>

                                <!-- TITLE -->
                                <h1
                                    class="text-6xl font-bold tracking-tight text-color-1 sm:text-6xl landing-main-title relative z-10">
                                    Ciao! Sono Giorgia,<br />
                                    <span class="relative landing-purple-thing">set designer e creativa</span>
                                </h1>

                                <!-- PARAGRAPH -->
                                <p class="text-2xl md:text-xl leading-8 text-color-2 text-green_giorgia-300 font-serif font-light">
                                    Formata in scenografia, fotografia,
                                    photo e video editing, adoro apprendere nuove tecniche per provare a dare vita agli
                                    eccentrici pensieri che abitano la mia mente.
                                    Quando non creo con l'ausilio della tecnologia, riempio pagine d'inchiostro.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- IMAGE -->
                <div class="bg-green_giorgia-100 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img class="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full bg-green_giorgia-700"
                        src="/images/splash_image.jpg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BrandIconMoonNew from '@/components/icons/BrandIconMoonNew.vue';
</script>

<style lang="scss">
.landing-main-title {
    @apply text-green_giorgia-300 font-serif font-medium;
    padding-bottom: 30px;
}

.landing-top-link {
    @apply transition-colors duration-150 ease-in-out;
    border: 1px solid #174434;
}

.landing-top-link:hover {
    border: 1px solid #4a7a69;
}

.landing-top-button {
    @apply transition-colors duration-150 ease-in-out text-green_giorgia-300;
}

.landing-top-button:hover {
    @apply text-green_giorgia-200;
}

.landing-purple-thing:after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 18%;
    width: 86%;
    height: 46px;
    z-index: -1;
    @apply bg-purple_giorgia-700;
}
</style>
