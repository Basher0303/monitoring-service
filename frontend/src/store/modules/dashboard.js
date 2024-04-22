import { setValueByNestedKey } from "@/utils/array.js"
import api from "@/api"
import { debounce } from "@/utils/func.js"

const module = {
    namespaced: true,
    state: () => ({
        id: '',
        name: '',
        roles: [],
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
        setId(state, id) {
            state.id = id
        },
        setName(state, name) {
            state.name = name
        },
        setRoles(state, roles) {
            state.roles = roles
        },
        setOptions(state, payload) {
            if(!payload.cards) {
                payload.cards = []
            }
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
            debounced(api.dashboard.updateOptions, {id: getters.getId, options: getters.getOptions})
        },
        setCardsPosition({getters, commit}, payload) {
            commit('setCardsPosition', payload)
            debounced(api.dashboard.updateOptions, {id: getters.getId, options: getters.getOptions})
        },
    },
    getters: {
        getCardsPosition(state) {
            return state.options.cards.map((item) => item.position)
        },
        getCards(state) {
            return state.options.cards
        },
        getId(state) {
            return state.id
        },
        getName(state) {
            return state.name || 'Без названия'
        },
        getRoles(state) {
            return state.roles
        },
        getOptions(state) {
            return state.options
        }
    }
}

const debounced = debounce(500)

export default module
