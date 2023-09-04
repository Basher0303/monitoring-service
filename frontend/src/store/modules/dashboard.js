export default {
    namespaced: true,
    state: () => ({
        cards: [
            // {
            //     label: 'Название карточки',
            //     isCardShow: true,
            //     series: [
            //         {
            //             name: 'series1',
            //             data: [31, 40, 28, 51, 42, 100]
            //         }
            //     ],
            //     options: {
            //         chart: {
            //             type: 'area',
            //             toolbar: {
            //                 show: false
            //             },
            //             zoom: {
            //                 enabled: false
            //             }
            //         },
            //         dataLabels: {
            //             enabled: false
            //         },
            //         stroke: {
            //             curve: 'straight'
            //         },
            //         xaxis: {
            //             type: 'datetime',
            //             categories: [
            //                 '2018-09-19T00:00:00.000Z',
            //                 '2018-09-19T01:30:00.000Z',
            //                 '2018-09-19T02:30:00.000Z',
            //                 '2018-09-19T03:30:00.000Z',
            //                 '2018-09-19T04:30:00.000Z',
            //                 '2018-09-19T05:30:00.000Z'
            //             ]
            //         },
            //         tooltip: {
            //             x: {
            //                 format: 'dd/MM/yy HH:mm'
            //             }
            //         }
            //     },
            //     position: { x: 0, y: 0, w: 4, h: 2, i: '0' }
            // }
        ]
    }),
    mutations: {
        createCard(state, { label, isCardShow, options, position }) {
            const positionObj = position ?? { x: 0, y: 0, w: 4, h: 2 }
            positionObj.i = Date.now()
            state.cards.forEach((item) => {
                item.position.y += positionObj.h
            })
            state.cards.push({
                label,
                isCardShow,
                options,
                series: [
                    {
                        name: 'series1',
                        data: [31, 40, 28, 51, 42, 100]
                    }
                ],
                position: positionObj
            })
        },
        setCardsPosition(state, payload) {
            payload.forEach((el, index) => {
                state.cards[index].position = el
            })
        },
        removeCard(state, inex) {
            state.cards.splice(inex, 1)
        }
    },
    actions: {
        duplicateCard(context, index) {
            console.log('file: dashboard.js:80 ~ duplicateCard ~ index:', index)

            context.commit('createCard', JSON.parse(JSON.stringify(context.state.cards[index])))
        }
    },
    getters: {
        getCardsPosition(state) {
            return state.cards.map((item) => item.position)
        },
        getCards(state) {
            return state.cards
        }
    }
}
