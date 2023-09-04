<template lang="">
    <div>
        <NavBar class="main-container" />
        <PanelCreateChart @create="handlerCreateChart" class="main-container" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import PanelCreateChart from '@/components/PanelCreateChart/PanelCreateChart.vue'
import { mapMutations } from 'vuex'

export default {
    components: {
        NavBar,
        PanelCreateChart
    },
    methods: {
        ...mapMutations('dashboard', ['createCard']),
        handlerCreateChart(data) {
            this.createCard({
                isCardShow: true,
                ...data
            })
            this.$router.push('/')
        }
    }
}
</script>
<style></style>
