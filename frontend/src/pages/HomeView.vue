<template lang="">
    <div>
        <NavBar />
        <PanelCreateChart v-if="false" />
        <PanelDasboard v-else />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import PanelDasboard from '@/components/PanelDashboard/PanelDashboard.vue'
import PanelCreateChart from '@/components/PanelCreateChart/PanelCreateChart.vue'

export default {
    components: {
        NavBar,
        PanelDasboard,
        PanelCreateChart
    }
}
</script>
<style></style>
