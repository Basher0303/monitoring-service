<template lang="">
    <div>
        <ChartCard
            v-for="chart in chartsList"
            :key="chart.type"
            :title="chart.title"
            :desciprion="chart.desciprion"
            @click="$emit('select', chart.type)"
        />
    </div>
</template>
<script>
import ChartCard from './ChartCard.vue'
export default {
    components: {
        ChartCard
    },
    created() {
        this.chartsList = [
            {
                title: 'Линия',
                desciprion: 'Базовая линейная диаграмма',
                type: 'Line'
            },
            {
                title: 'Линия',
                desciprion: 'Базовая линейная диаграмма',
                type: 'Line'
            },
            {
                title: 'Линия',
                desciprion: 'Базовая линейная диаграмма',
                type: 'Line'
            },
            {
                title: 'Линия',
                desciprion: 'Базовая линейная диаграмма',
                type: 'Line'
            }
        ]
    }
}
</script>
<style lang=""></style>
