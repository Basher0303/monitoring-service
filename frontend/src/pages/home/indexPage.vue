<template lang="">
    <div>
        <NavBar class="main-container" />
        <PanelDasboard class="main-container" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import PanelDasboard from '@/components/PanelDashboard/PanelDashboard.vue'

export default {
    components: {
        NavBar,
        PanelDasboard
    }
}
</script>
<style></style>
