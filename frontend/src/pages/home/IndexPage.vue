<template lang="">
    <NavBar
        title="Главная страница"
        :options="['createPanel']"
        class="main-container"
        @create="isCreateModalShow = true"
    />
    <div class="main-container">
        <DashboardsList
            v-if="cards !== null"
            :list="dashboards"
            @select="handleSelectDashboardList"
        />
        <NAlert v-else type="warning" label="Произошла обишка">
            Кажется что-то пошло не так. Перезагрузите страницу, или попробуйте позже.
        </NAlert>
    </div>
    <CreateDashboardModal v-model:show="isCreateModalShow" />
</template>
<script>
import api from '@/api'
import DashboardsList from './DashboardsList/DashboardsList.vue'
import { NAlert } from 'naive-ui'
import NavBar from '../../components/NavBar/NavBar.vue'
import CreateDashboardModal from '../../components/CreateDashboardModal/CreateDashboardModal.vue'
export default {
    components: {
        DashboardsList,
        CreateDashboardModal,
        NAlert,
        NavBar
    },
    async beforeRouteEnter(to, from, next) {
        try {
            const fetchData = (await api.dashboard.getList()).data
            next((self) => {
                self.dashboards = fetchData
            })
        } catch (error) {
            next()
        }
    },
    data() {
        return {
            dashboards: null,
            isCreateModalShow: false
        }
    },
    methods: {
        handleSelectDashboardList(id) {
            this.$router.push('/dashboard/' + id)
        }
    }
}
</script>
<style></style>
