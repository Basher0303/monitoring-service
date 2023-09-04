<template lang="">
    <div class="main">
        <ChartCard
            v-for="chart in chartsList"
            :key="chart.type"
            :title="chart.title"
            :desciprion="chart.desciprion"
            :isActive="typeComp == chart.type"
            @click="typeComp = chart.type"
            class="item"
        />
    </div>
</template>
<script>
import ChartCard from './ChartCard.vue'
export default {
    components: {
        ChartCard
    },
    props: {
        type: {
            required: true
        }
    },
    created() {
        this.chartsList = [
            {
                title: 'Линия',
                desciprion: 'Базовая линейная диаграмма',
                type: 'line'
            },
            {
                title: 'Область',
                desciprion: 'Базовая линейная диаграмма',
                type: 'area'
            },
            {
                title: 'Столбцы',
                desciprion: 'Базовая линейная диаграмма',
                type: 'column'
            },
            {
                title: 'Бар',
                desciprion: 'Базовая линейная диаграмма',
                type: 'bar'
            }
        ]
    },
    computed: {
        typeComp: {
            get() {
                return this.type
            },
            set(value) {
                this.$emit('update:type', value)
                this.$emit('update')
            }
        }
    }
}
</script>
<style scoped>
.main .item:not(:last-child) {
    margin-bottom: 5px;
}
</style>
