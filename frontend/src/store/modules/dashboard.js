import { setValueByNestedKey } from "@/utils/array.js"
import api from "@/api"
import { debounce } from "@/utils/func.js"

const module = {
    namespaced: true,
    state: () => ({
        dashboardId: '',
        options: {
            timeUpdate: 0,
            timeInterval: {
                start: 0,
                end: 0
            },
            cards: []
        }
    }),
    mutations: {
        createCard(state, { label, isCardShow, sourceData, options, position }) {
            const positionObj = position ?? { x: 0, y: 0, w: 4, h: 2 }
            positionObj.i = Date.now()
            state.options.cards.forEach((item) => {
                item.position.y += positionObj.h
            })
            state.options.cards.push({
                label,
                isCardShow,
                sourceData,
                options,
                position: positionObj
            })
        },
        setCardsPosition(state, payload) {
            payload.forEach((el, index) => {
                state.options.cards[index].position = el
            })
        },
        removeCard(state, inex) {
            state.options.cards.splice(inex, 1)
        },
        setDashboardId(state, id) {
            state.dashboardId = id
        },
        setOptions(state, payload) {
            state.options = payload
        },
        updateOptions(state, {key, value}) {
            setValueByNestedKey(state.options, key, value)
        },
    },
    actions: {
        duplicateCard(context, index) {
            context.commit('createCard', JSON.parse(JSON.stringify(context.state.options.cards[index])))
        },
        updateOptions({getters, commit}, {key, value}) {
            commit('updateOptions', {key, value})
            debounced(api.dashboard.update, {id: getters.getDashboardId, options: getters.getOptions})
        },
        setCardsPosition({getters, commit}, payload) {
            commit('setCardsPosition', payload)
            debounced(api.dashboard.update, {id: getters.getDashboardId, options: getters.getOptions})
        },
    },
    getters: {
        getCardsPosition(state) {
            return state.options.cards.map((item) => item.position)
        },
        getCards(state) {
            return state.options.cards
        },
        getDashboardId(state) {
            return state.dashboardId
        },
        getOptions(state) {
            return state.options
        }
    }
}

const debounced = debounce(500)

export default module
