<template>
    <div>
        <div v-if="getCards.length > 0">
            <GridLayout v-if="isRenderGrid" :key="key" v-model:layout="layout" :responsive="true">
                <GridItem
                    v-for="(item, index) in layout"
                    :key="item.i"
                    :i="item.i"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :static="false"
                    @contextmenu="handlerContextmenuItem($event, index)"
                    drag-allow-from=".vue-draggable-handle"
                    drag-ignore-from=".no-drag"
                >
                    <div class="grid-item-content">
                        <div class="vue-draggable-handle">
                            <Icon icon="mdi:drag" />
                        </div>
                        <PanelDashboardCardVue
                            v-if="isRenderCharts && cardsSeries"
                            :label="getCards[index].label"
                            :isCardShow="getCards[index].isCardShow"
                            :chartOptions="getCards[index].options"
                            :series="cardsSeries[index]"
                        />
                    </div>
                </GridItem>
                <NDropdown
                    placement="bottom-start"
                    trigger="manual"
                    :options="contextMenu.options"
                    :x="contextMenu.position.x"
                    :y="contextMenu.position.y"
                    :show="contextMenu.isShow"
                    @clickoutside="contextMenu.isShow = false"
                    @select="handleSelectContextMenu"
                />
            </GridLayout>
        </div>
        <div v-else class="alert-block">
            <NAlert
                title="Начните прямо сейчас"
                type="info"
                @click="$router.push('/dashboard/create/' + $route.params.id)"
            >
                Нажмите сюда, чтобы создать свою первую карточку
            </NAlert>
        </div>
    </div>
</template>

<script>
import { GridLayout, GridItem } from 'grid-layout-plus'
import { NAlert, NDropdown } from 'naive-ui'
import PanelDashboardCardVue from './PanelDashboardCard.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { h, nextTick } from 'vue'
import { Icon } from '@iconify/vue'

export default {
    components: {
        GridLayout,
        GridItem,
        NAlert,
        NDropdown,
        Icon,
        PanelDashboardCardVue
    },
    data() {
        return {
            key: 1,
            layout: null,
            isRenderGrid: false,
            isRenderCharts: false,
            contextMenu: {
                isShow: false,
                itemIndex: 0,
                position: {
                    x: 0,
                    y: 0
                },
                options: [
                    {
                        key: 'edit',
                        label: 'Изменить',
                        icon: () => h(Icon, { icon: 'tabler:edit' })
                    },
                    {
                        key: 'duplicate',
                        label: 'Дублировать',
                        icon: () => h(Icon, { icon: 'bx:duplicate' })
                    },
                    {
                        key: 'remove',
                        label: 'Удалить',
                        icon: () => h(Icon, { icon: 'fluent:delete-12-regular' })
                    }
                ]
            },
            cardsSeries: null
        }
    },
    watch: {
        layout(newValue) {
            this.setCardsPosition(newValue)
        }
    },
    async created() {
        setTimeout(() => {
            this.layout = this.getCards.map((item) => item.position)
            this.isRenderGrid = true

            setTimeout(() => {
                this.isRenderCharts = true
            }, 0)
        }, 0)

        const updateSeries = async () => {
            const cardsSeries = []
            for (const card of this.getCards) {
                const series = []
                for (const collection of card.sourceData) {
                    const fetchData = (
                        await this.$api.metrics.metrics.getInCollection({ id: collection.id })
                    ).data
                    series.push({
                        name: collection.title,
                        data: fetchData.map((el) => [el.createdAt, el.value])
                    })
                }
                cardsSeries.push(series)
            }
            this.cardsSeries = cardsSeries
        }

        updateSeries()

        this.updateDataInterval = setInterval(updateSeries, this.getOptions.timeUpdate)
    },
    unmounted() {
        clearInterval(this.updateDataInterval)
    },
    computed: {
        ...mapGetters('dashboard', ['getCards', 'getOptions'])
    },
    methods: {
        ...mapMutations('dashboard', ['removeCard']),
        ...mapActions('dashboard', ['setCardsPosition', 'duplicateCard']),
        handlerContextmenuItem(e, index) {
            e.preventDefault()
            this.contextMenu.isShow = false
            nextTick().then(() => {
                this.contextMenu.isShow = true
                this.contextMenu.itemIndex = index
                this.contextMenu.position.x = e.clientX
                this.contextMenu.position.y = e.clientY
            })
        },
        handleSelectContextMenu(key) {
            this.contextMenu.isShow = false
            if (key == 'edit') {
                console.log('edit')
            } else if (key == 'duplicate') {
                this.isRenderCharts = false
                this.duplicateCard(this.contextMenu.itemIndex)
                this.layout = this.getCards.map((item) => item.position)
                setTimeout(() => {
                    this.isRenderCharts = true
                }, 10)
            } else if (key == 'remove') {
                this.removeCard(this.contextMenu.itemIndex)
                this.layout = this.getCards.map((item) => item.position)
            }
        }
    }
}
</script>

<style scoped>
.alert-block {
    cursor: pointer;
    display: flex;
    width: 99vw;
    margin-top: 86px;
    height: calc(100vh - 86px);
    top: 0;
    position: absolute;
    align-items: center;
    justify-content: center;
}

.grid-item-content {
    height: 100%;
}
.vue-draggable-handle {
    display: flex;
    justify-content: flex-end;
    z-index: 1;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 25px;
    padding: 3px 3px 0 0;
    cursor: pointer;
    color: #969696;
}

.vue-draggable-handle svg {
    width: 25px;
    height: 25px;
}
</style>
