import { createStore } from 'vuex'
import globalModule from './modules/global'
import dashboardModule from './modules/dashboard'
import userModule from './modules/user'

export default createStore({
    modules: {
        global: globalModule,
        dashboard: dashboardModule,
        user: userModule,
    }
})
