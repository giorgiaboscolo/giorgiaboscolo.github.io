<template>
    <div class="relative bg-green_giorgia-200 pt-32 lg:pt-52">
        <SectionHeader initial="C" text="Contact Me" :spaced-bottom="true" />

        <div class="lg:py-16a sm:py-24a bg-green_giorgia-50">
            <div class="max-w-7xla sm:px-6a lg:px-8a mx-auto">
                <div
                    class="from-10%a relative isolate overflow-hidden bg-gradient-to-b from-green_giorgia-800 to-green_giorgia-700 px-6 pb-12 pt-20 shadow-2xl sm:px-24 xl:pb-12 xl:pt-16"
                >
                    <h2
                        class="mx-auto max-w-2xl pb-8 text-center font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl"
                    >
                        Ti piace quello che hai visto?
                    </h2>
                    <p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                        Contattami via mail o WhatsApp, sono sempre disponibile ad approfondire nuove idee e progetti!
                    </p>

                    <div
                        class="flex w-full flex-col items-center space-y-16 pt-20 lg:flex-row lg:justify-center lg:space-x-16 lg:space-y-0"
                    >
                        <a
                            :href="'whatsapp://send?phone=' + phoneNumberPlain + '&abid=' + phoneNumberPlain"
                            ref="phoneNumberButton"
                            class="group flex h-52 w-52 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-purple_giorgia-400/10 bg-purple_giorgia-400/20 backdrop-blur-xl transition-colors duration-150 ease-in-out hover:bg-purple_giorgia-400/30 active:bg-purple_giorgia-400/40"
                        >
                            <div class="mb-3">
                                <svg
                                    class="svg-image filled h-8 w-8 text-green_giorgia-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                                    />
                                </svg>
                            </div>
                            <span
                                class="text-green_giorgia-100 transition-colors duration-150 ease-in-out group-hover:text-green_giorgia-50"
                                >{{ phoneNumber }}</span
                            >
                        </a>
                        <button
                            type="button"
                            @click="copyEmail"
                            ref="emailButton"
                            class="group flex h-72 w-72 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-purple_giorgia-400/10 bg-purple_giorgia-400/20 backdrop-blur-xl transition-colors duration-150 ease-in-out hover:bg-purple_giorgia-400/30 active:bg-purple_giorgia-400/40"
                        >
                            <div class="mb-3">
                                <svg
                                    class="svg-image filled h-8 w-8 text-green_giorgia-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v24c0 48.6-39.4 88-88 88c-33.4 0-62.5-18.7-77.4-46.1c-20.4 28-53.4 46.1-90.6 46.1c-61.9 0-112-50.1-112-112s50.1-112 112-112c31.3 0 59.7 12.9 80 33.6V176c0-8.8 7.2-16 16-16s16 7.2 16 16v80 24c0 30.9 25.1 56 56 56s56-25.1 56-56V256C480 132.3 379.7 32 256 32zm80 224a80 80 0 1 0 -160 0 80 80 0 1 0 160 0z"
                                    />
                                </svg>
                            </div>
                            <span
                                class="text-green_giorgia-100 transition-colors duration-150 ease-in-out group-hover:text-green_giorgia-50"
                                >{{ email }}</span
                            >
                        </button>
                    </div>

                    <div class="relative">
                        <footer>
                            <div class="pt-20 sm:pt-24 xl:pt-30">
                                <p class="mt-10 text-center text-xs leading-5 text-purple_giorgia-100">
                                    &copy; {{ "2022 - " + curYear + " Giorgia Boscolo. All rights reserved." }}
                                </p>
                            </div>
                        </footer>
                    </div>

                    <svg
                        viewBox="0 0 1024 1024"
                        class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                        aria-hidden="true"
                    >
                        <circle cx="512" cy="512" r="512" fill="url(#giorgia_circle_gradient)" fill-opacity="0.7" />
                        <defs>
                            <radialGradient
                                id="giorgia_circle_gradient"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(512 512) rotate(90) scale(512)"
                            >
                                <stop stop-color="#a53b92" />
                                <stop offset="1" stop-color="#a53b92" stop-opacity="0" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { useTippy } from "vue-tippy";
import SectionHeader from "@/components/SectionHeader.vue";

const phoneNumber = "+39 347 679 3629";
const phoneNumberPlain = "3476793629";
const email = "giorgiaboscolom@gmail.com";
const notificationString = "Copiato negli appunti!";
let phoneNumberButton: Ref<HTMLInputElement | null> = ref(null);
let emailButton: Ref<HTMLInputElement | null> = ref(null);
let phoneNumberTooltip: any | null = null;
let emailTooltip: any | null = null;

onMounted(() => {
    phoneNumberTooltip = useTippy(phoneNumberButton as any, {
        content: notificationString,
    });
    emailTooltip = useTippy(emailButton as any, {
        content: notificationString,
    });
    phoneNumberTooltip.disable();
    emailTooltip.disable();
});

function copyPhoneNumber() {
    copyOnDeviceClipboard(phoneNumberPlain);
    phoneNumberTooltip.enable();
    phoneNumberTooltip.show();
    setTimeout(() => {
        phoneNumberTooltip.hide();
        phoneNumberTooltip.disable();
    }, 2000);
}
function copyEmail() {
    copyOnDeviceClipboard(email);
    emailTooltip.enable();
    emailTooltip.show();
    setTimeout(() => {
        emailTooltip.hide();
        emailTooltip.disable();
    }, 2000);
}

function copyOnDeviceClipboard(text: string) {
    return new Promise<void>((resolve, reject) => {
        if (
            typeof navigator !== "undefined" &&
            typeof navigator.clipboard !== "undefined" &&
            (navigator.permissions as any) !== "undefined"
        ) {
            const type = "text/plain";
            const blob = new Blob([text], { type });
            const data = [new ClipboardItem({ [type]: blob })];
            navigator.permissions.query({ name: "clipboard-write" as any }).then((permission) => {
                if (permission.state === "granted" || permission.state === "prompt") {
                    navigator.clipboard.write(data).then(resolve, reject).catch(reject);
                }
            });
        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";
            textarea.style.width = "2em";
            textarea.style.height = "2em";
            textarea.style.padding = "0";
            textarea.style.border = "none";
            textarea.style.outline = "none";
            textarea.style.boxShadow = "none";
            textarea.style.background = "transparent";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand("copy");
                document.body.removeChild(textarea);
                resolve();
            } catch (e) {
                document.body.removeChild(textarea);
            }
        }
    });
}

const curYear = new Date().getFullYear();
</script>

<style lang="scss"></style>
