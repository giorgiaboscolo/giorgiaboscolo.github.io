import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        // HOME - PRESENTATION
        {
            path: '/',
            name: 'home',
            components: {
                body: () => import('./views/presentation/index.vue')
            }
        },

        // REDIRECTS
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            components: {
                body: () => import('./views/errors/notFound.vue')
            }
        },
    ]
});

export default router;
