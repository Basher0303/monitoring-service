import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home/indexPage.vue'
import CreatePage from '../pages/create/indexPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/create',
            name: 'create',
            component: CreatePage
        }
    ]
})

export default router
