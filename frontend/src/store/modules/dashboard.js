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
        createCard(state, { label, isCardShow, options }) {
            state.cards.forEach((item) => {
                item.position.y += 2
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
                position: { x: 0, y: 0, w: 4, h: 2, i: Date.now() }
            })
        },
        setCardsPosition(state, payload) {
            payload.forEach((el, index) => {
                state.cards[index].position = el
            })
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
