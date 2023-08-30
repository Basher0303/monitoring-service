<template lang="">
    <NGrid cols="12" :x-gap="20" responsive="screen">
        <NGridItem span="9"><NCard class="h-100"></NCard></NGridItem>
        <NGridItem span="3">
            <NCard>
                <template #header> Настройки графика </template>
                <template #default>
                    <ChartsList @select="handlerSelectChartsList" />
                    <div class="button-group-action">
                        <NButton strong secondary>Назад</NButton>
                        <NButton strong secondary type="primary">Далее</NButton>
                    </div>
                </template>
            </NCard>
        </NGridItem>
    </NGrid>
</template>

<script>
import { NGrid, NGridItem, NCard, NButton } from 'naive-ui'
import ChartsList from './ChartsList/ChartsList.vue'
export default {
    components: {
        NGrid,
        NGridItem,
        NCard,
        NButton,
        ChartsList
    },
    methods: {
        handlerSelectChartsList(type) {
            console.log('file: PanelCreateChart.vue:27 ~ handlerSelectChartsList ~ type:', type)
        }
    }
}
</script>
<style scoped>
.button-group-action {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
}
</style>
