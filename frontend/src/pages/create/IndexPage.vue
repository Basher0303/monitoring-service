<template lang="">
    <div>
        <NavBar :title="getName" :options="[]" class="main-container" />
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
        ...mapGetters('dashboard', ['getId', 'getName', 'getOptions'])
    },
    methods: {
        ...mapMutations('dashboard', ['createCard']),
        async handlerCreateChart(data) {
            this.createCard({
                isCardShow: true,
                ...data
            })
            await this.$api.dashboard.update({
                id: this.getId,
                options: this.getOptions
            })
            this.$router.push('/dashboard/' + this.getId)
        }
    }
}
</script>
<style></style>
