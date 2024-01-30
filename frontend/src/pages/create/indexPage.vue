<template lang="">
    <div>
        <NavBar class="main-container" />
        <PanelCreateChart @create="handlerCreateChart" class="main-container" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import PanelCreateChart from '@/components/PanelCreateChart/PanelCreateChart.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        NavBar,
        PanelCreateChart
    },
    computed: {
        ...mapGetters('dashboard', ['getDashboardId', 'getOptions'])
    },
    methods: {
        ...mapMutations('dashboard', ['createCard']),
        async handlerCreateChart(data) {
            this.createCard({
                isCardShow: true,
                ...data
            })
            await this.$api.dashboard.update({
                id: this.getDashboardId,
                options: this.getOptions
            })
            this.$router.push('/dashboard/65b68d08fdc5cc25039cb9c9')
        }
    }
}
</script>
<style></style>
