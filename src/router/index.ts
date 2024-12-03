import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'doctors',
            component: () => import('../views/DoctorsView.vue'),
        },
        {
            path: '/nurses',
            name: 'nurses',
            component: () => import('../views/NursesView.vue'),
        },
    ],
});

export default router;
