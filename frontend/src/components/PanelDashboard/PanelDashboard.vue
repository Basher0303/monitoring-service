<template>
    <div v-if="getCards.length > 0">
        <GridLayout v-if="isRenderGrid" v-model:layout="layout" :responsive="true">
            <GridItem
                v-for="(item, index) in layout"
                :key="item.i"
                :i="item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :static="false"
            >
                <div class="grid-item-content">
                    <div class="vue-draggable-handle">
                        <Icon icon="mdi:drag" />
                    </div>
                    <PanelDashboardCardVue
                        v-if="isRenderCharts"
                        :label="getCards[index].label"
                        :isCardShow="getCards[index].isCardShow"
                        :chartOptions="getCards[index].options"
                        :series="getCards[index].series"
                    />
                </div>
            </GridItem>
        </GridLayout>
    </div>
    <div v-else class="alert-block">
        <NAlert title="Начните прямо сейчас" type="success" @click="$router.push('/create')">
            Нажмите сюда, чтобы создать свою первую карточку
        </NAlert>
    </div>
</template>

<script>
import { GridLayout, GridItem } from 'grid-layout-plus'
import { NAlert } from 'naive-ui'
import PanelDashboardCardVue from './PanelDashboardCard.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        GridLayout,
        GridItem,
        NAlert,
        PanelDashboardCardVue
    },
    data() {
        return {
            layout: null,
            isRenderGrid: false,
            isRenderCharts: false
        }
    },
    watch: {
        layout(newValue) {
            this.setCardsPosition(newValue)
        }
    },
    created() {
        setTimeout(() => {
            this.layout = this.getCards.map((item) => item.position)
            this.isRenderGrid = true

            setTimeout(() => {
                this.isRenderCharts = true
            }, 0)
        }, 0)
    },
    computed: {
        ...mapGetters('dashboard', ['getCards'])
    },
    methods: {
        ...mapMutations('dashboard', ['setCardsPosition'])
    }
}
</script>

<style scoped>
.alert-block {
    cursor: pointer;
    display: flex;
    width: 100vw;
    height: 100vh;
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
