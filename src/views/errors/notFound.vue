<template>
    <div class="px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 bg-green_giorgia-50">
        <div class="mx-auto max-w-max">
            <main class="sm:flex">
                <p class="text-purple_giorgia-500 text-4xl font-extrabold sm:text-5xl">404</p>
                <div class="sm:ml-6">
                    <div class="sm:border-green_giorgia-400 sm:border-l sm:pl-6">
                        <h1 class="text-4xl font-extrabold tracking-tight text-purple_giorgia-800 sm:text-5xl">
                            Pagina non trovata
                        </h1>
                        <p class="mt-4 text-base font-semibold text-purple_giorgia-600">
                            Dove sei finito? Torna a casa
                        </p>
                    </div>
                    <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                        <button
                            type="button"
                            @click="updateRouter('home')"
                            class="w-full bg-purple_giorgia-600 px-6 py-5 text-center text-sm font-semibold text-purple_giorgia-50 shadow-sm transition-colors duration-150 ease-in-out hover:bg-purple_giorgia-700 focus:bg-purple_giorgia-800 focus:outline-none lg:w-auto lg:py-3 lg:text-left"
                        >
                            Torna a casa
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function updateRouter(viewIn: string) {
    router.push({ name: viewIn });
}
</script>

<style scoped lang="scss"></style>
