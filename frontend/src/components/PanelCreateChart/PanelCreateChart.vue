<template lang="">
    <NGrid cols="12" :x-gap="20" responsive="screen">
        <NGridItem span="8">
            <NCard style="height: 400px">
                <div v-if="false" class="empty-block">Данные отсутствуют</div>
                <VueApexCharts height="100%" :options="cardData.options" :series="series" />
            </NCard>
            <NCard style="margin-top: 20px" title="Источник данных">
                <SourceData @updateCollections="handleUpdateSourceData" />
            </NCard>
        </NGridItem>
        <NGridItem span="4" class="h-100">
            <NCard class="h-100">
                <template #default>
                    <NDivider style="margin-top: 0px">Настройки выбранного графика</NDivider>
                    <ChartsList
                        v-model:type="cardData.options.chart.type"
                        @update="handlerUpdateChartOptions"
                    />
                    <AppearanceList
                        v-model:colors="cardData.options.colors"
                        v-model:widthStroke="cardData.options.stroke.width"
                        v-model:countDashes="cardData.options.stroke.dashArray"
                        v-model:typeCurve="cardData.options.stroke.curve"
                        @update="handlerUpdateChartOptions"
                    />
                    <NDivider>Настройки карточки</NDivider>
                    <BasicList
                        v-model:label="cardData.label"
                        v-model:isCardShow="cardData.isCardShow"
                        @update="handlerUpdateChartOptions"
                    />
                </template>
                <template #footer>
                    <div class="button-group-action">
                        <NButton
                            strong
                            secondary
                            @click="$router.push(`/dashboard/${$route.params.id}`)"
                            >Закрыть</NButton
                        >
                        <NButton strong secondary type="primary" @click="handleClickSave">
                            Создать
                        </NButton>
                    </div>
                </template>
            </NCard>
        </NGridItem>
    </NGrid>
</template>

<script>
import { NGrid, NGridItem, NCard, NButton, NDivider } from 'naive-ui'
import ChartsList from './ChartsList/ChartsList.vue'
import AppearanceList from './AppearanceList/AppearanceList.vue'
import BasicList from './BasicList/BasicList.vue'
import SourceData from './SourceData/SourceData.vue'
import VueApexCharts from 'vue3-apexcharts'

export default {
    data() {
        return {
            cardData: {
                label: '',
                isCardShow: true,
                sourceData: {
                    collections: []
                },
                options: {
                    chart: {
                        type: 'area',
                        toolbar: {
                            show: false
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ['#77B6EA'],
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                        dashArray: 0
                    },
                    xaxis: {
                        type: 'datetime'
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy HH:mm'
                        }
                    }
                }
            },
            series: []
        }
    },
    watch: {},
    emits: ['create'],
    components: {
        NGrid,
        NGridItem,
        NCard,
        NButton,
        NDivider,
        ChartsList,
        SourceData,
        AppearanceList,
        BasicList,
        VueApexCharts
    },
    methods: {
        handlerSelectChartsList(type) {
            this.chartSettigsDate.type = type
        },
        handlerUpdateChartOptions() {
            this.cardData.options = { ...this.cardData.options }
        },
        handleClickSave() {
            this.$emit('create', this.cardData)
        },
        async handleUpdateSourceData(collections) {
            this.cardData.sourceData = collections
            this.series = []
            for (const collection of collections) {
                const fetchData = (
                    await this.$api.metrics.metrics.getInCollection({ id: collection.id })
                ).data
                this.series.push({
                    name: collection.title,
                    data: fetchData.map((el) => [el.createdAt, el.value])
                })
            }
        }
    }
}
</script>
<style scoped>
.empty-block {
    font-size: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.button-group-action {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
}
</style>
