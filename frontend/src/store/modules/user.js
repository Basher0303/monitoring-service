export default {
    namespaced: true,
    state: () => ({
        info: {},
        isAuth: false,
        isLoaded: false
    }),
    mutations: {
        setInfo(state, payload) {
            state.info = payload;
            state.isAuth = true;
        },
        clearInfo(state) {
            state.info = {};
            state.isAuth = false;
        },
        setLoaded(state, check) {
            state.isLoaded = check;
        }
    },
    getters: {
        getInfo(state) {
            return state.info;
        },
        isAuth(state) {
            return state.isAuth;
        },
        isLoaded(state) {
            return state.isLoaded;
        }
    }
}
