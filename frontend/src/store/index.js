import { createStore } from 'vuex'
import globalModule from './modules/global'
import dashboardModule from './modules/dashboard'

export default createStore({
    modules: {
        global: globalModule,
        dashboard: dashboardModule
    }
})
