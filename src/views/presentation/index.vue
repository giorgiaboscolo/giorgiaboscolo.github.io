<template>
    <header class="absolute inset-x-0 top-0 z-50">
        <!-- MENU -->
        <div class="mx-auto max-w-7xl">
            <div class="px-6 pb-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
                <nav class="flex items-center justify-between lg:justify-start" aria-label="Global">
                    <button type="button" class="-m-2.5 rounded-md p-2.5 lg:hidden" @click="mobileMenuOpen = true">
                        <span class="sr-only">Apri menu</span>
                        <Bars3Icon class="h-8 w-8 text-green_giorgia-300" aria-hidden="true" />
                    </button>
                    <div class="hidden lg:flex lg:gap-x-14">
                        <button
                            v-for="item in navigation"
                            :key="item.name"
                            @click="scrollToSection(item.id)"
                            type="button"
                            class="landing-top-button text-sm font-semibold leading-6"
                        >
                            {{ item.name }}
                        </button>
                    </div>
                </nav>
            </div>
        </div>

        <!-- MOBILE MENU WINDOW -->
        <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-50" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-green_giorgia-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
                <div class="flex items-center justify-between">
                    <button
                        type="button"
                        class="-m-2.5 rounded-md bg-green_giorgia-200 p-2.5 text-green_giorgia-600"
                        @click="mobileMenuOpen = false"
                    >
                        <span class="sr-only">Chiudi menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 pb-6 pt-12">
                            <button
                                v-for="item in navigation"
                                :key="item.name"
                                @click="scrollToSection(item.id)"
                                type="button"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-purple_giorgia-700 hover:bg-gray-50"
                            >
                                {{ item.name }}
                            </button>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>

    <!-- ARROW TO SCROLL TO TOP -->
    <button
        type="button"
        class="fixed bottom-6 right-6 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-purple_giorgia-600 transition-colors duration-150 ease-in-out hover:bg-purple_giorgia-700 shadow-xl"
        style="z-index: 9;"
        @click="scrollToTop"
        v-if="scrollOverFirstScreen"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="svg-image stroked h-7 w-7 text-purple_giorgia-200"
            style="margin-bottom: 3px"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    </button>

    <section class="relative w-full xl:h-screen" id="who">
        <who />
    </section>

    <section class="relative" id="about_me">
        <aboutMe />
    </section>

    <section class="relative" id="portfolio">
        <portfolio />
    </section>

    <section class="relative" id="contact_me">
        <contactMe />
    </section>

    <!-- <section class="relative">
        <footers />
    </section> -->
</template>
<script setup lang="ts">
import { ref } from "vue";
import who from "./sections/who.vue";
import aboutMe from "./sections/aboutMe.vue";
import portfolio from "./sections/portfolio.vue";
import contactMe from "./sections/contactMe.vue";
import footers from "./sections/footers.vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useThemes } from "@/store";

const themesStore = useThemes();

const navigation = [
    { id: "about_me", name: "About me", href: "#" },
    { id: "portfolio", name: "Portfolio", href: "#" },
    { id: "contact_me", name: "Contattami", href: "#" },
];

const mobileMenuOpen = ref(false);

const scrollOverFirstScreen = ref(false);
window.addEventListener("scroll", () => {
    if (window.pageYOffset > window.innerHeight) {
        scrollOverFirstScreen.value = true;
    } else {
        scrollOverFirstScreen.value = false;
    }
});

function scrollToTop() {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 10);
}

const scrollToSection = (sectionId: string) => {
    mobileMenuOpen.value = false;
    const element = document.getElementById(sectionId);
    if (element) {
        let y = element.getBoundingClientRect().top + window.pageYOffset;
        if (!themesStore.isMD && !themesStore.isSM) {
            y = y + 90;
        }
        setTimeout(() => {
            window.scrollTo({ top: y, behavior: "smooth" });
        }, 10);
    }
};
</script>

<style lang="scss"></style>
