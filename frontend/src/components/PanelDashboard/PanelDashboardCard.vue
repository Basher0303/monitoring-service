<template lang="">
    <component
        :is="isCardShow ? 'NCard' : 'div'"
        content-style="display: flex; flex-direction: column"
        style="display: flex; flex-direction: column"
        class="h-100"
        @contextmenu="handler"
    >
        <div v-if="label" class="title">{{ label }}</div>
        <div class="h-100">
            <VueApexCharts height="100%" :options="chart.chartOptions" :series="chart.series" />
        </div>
    </component>
</template>

<script>
import { NCard } from 'naive-ui'
import VueApexCharts from 'vue3-apexcharts'

export default {
    components: {
        NCard,
        VueApexCharts
    },
    props: {
        isCardShow: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: ''
        },
        series: {
            type: Array,
            required: true
        },
        chartOptions: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: {
                series: [
                    {
                        name: 'series1',
                        data: [31, 40, 28, 51, 42, 100]
                    }
                ],
                chartOptions: {
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
                    stroke: {
                        curve: 'smooth'
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
            }
        }
    },
    methods: {
        handler(e) {
            e.preventDefault()
        }
    }
}
</script>
<style scoped>
.title {
    text-align: center;
    font-size: 18px;
}
</style>
