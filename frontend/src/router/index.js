import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home/indexPage.vue'
import DashboardPage from '../pages/dashboard/indexPage.vue'
import CreatePage from '../pages/create/indexPage.vue'
import LoginPage from '../pages/login/IndexPage.vue'
import RegistrationPage from '../pages/registration/IndexPage.vue'
import store from '@/store/index.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            meta: {
                isAuth: true
            }
        },
        {
            path: '/dashboard/:id',
            component: DashboardPage,
            meta: {
                isAuth: true
            }
        },
        {
            path: '/create',
            name: 'create',
            component: CreatePage,
            meta: {
                isAuth: true
            }
        },
        {
            path: '/login',
            component: LoginPage,
            meta: {
                isNotAuth: true
            }
        },
        {
            path: '/registration',
            component: RegistrationPage,
            meta: {
                isNotAuth: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
	const rerouteFunc = function() {
        const isAuth = store.getters['user/isAuth'];
        if(to.meta.isAuth) {
            if(isAuth) next();
            else next('/login');
        } else if(to.meta.isNotAuth) {
            if(isAuth) next('/');
            else next();
        } else {
            next();
        }
	};

	// Если страница требует авторизации и данные о аккаунте ещё не загружены
	if ((to.meta.isAuth || to.meta.isNotAuth) && !store.getters['user/isLoaded']) {
		// Подождать когда данные придут и выполнить переход на маршрут
		const unwatch = store.watch(
			(state, getters) => getters['user/isLoaded'],
			(newValue, oldValue) => {
				if (newValue) {
					unwatch();
					rerouteFunc();
				}
			}
			);
	} else {
		rerouteFunc();
	}
});

export default router
