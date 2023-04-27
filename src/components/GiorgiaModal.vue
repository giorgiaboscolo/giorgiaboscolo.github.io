<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="onClose" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-900 bg-opacity-70" />
            </TransitionChild>

            <button @click="onClose" type="button"
                class="flex rounded-full items-center justify-center w-12 h-12 bg-gray-800 z-10 hover:bg-gray-900 focus:outline-none cursor-pointer transition-colors ease-in-out duration-150 fixed top-6 right-12">
                <svg class="svg-image filled text-gray-400 w-4 h-4" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path
                        d="M393.4 41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 256 438.6 425.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 301.3 54.6 470.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0L224 210.7 393.4 41.4z" />
                </svg>
            </button>

            <div class="fixed inset-0" :class="{ 'overflow-y-auto': !isScrollable }">
                <div class="flex p-4 md:px-6 md:py-20 justify-center text-center"
                    :class="{ 'items-start': pinned, 'items-center': !pinned, 'min-h-full': !isScrollable, 'h-full': isScrollable }">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="flex flex-col transform overflow-hidden bg-black text-left align-middle shadow-xl transition-all"
                            :class="modalClass && isScrollable ? modalClass + ' h-full' : modalClass ? modalClass : 'w-full max-w-md'">


                            <DialogTitle v-if="title" as="h3" class="pt-6 px-6 text-lg font-medium leading-6 text-gray-900"
                                :class="{ 'pb-4': isScrollable }">
                                {{ title }}
                            </DialogTitle>

                            <!-- <div class="flex justify-end w-full bg-black">
                                <button @click="onClose" type="button"
                                    class="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-900 cursor-pointer transition-colors ease-in-out duration-150">
                                    <svg class="svg-image filled text-gray-400 w-4 h-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M393.4 41.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 256 438.6 425.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 301.3 54.6 470.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0L224 210.7 393.4 41.4z" />
                                    </svg>
                                </button>
                            </div> -->
                            <div class="flex w-full flex-grow"
                                :class="{ 'overflow-y-auto': isScrollable, 'py-4 px-6': !noPadding && !isMessage, 'py-8 px-6': !noPadding && isMessage }">
                                <slot />
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';

interface Props {
    isOpen: boolean;
    title?: string,
    modalClass?: string,
    iconClass?: string,
    isMessage?: boolean,
    hideFooter?: boolean,
    noPadding?: boolean,
    fullHeight?: boolean,
    pinned?: boolean,
    isForced?: boolean,
    isScrollable?: boolean,
    hasIcon?: boolean,
}
const { title, modalClass = "w-full lg:w-10/12 xl:w-8/12 2xl:w-6/12", iconClass = "bg-blue-50", isOpen = false,
    isMessage = false, hideFooter = false, noPadding = false, fullHeight = false, pinned = false, isForced = false, isScrollable = false, hasIcon = false } = defineProps<Props>();
const emit = defineEmits(['close']);

function onClose() {
    if (!isForced) {
        emit('close');
    }
}

</script>

<style lang="scss">

</style>
