<template lang="">
    <component
        :is="isCardShow ? 'NCard' : 'div'"
        content-style="display: flex; flex-direction: column"
        style="display: flex; flex-direction: column"
        class="h-100"
    >
        <div v-if="label" class="title">{{ label }}</div>
        <div class="h-100">
            <VueApexCharts height="100%" :options="chartOptions" :series="series" />
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
        return {}
    }
}
</script>
<style scoped>
.title {
    text-align: center;
    font-size: 18px;
}
</style>
