<template>
    <GridLayout v-model:layout="layout" :responsive="true">
        <template #item>
            <PanelDashboardCardVue v-if="isRenderCharts" label="Температура" />
        </template>
    </GridLayout>
</template>

<script>
import { GridLayout } from 'grid-layout-plus'
import PanelDashboardCardVue from './PanelDashboardCard.vue'

export default {
    components: {
        GridLayout,
        PanelDashboardCardVue
    },
    data() {
        return {
            layout: [
                { x: 0, y: 0, w: 2, h: 2, i: '0', static: false },
                { x: 2, y: 0, w: 2, h: 2, i: '+', static: false }
            ],
            isRenderCharts: false
        }
    },
    created() {
        setTimeout(() => {
            this.isRenderCharts = true
        }, 0)
    }
}
</script>

<style scoped></style>
