<template lang="">
    <NGrid cols="12" :x-gap="20" responsive="screen">
        <NGridItem span="8">
            <NCard class="h-100">
                <div v-if="false" class="empty-block">Данные отсутствуют</div>
                <VueApexCharts height="100%" :options="cardData.options" :series="series" />
            </NCard>
        </NGridItem>
        <NGridItem span="4">
            <NCard class="h-100">
                <template #header>
                    <NSteps v-model:current="step">
                        <NStep title="Тип" />
                        <NStep title="Внешний вид" />
                        <NStep title="Основное" />
                    </NSteps>
                </template>
                <template #default>
                    <ChartsList
                        v-if="step == 1"
                        v-model:type="cardData.options.chart.type"
                        @update="handlerUpdateChartOptions"
                    />
                    <AppearanceList
                        v-else-if="step == 2"
                        v-model:colors="cardData.options.colors"
                        v-model:widthStroke="cardData.options.stroke.width"
                        v-model:countDashes="cardData.options.stroke.dashArray"
                        v-model:typeCurve="cardData.options.stroke.curve"
                        @update="handlerUpdateChartOptions"
                    />
                    <BasicList
                        v-else-if="step == 3"
                        v-model:label="cardData.label"
                        v-model:isCardShow="cardData.isCardShow"
                        @update="handlerUpdateChartOptions"
                    />
                </template>
                <template #footer>
                    <div class="button-group-action">
                        <NButton strong secondary @click="$router.push('/')">Закрыть</NButton>
                        <NButton strong secondary type="primary" @click="$emit('create', cardData)">
                            Создать
                        </NButton>
                    </div>
                </template>
            </NCard>
        </NGridItem>
    </NGrid>
</template>

<script>
import { NGrid, NGridItem, NCard, NButton, NSteps, NStep } from 'naive-ui'
import ChartsList from './ChartsList/ChartsList.vue'
import AppearanceList from './AppearanceList/AppearanceList.vue'
import BasicList from './BasicList/BasicList.vue'
import VueApexCharts from 'vue3-apexcharts'

export default {
    data() {
        return {
            cardData: {
                label: '',
                isCardShow: true,
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
                        type: 'datetime',
                        categories: [
                            '2018-09-19T00:00:00.000Z',
                            '2018-09-19T01:30:00.000Z',
                            '2018-09-19T02:30:00.000Z',
                            '2018-09-19T03:30:00.000Z',
                            '2018-09-19T04:30:00.000Z',
                            '2018-09-19T05:30:00.000Z'
                        ]
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy HH:mm'
                        }
                    }
                }
            },
            series: [
                {
                    name: 'series1',
                    data: [31, 40, 28, 51, 42, 100]
                }
            ],
            step: 1
        }
    },
    watch: {},
    emits: ['create'],
    components: {
        NGrid,
        NGridItem,
        NCard,
        NButton,
        NSteps,
        NStep,
        ChartsList,
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
