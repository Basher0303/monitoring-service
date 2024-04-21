export default {
    namespaced: true,
    state: () => ({
        roles: []
    }),
    mutations: {
        setRoles(state, roles) {
            state.roles = roles;
        },
        addRoles(state, roles) {
            if(Array.isArray(roles)) {
                state.roles.push(...roles);
            } else {
                state.roles.push(roles);
            }
        }
    },
    getters: {
        getRoles(state) {
            return state.roles;
        }
    }
}
