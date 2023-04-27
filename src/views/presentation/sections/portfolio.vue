<template>
    <div class="relative bg-green_giorgia-200 pt-32 lg:pt-52">
        <!-- YOUTUBE MODAL -->
        <GiorgiaModal
            :is-open="showVideoPlayer"
            hide-footer
            no-padding
            is-scrollable
            @close="showVideoPlayer = false"
            modal-class="w-11/12 lg:w-11/12 xl:w-11/12 2xl:w-11/12"
        >
            <div class="h-full w-full">
                <div id="youtubePlayer"></div>
            </div>
        </GiorgiaModal>

        <!-- PHOTO VIEWER -->
        <viewer
            @inited="onViewerInited"
            class="viewer"
            ref="viewer"
            :options="{
                movable: false,
                toolbar: false,
                navbar: false,
                title: false,
                tooltip: false,
                zoomable: false,
                minZoomRatio: 0.45,
            }"
        >
            <template>
                <img :src="`/images/portfolio/${curImage}`" />
            </template>
        </viewer>

        <!-- directive -->
        <!-- <div v-if="curImage && showImagePlayer" class="images" v-viewer>
            <img :src="`/images/portfolio/${curImage}`" />
        </div> -->

        <SectionHeader initial="P" text="Portfolio" :spaced-bottom="true" />

        <!-- MOBILE CATEGORY SELECTION -->
        <Dialog as="div" class="lg:hidden" @close="showCategoryList = false" :open="showCategoryList">
            <div class="fixed inset-0 z-50" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 bg-opacity-70"
                @click="showCategoryList = false"
            >
                <!-- <div class="flex items-center justify-between">
                    <button
                        type="button"
                        class="-m-2.5 rounded-md bg-green_giorgia-200 p-2.5 text-green_giorgia-600"
                        @click="showCategoryList = false"
                    >
                        <span class="sr-only">Chiudi menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div> -->
                <div class="">
                    <button
                        v-for="(c, iC) in categories"
                        :key="c.id"
                        @click="
                            showCategoryList = false;
                            scrollToCategory(c.id);
                        "
                        type="button"
                        class="flex h-16 w-full items-center border-b border-green_giorgia-200 bg-green_giorgia-50 px-4 py-2 outline-none transition-colors duration-150 ease-in-out hover:bg-green_giorgia-100"
                    >
                        <div class="flex flex-grow">
                            <div
                                class="pr-4 font-serif text-4xl font-bold uppercase tracking-widest text-purple_giorgia-600"
                            >
                                {{ iC + 1 }}
                            </div>
                            <div
                                class="font-serif text-4xl font-bold uppercase tracking-widest text-green_giorgia-600"
                                style="font-size: 33px"
                            >
                                {{ c.description }}
                            </div>
                        </div>
                    </button>
                </div>
            </DialogPanel>
        </Dialog>

        <div class="flex w-full flex-col bg-green_giorgia-50 pt-12 lg:pt-20">
            <div class="mx-auto flex w-full space-y-10 md:max-w-2xla xl:max-w-7xl md:px-8 xl:px-8">
                <div class="flex flex-grow flex-col">
                    <!-- MOBILE CATEGORY LIST BUTTON -->
                    <button
                        @click="toggleCategoryList"
                        type="button"
                        class="w-fulla sticky top-0 mx-4 flex h-16 items-center border-b border-green_giorgia-200 bg-green_giorgia-50 px-4 outline-none transition-colors duration-150 ease-in-out hover:bg-green_giorgia-100 lg:hidden"
                        style="z-index: 8"
                    >
                        <div class="flex flex-grow items-center">
                            <div
                                class="pb-1 pr-4 font-serif text-4xl font-bold uppercase tracking-widest text-purple_giorgia-600"
                            >
                                {{ categories.findIndex((s) => s.id === curMobileCategory?.id) + 1 }}
                            </div>
                            <div
                                class="font-serif text-4xl font-bold uppercase tracking-widest text-green_giorgia-600"
                                style="font-size: 28px"
                            >
                                {{ curMobileCategory?.description }}
                            </div>
                        </div>
                        <div class="flex h-full items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="svg-image stroked h-5 w-5 text-purple_giorgia-600"
                                style="margin-top: 3px"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </button>

                    <!-- CATEGORY LIST -->
                    <div
                        v-for="(c, iC) in categories"
                        :key="iC"
                        class="w-full pb-4 pt-12 lg:pb-20 lg:pt-4"
                        :id="'portfolio_category_' + c.id"
                        ref="portfolioCategoriesRef"
                    >
                        <div class="hidden w-full px-4 pb-2 lg:-mb-9 lg:flex lg:justify-end lg:px-0 lg:pb-0">
                            <div
                                class="pr-4 font-serif text-4xl font-bold uppercase tracking-widest text-purple_giorgia-600 lg:bg-gradient-to-b lg:from-purple_giorgia-500 lg:from-62 lg:to-purple_giorgia-300 lg:to-62 lg:bg-clip-text lg:text-8xl lg:text-transparent"
                            >
                                {{ iC + 1 }}
                            </div>
                            <div
                                class="font-serif text-4xl font-bold uppercase tracking-widest text-green_giorgia-600 lg:bg-gradient-to-b lg:from-green_giorgia-500 lg:from-62 lg:to-green_giorgia-300 lg:to-62 lg:bg-clip-text lg:text-8xl lg:text-transparent"
                            >
                                {{ c.description }}
                            </div>
                        </div>

                        <!-- SECTION LIST -->
                        <div
                            v-for="(s, i) in sections.filter((s) => s.category == c.id)"
                            :key="i"
                            class="relative mb-8 flex w-full flex-col border-green_giorgia-200 lg:mb-16 lg:border"
                        >
                            <div class="flex w-full flex-col items-center px-4 py-8 lg:flex-row lg:px-8 lg:pt-12">
                                <!-- IMAGE EVEN -->
                                <div
                                    v-if="i & 1 && !themesStore.isMD && !themesStore.isSM"
                                    class="-ml-8 flex flex-shrink-0 pr-16"
                                >
                                    <div class="relative bg-green_giorgia-100 pr-10 pt-10">
                                        <div
                                            class="flex justify-end space-x-3 border-t border-purple_giorgia-400 pb-5 pt-5"
                                        >
                                            <div v-for="(p, iP) in s.programs" class="">
                                                <img
                                                    loading="lazy"
                                                    :src="`/images/programs/${p.image}.svg`"
                                                    class="h-8 w-6"
                                                    v-fbr-tooltip="p.description"
                                                />
                                            </div>
                                        </div>
                                        <div class="relative">
                                            <div
                                                v-if="s.image === 'goat_island.png'"
                                                class="absolute inset-0 bg-gray-200 mix-blend-multiply"
                                            ></div>
                                            <img
                                                loading="lazy"
                                                :src="`/images/portfolio/${s.image}`"
                                                class="bg-purple_giorgia-500 object-cover"
                                                :class="s.imageClasses"
                                                :style="s.imageStyles"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-grow flex-col">
                                    <!-- TITLE -->
                                    <div
                                        class="pb-4 font-serif text-4xl font-semibold text-purple_giorgia-700 lg:pb-10 lg:text-5xl"
                                    >
                                        {{ s.title }}
                                    </div>
                                    <div class="flex flex-wrap items-center space-x-2 lg:pb-4">
                                        <!-- TAGS -->
                                        <div
                                            v-for="t in s.tags"
                                            :key="t"
                                            class="mt-2 bg-green_giorgia-200 px-3 py-2 text-xs font-medium uppercase tracking-wider text-green_giorgia-700 lg:mb-2 lg:mt-0"
                                        >
                                            {{ t }}
                                        </div>
                                    </div>

                                    <!-- IMAGE MOBILE -->
                                    <div v-if="themesStore.isMD || themesStore.isSM" class="mx-auto mb-10 mt-4 w-full">
                                        <div class="relative">
                                            <div class="flex space-x-3 border-t border-purple_giorgia-400 pb-5 pt-5">
                                                <div v-for="(p, iP) in s.programs" class="">
                                                    <img
                                                        loading="lazy"
                                                        :src="`/images/programs/${p.image}.svg`"
                                                        class="h-8 w-6"
                                                        v-fbr-tooltip="p.description"
                                                    />
                                                </div>
                                            </div>
                                            <div class="relative">
                                                <div
                                                    v-if="s.image === 'goat_island.png'"
                                                    class="absolute inset-0 bg-gray-200 mix-blend-multiply"
                                                ></div>
                                                <img
                                                    loading="lazy"
                                                    :src="`/images/portfolio/${s.image}`"
                                                    class="w-full bg-purple_giorgia-500 object-cover"
                                                    :class="s.imageClasses"
                                                    :style="s.imageStyles"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- DESCRIPTION -->
                                    <div
                                        v-html="s.description"
                                        class="text-sm font-light leading-7 text-green_giorgia-700 xl:text-base"
                                    ></div>
                                    <!-- BUTTON -->
                                    <div class="mt-8 flex items-center gap-x-6">
                                        <button
                                            v-if="s.isButton"
                                            type="button"
                                            @click="onButtonClick(s, 'video')"
                                            class="w-full bg-purple_giorgia-600 px-6 py-5 text-center text-sm font-semibold text-purple_giorgia-50 shadow-sm transition-colors duration-150 ease-in-out hover:bg-purple_giorgia-700 focus:bg-purple_giorgia-800 focus:outline-none lg:w-auto lg:py-3 lg:text-left"
                                        >
                                            Visualizza progetto
                                        </button>
                                        <button
                                            v-if="!s.isButton && s.imageHigh"
                                            type="button"
                                            @click="onButtonClick(s, 'image')"
                                            class="w-full bg-purple_giorgia-600 px-6 py-5 text-center text-sm font-semibold text-purple_giorgia-50 shadow-sm transition-colors duration-150 ease-in-out hover:bg-purple_giorgia-700 focus:bg-purple_giorgia-800 focus:outline-none lg:w-auto lg:py-3 lg:text-left"
                                        >
                                            Visualizza progetto
                                        </button>
                                        <a
                                            v-if="!s.isButton && s.url"
                                            :href="s.url"
                                            target="_blank"
                                            class="w-full bg-purple_giorgia-600 px-6 py-5 text-center text-sm font-semibold text-purple_giorgia-50 shadow-sm transition-colors duration-150 ease-in-out hover:bg-purple_giorgia-700 focus:bg-purple_giorgia-800 focus:outline-none lg:w-auto lg:py-3 lg:text-left"
                                        >
                                            Visualizza progetto
                                        </a>
                                    </div>
                                </div>

                                <!-- IMAGE ODD -->
                                <div
                                    v-if="!(i & 1) && !themesStore.isMD && !themesStore.isSM"
                                    class="-mr-8 flex flex-shrink-0 pl-16"
                                >
                                    <div class="relative bg-green_giorgia-100 pl-10 pt-10">
                                        <div class="flex space-x-3 border-t border-purple_giorgia-400 pb-5 pt-5">
                                            <div v-for="(p, iP) in s.programs" class="">
                                                <img
                                                    loading="lazy"
                                                    :src="`/images/programs/${p.image}.svg`"
                                                    class="h-6 w-6"
                                                    v-fbr-tooltip="p.description"
                                                />
                                            </div>
                                        </div>
                                        <div class="relative">
                                            <div
                                                v-if="s.image === 'goat_island.png'"
                                                class="absolute inset-0 bg-gray-200 mix-blend-multiply"
                                            ></div>
                                            <img
                                                loading="lazy"
                                                :src="`/images/portfolio/${s.image}`"
                                                class="bg-purple_giorgia-500 object-cover"
                                                :class="s.imageClasses"
                                                :style="s.imageStyles"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CATEGORY MENU (ONLY DESKTOP) -->
                <div class="!mb-36 hidden pt-9 lg:block">
                    <div
                        class="sticky top-0 -ml-px border-l border-r border-t border-green_giorgia-200"
                        style="width: 48px"
                    >
                        <div
                            v-for="(c, iC) in categories"
                            :key="iC"
                            class="cursor-pointer border-b border-green_giorgia-200 px-3 py-6 font-extralight uppercase text-green_giorgia-600 transition-colors duration-150 ease-in-out hover:bg-green_giorgia-100"
                            @click="scrollToCategory(c.id)"
                            :class="c.isActive ? 'bg-green_giorgia-200' : ''"
                            style="writing-mode: vertical-rl"
                        >
                            {{ c.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SectionHeader from "@/components/SectionHeader.vue";
import { useThemes } from "@/store";
import { Ref, computed, onMounted, onUnmounted, ref } from "vue";
import GiorgiaModal from "@/components/GiorgiaModal.vue";
import { watchDebounced } from "@vueuse/core";
import { useElementVisibility } from "@vueuse/core";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { component as Viewer } from "v-viewer";
import "viewerjs/dist/viewer.css";

export type PortfolioSection = {
    title: string;
    category: number;
    description: string;
    tags: string[];
    programs: { image: string; description: string }[];
    image: string;
    imageClasses: string;
    imageStyles: string;
    isButton: boolean;
    url?: string;
    youtubeId?: string;
    imageHigh?: string;
};

const enum CategoryType {
    set_design,
    photography,
    video,
    photoediting,
}

const showVideoPlayer = ref(false);
const youtubeConfig = {
    height: "100%",
    width: "100%",
    playerVars: {
        playsinline: 1,
    },
};

onMounted(() => {
    // initialize youtube player
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag!.parentNode!.insertBefore(tag, firstScriptTag);
});
let player: YT.Player | null = null;
const vueViewer: Ref<any | null> = ref(null);
const showCategoryList = ref(false);
const showImagePlayer = ref(false);
const curImage: Ref<any | null> = ref(null);

const themesStore = useThemes();

const comeSangueDescription = `Scrittura e progettazione di un ipotetico film. Dopo averne delineato la struttura narrativa e l'analisi dei personaggi, sia dal punto
di vista psicologico che nei costumi, è stato fatto un lavoro preparatorio riguardante lo studio delle scene, proponendo reference e mood board per la scenografia.
Con photoshop sono stati realizzati i bozzetti delle cinque scene principali. Tre di queste sono state approfondite con piante e prospetti, tutti i dettagli costruttivi
 degli oggetti di scena, le proposte per i prop acquistabili ed i complementi d’arredo.`;
const magicklandDescription = `Progetto tecnico della prima scena dell'ipotetico film <i>2031 – Oltre le porte di Magickland</i>, comprensivo di plot.
A partire da una foto in location, ho sviluppato il bozzetto della scena con photoshop e progettato il set da costruire in studio. Nel progetto sono analizzate piante e
prospetti, tutti i dettagli costruttivi degli oggetti di scena ed i vari mood board.`;
const ulisseDescription = `Trasposizione dell'<i>Ulisse</i> di James Joyce ai giorni nostri, durante i moti rivoluzionari di Hong Kong del 2019, per un ipotetico pilot
di una serie tv che rivisita i classici della letteratura. Ho sviluppato cinque scene (due esterni da ricostruire in studio e tre interni), di cui sono presenti i bozzetti
modellati in 3d, i progetti tecnici di piante e prospetti, i dettagli costruttivi degli oggetti di scena e lo studio dei
materiali e delle palette colore.`;
const curseDescription = `Ipotesi di ricostruzione set per riproporre la fotografia <i>The Curse of Nanny Goat Island</i> del fotografo inglese Matt Henry. Nel progetto sono
analizzate piante e prospetti, tutti i dettagli costruttivi degli oggetti di scena, compresi di studio dei materiali e delle palette colore.`;
const danielaKevinShootingDescription = `Esempio di shooting fotografico in esterna madre e figlio`;
const hekateDescription = `Progetto artistico personale in autoscatto, performato durante la Quarantena: l'incarnazione di una triplice forma di me, confinata nei pochi
metri concessi dalle necessità del momento, partendo dal bisogno di fare compagnia a me stessa tra il misticismo e la meditazione, con l’uso creativo della fantasia e un pizzico di magia.`;
const noPlaceLikeHomeDescription = `Cortometraggio di cui è stata curata l’intera produzione, dalla scrittura, alla regia, compreso il lavoro di montaggio e post produzione.`;
const urbanMemoriesDescription = `Progetto fotografico sulle case popolari <i>INA – Casa</i> nel quartiere Barca di Bologna.`;
const photographicCollectionDescription = `Esempi fotografici di varia natura, che spaziano tra progetti personali di diversi generi fotografici.`;
const scandaloVsDanielMasterDescription = `Video di un match di wrestling che vede sfidarsi i campioni della federazione milanese <i>TCW – Total Combat Wrestling</i> e della londinese
<i>NFW - New Force Wrestling</i>. Il video è stato girato e montato, sottoposto poi a varie compressioni e ad una post produzione per riproporre l’effetto e le aberrazioni di una
vera VHS degli anni Ottanta. A precedere il montaggio dell’incontro, un’opening volutamente kitsch che si ispira a quelle dei programmi del decennio.`;
const theMagicianDescription = `Sonorizzazione del film senza sonoro <i>The Magician</i> del 1900, dall’archivio Edison. Fa parte di un progetto di tre sonorizzazioni
proiettate alla White Night dell’Accademia di Belle Arti di Bologna del 2017.`;
const bewarethesirenDescription = `Composizione a tema fantasy di una scena in notturna particolarmente incentrata sull’effetto “sott’acqua”.
Utilizzo di maschere, pennelli personalizzati, tracciati, sfumature, filtri avanzati, livelli di regolazione, modifica parametri dei metodi di fusione e degli stili di livello,
uso dei filtri di Camera Raw, alterazione marionetta (puppet warp) per il movimento di alcune parti dei personaggi, vari effetti di luce e riflessi.
Luci, ombre ed effetti di tridimensionalità sono stati rifiniti con la tavoletta grafica.`;
const midnightdreamingDescription = `Composizione a tema fantasy di una scena in notturna che mostra un portale magico che apre verso la strada per un castello.
Particolarmente usati gli strumenti di distorsione e prospettiva, per seguire le linee prospettiche. Utilizzo di maschere, pennelli personalizzati, tracciati, sfumature,
filtri avanzati, livelli di regolazione, modifica parametri dei metodi di fusione e degli stili di livello, uso dei filtri di Camera Raw, utilizzo di sfocature e distorsioni.
Luci, ombre sono stati rifiniti con la tavoletta grafica.`;
const photomanipulationCollectionDescription = `Esempi di varie fotomanipolazioni per creare bozzetti di progetti scenografici. `;
const photoEditing4Description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam.`;

const portfolioCategoriesRef = ref([]);
const categories: Ref<{ id: CategoryType; description: string; isActive: boolean; isMobileActive: boolean }[]> = ref([
    { id: CategoryType.set_design, description: "Set design", isActive: false, isMobileActive: false },
    { id: CategoryType.photography, description: "Fotografia", isActive: false, isMobileActive: false },
    { id: CategoryType.video, description: "Video", isActive: false, isMobileActive: false },
    { id: CategoryType.photoediting, description: "Photo editing", isActive: false, isMobileActive: false },
]);

const sections: PortfolioSection[] = [
    {
        title: "Come sangue nella neve",
        category: CategoryType.set_design,
        description: comeSangueDescription,
        tags: ["scenografia", "progetto tecnico", "fotomanipolazione"],
        programs: [
            { image: "autocad", description: "AutoCAD" },
            { image: "photoshop", description: "Photoshop" },
            { image: "illustrator", description: "Illustrator" },
            { image: "indesign", description: "InDesign" },
        ],
        image: "sangue_resized.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 80%;",
        isButton: false,
        url: "https://drive.google.com/drive/folders/1Olr3LKbnHwrZz54Gy6D7GUg63tyWJy_P?usp=share_linkcom",
    },
    {
        title: "Oltre le porte di Magickland",
        category: CategoryType.set_design,
        description: magicklandDescription,
        tags: ["scenografia", "scenotecnica", "fotomanipolazione"],
        programs: [
            { image: "autocad", description: "AutoCAD" },
            { image: "photoshop", description: "Photoshop" },
            { image: "illustrator", description: "Illustrator" },
        ],
        image: "magickland_resized.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 80%;",
        isButton: false,
        url: "https://drive.google.com/drive/folders/1CyD_M-0gV4PqPax2rOUQMFSsRqnWyPXE?usp=share_link",
    },
    {
        title: "Ulisse",
        category: CategoryType.set_design,
        description: ulisseDescription,
        tags: ["scenografia", "modellazione 3d", "illuminotecnica"],
        programs: [
            { image: "autocad", description: "AutoCAD" },
            { image: "3dsmax", description: "3ds Max" },
            { image: "maya", description: "Maya" },
            { image: "photoshop", description: "Photoshop" },
            { image: "illustrator", description: "Illustrator" },
        ],
        image: "ulisse_resized.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 80%;",
        isButton: false,
        url: "https://drive.google.com/drive/folders/1wT3WjSS0KT2p0Z086y98Sg5pLKVJ70W8?usp=share_link",
    },
    {
        title: "The Curse of Nanny Goat Island",
        category: CategoryType.set_design,
        description: curseDescription,
        tags: ["scenografia", "disegno progettuale"],
        programs: [
            { image: "autocad", description: "AutoCAD" },
            { image: "photoshop", description: "Photoshop" },
            { image: "illustrator", description: "Illustrator" },
        ],
        image: "goat_island_resized.png",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 40%;",
        isButton: false,
        url: "https://drive.google.com/drive/folders/1jZvLblDtT8_xaxtWfGd_47sUNNC7dK1Y?usp=share_link",
    },
    {
        title: "Shooting Daniela e Kevin",
        category: CategoryType.photography,
        description: danielaKevinShootingDescription,
        tags: ["fotografia", "photo editing"],
        programs: [
            { image: "lightroom", description: "Lightroom" },
            { image: "photoshop", description: "Photoshop" },
        ],
        image: "daniela_kevin_resized.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 40%;",
        isButton: false,
        url: "https://drive.google.com/file/d/1W0UfgIFQtO-WcYMTG3kAsBNC2-kdjfUS/view?usp=share_link",
    },
    {
        title: "Hekate",
        category: CategoryType.photography,
        description: hekateDescription,
        tags: ["fotografia", "photo editing"],
        programs: [{ image: "photoshop", description: "Photoshop" }],
        image: "hekate_resized.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 65%;",
        isButton: false,
        url: "https://drive.google.com/file/d/1AEDC-GrDKkvgoPx-QqbxZhv8AJXSCPfi/view?usp=share_link",
    },
    {
        title: "Urban Memories",
        category: CategoryType.photography,
        description: urbanMemoriesDescription,
        tags: ["fotografia", "photo editing", "impaginazione"],
        programs: [
            { image: "photoshop", description: "Photoshop" },
            { image: "indesign", description: "InDesign" },
        ],
        image: "urban_memories_resized.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 15%;",
        isButton: false,
        url: "https://drive.google.com/file/d/1gVJn9b75xWZIcxIKQ7e7SJOH3VvONOOB/view?usp=share_link",
    },
    {
        title: "Raccolta fotografica",
        category: CategoryType.photography,
        description: photographicCollectionDescription,
        tags: ["fotografia", "photo editing"],
        programs: [
            { image: "lightroom", description: "Lightroom" },
            { image: "photoshop", description: "Photoshop" },
        ],
        image: "photographic_collection_resized.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 40%;",
        isButton: false,
        url: "https://drive.google.com/file/d/1bxTDb6DFctx_RpyaZO1Vm3J6YZbhtV6i/view?usp=share_link",
    },
    {
        title: "There’s no place like home",
        category: CategoryType.video,
        description: noPlaceLikeHomeDescription,
        tags: ["video editing", "montaggio", "sound design"],
        programs: [
            { image: "premiere", description: "Premiere" },
            { image: "audition", description: "Audition" },
        ],
        image: "no_place_like_home_resized.png",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 40%;",
        isButton: true,
        youtubeId: "MPr4v-aY4d8",
    },
    {
        title: "Scandalo! vs Daniel Masters",
        category: CategoryType.video,
        description: scandaloVsDanielMasterDescription,
        tags: ["video editing", "montaggio", "video grafica"],
        programs: [
            { image: "premiere", description: "Premiere" },
            { image: "after_effects", description: "After Effects" },
            { image: "audition", description: "Audition" },
        ],
        image: "scandalo_vs_daniel_masters_resized.png",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9; object-position: 0 20%;",
        isButton: true,
        youtubeId: "D9DKcYr1GhU",
    },
    {
        title: "The Magician",
        category: CategoryType.video,
        description: theMagicianDescription,
        tags: ["sound design"],
        programs: [
            { image: "premiere", description: "Premiere" },
            { image: "audition", description: "Audition" },
        ],
        image: "the_magician.gif",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9;",
        isButton: true,
        youtubeId: "RNSKAoiSGQM",
    },
    {
        title: "Beware the siren",
        category: CategoryType.photoediting,
        description: bewarethesirenDescription,
        tags: ["photo editing", "fotomanipolazione"],
        programs: [{ image: "photoshop", description: "Photoshop" }],
        image: "beware_the_siren_resized.jpg",
        imageHigh: "beware_the_siren_high.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9;",
        isButton: false,
    },
    {
        title: "Midnight dreaming",
        category: CategoryType.photoediting,
        description: midnightdreamingDescription,
        tags: ["photo editing", "fotomanipolazione"],
        programs: [{ image: "photoshop", description: "Photoshop" }],
        image: "midnight_dreaming_resized.jpg",
        imageHigh: "midnightdreaming_high.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9;",
        isButton: false,
    },

    {
        title: "Raccolta fotomanipolazioni",
        category: CategoryType.photoediting,
        description: photomanipulationCollectionDescription,
        tags: ["photo editing", "fotomanipolazione"],
        programs: [{ image: "photoshop", description: "Photoshop" }],
        image: "bozzetto_resized.jpg",
        imageClasses: "lg:h-72",
        imageStyles: "aspect-ratio: 16/9;",
        isButton: false,
        url: "https://drive.google.com/file/d/1oP8zBLqGs0REZ1bqqbeiZkU84_Lq2Kic/view?usp=share_link",
    },
];

//     {
//         title: "Photo Editing 2",
//         category: CategoryType.photoediting,
//         description: photoEditing2Description,
//         tags: ["photo editing", "fotomanipolazione"],
//         programs: [{ image: "photoshop", description: "Photoshop" }],
//         image: "photo_editing_2_resized.jpg",
//         imageClasses: "lg:h-72",
//         imageStyles: "aspect-ratio: 16/9;",
//         isButton: false,
//     },
//     {
//         title: "Photo Editing 3",
//         category: CategoryType.photoediting,
//         description: photoEditing3Description,
//         tags: ["photo editing", "fotomanipolazione"],
//         programs: [{ image: "photoshop", description: "Photoshop" }],
//         image: "photo_editing_3_resized.jpg",
//         imageClasses: "lg:h-72",
//         imageStyles: "aspect-ratio: 16/9;",
//         isButton: false,
//     },
//     {
//         title: "Photo Editing 4",
//         category: CategoryType.photoediting,
//         description: photoEditing4Description,
//         tags: ["photo editing", "fotomanipolazione"],
//         programs: [{ image: "photoshop", description: "Photoshop" }],
//         image: "photo_editing_4_resized.jpg",
//         imageClasses: "lg:h-72",
//         imageStyles: "aspect-ratio: 16/9;",
//         isButton: false,
//     },

const curCategory = computed(() => {
    const cur = categories.value.find((s) => s.isActive === true);
    if (cur) {
        return cur;
    } else {
        return categories.value[0];
    }
});
const curMobileCategory = computed(() => {
    const cur = categories.value.find((s) => s.isMobileActive === true);
    if (cur) {
        return cur;
    } else {
        return categories.value[0];
    }
});

async function scrollToCategory(categoryId: number) {
    const categoryElement = document.getElementById("portfolio_category_" + categoryId);
    if (categoryElement) {
        setTimeout(() => {
            categoryElement.scrollIntoView({ behavior: "smooth" });
        }, 10);
    }
}

function onButtonClick(curSection: PortfolioSection, mode: "video" | "image") {
    if (mode === "video") {
        openYoutube(curSection.youtubeId!);
    } else {
        openImage(curSection.imageHigh!);
    }
}

function openYoutube(videoId: string) {
    if (!themesStore.isMD && !themesStore.isSM) {
        // if desktop open inside modal
        showVideoPlayer.value = true;
        setTimeout(() => {
            player = new YT.Player("youtubePlayer", {
                ...youtubeConfig,
                videoId: videoId,
            });
        }, 1000);
    } else {
        // if mobile try to open youtube app
        window.open("vnd.youtube://" + videoId, "_blank");
    }
}
function openImage(imageId: string) {
    curImage.value = imageId;
    // showImagePlayer.value = true;
    openImageViewer();
}

window.addEventListener("scroll", updateScrollPosition);
const scrollPosition = ref(0);
function updateScrollPosition() {
    scrollPosition.value = window.scrollY;
    checkCategoryActive();
}

// watchDebounced(
//     () => scrollPosition.value,
//     () => {
//         checkCategoryActive();
//     },
//     { debounce: 100 }
// );

function isCategoryActive(categoryIndex: number): boolean {
    if (
        portfolioCategoriesRef.value &&
        portfolioCategoriesRef.value.length > 0 &&
        portfolioCategoriesRef.value[categoryIndex]
    ) {
        const isVisible = useElementVisibility(portfolioCategoriesRef.value[categoryIndex]);
        return isVisible.value;
    } else {
        return false;
    }
}
function isCategoryMobileActive(categoryIndex: number): boolean {
    if (
        portfolioCategoriesRef.value &&
        portfolioCategoriesRef.value.length > 0 &&
        portfolioCategoriesRef.value[categoryIndex]
    ) {
        // instead to check if visible, check if section is near to the top of the screen
        const sectionTop = (portfolioCategoriesRef.value[categoryIndex] as any).getBoundingClientRect().top;
        return sectionTop < 100;
    } else {
        return false;
    }
}

function checkCategoryActive() {
    categories.value.forEach((category, index) => {
        if (isCategoryActive(index)) {
            categories.value[index].isActive = true;
            for (let i = 0; i < index; i++) {
                categories.value[i].isActive = false;
            }
        } else {
            categories.value[index].isActive = false;
        }

        if (isCategoryMobileActive(index)) {
            categories.value[index].isMobileActive = true;
            for (let i = 0; i < index; i++) {
                categories.value[i].isMobileActive = false;
            }
        } else {
            categories.value[index].isMobileActive = false;
        }
    });
}

function toggleCategoryList() {
    showCategoryList.value = !showCategoryList.value;
}

function openImageViewer() {
    vueViewer.value.show();
}
function onViewerInited(viewer: any) {
    vueViewer.value = viewer;
}
</script>

<style lang="scss">
.viewer-button {
    right: 24px;
    top: 24px;
    height: 56px;
    width: 56px;
    background-color: rgba(31, 41, 55);
    border-radius: 99px;
}
.viewer-button::before {
    bottom: 18.5px;
    left: 18.5px;
    scale: 1.1;
}
.viewer-button:focus,
.viewer-button:hover {
    background-color: rgba(17, 24, 39);
}
</style>
