<template lang="">
    <NGrid cols="12" :x-gap="20" responsive="screen">
        <NGridItem span="8">
            <NCard style="height: 400px">
                <div v-if="false" class="empty-block">Данные отсутствуют</div>
                <VueApexCharts height="100%" :options="cardData.options" :series="series" />
            </NCard>
            <NCard style="margin-top: 20px" title="Источник данных">
                <SourceData
                    @updateCollections="handleUpdateSourceData"
                    @updateSelectedCollection="selectedCollection = $event"
                />
            </NCard>
        </NGridItem>
        <NGridItem span="4" class="h-100">
            <NCard class="h-100">
                <template #default>
                    <NDivider style="margin-top: 0px">Настройки выбранного графика</NDivider>
                    <ChartsList
                        v-model:type="series[selectedCollection].type"
                        @update="handlerUpdateChartOptions"
                    />
                    <AppearanceList
                        v-model:colors="cardData.options.colors[selectedCollection]"
                        v-model:widthStroke="cardData.options.stroke.width[selectedCollection]"
                        v-model:countDashes="cardData.options.stroke.dashArray[selectedCollection]"
                        v-model:typeCurve="cardData.options.stroke.curve[selectedCollection]"
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
            selectedCollection: 0,
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
                    markers: {
                        size: 0,
                        strokeWidth: 1
                    },
                    colors: ['#77B6EA', '#77B6EA', '#77B6EA', '#77B6EA', '#77B6EA'],
                    stroke: {
                        curve: ['smooth', 'smooth', 'smooth', 'smooth', 'smooth'],
                        width: [1, 2, 3, 4, 5],
                        dashArray: [0, 1, 2, 3, 4]
                    },
                    xaxis: {
                        type: 'datetime',
                        labels: {
                            datetimeUTC: false
                        }
                    },
                    tooltip: {
                        shared: true,
                        x: {
                            format: 'dd.MM.yy HH:mm'
                        }
                    }
                }
            },
            series: [
                {
                    type: 'area',
                    name: '',
                    data: []
                }
            ]
        }
    },
    // watch: {
    //     'cardData.options.stroke.width': {
    //         handler(val) {
    //             this.cardData.options.markers.size = [...val]
    //         },
    //         deep: true
    //     }
    // },
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
            const newSeries = []
            for (const collection of collections) {
                const fetchData = (
                    await this.$api.metrics.metrics.getInCollection({ id: collection.id })
                ).data
                newSeries.push({
                    type: collection.type,
                    name: collection.title,
                    data: fetchData.map((el) => [el.createdAt, el.value])
                })
            }
            this.series = newSeries
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
