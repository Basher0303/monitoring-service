<template lang="">
    <div v-if="errors[403]" class="main-container">
        <div class="alert-block">
            <NAlert type="warning" title="Нет доступа к панели">
                У Вас нет разрешения для просмотра данной панели
            </NAlert>
            <div class="link" @click="$router.push('/')">Перейти на главную страницу</div>
        </div>
    </div>
    <div v-else-if="errors[404]" class="main-container">
        <div class="alert-block">
            <NAlert type="info" title="Панель не найдена"> Данной панели не существует </NAlert>
            <div class="link" @click="$router.push('/')">Перейти на главную страницу</div>
        </div>
    </div>
    <div v-else>
        <NavBar
            :options="['editPanel', 'createCard', 'timeRange', 'timeUpdate']"
            :title="getName"
            class="main-container"
            @edit="handleEditNavBar"
        />
        <PanelDasboard class="main-container" />
        <EditDashboardModal
            ref="editModal"
            type="edit"
            v-model:show="editModal.show"
            @edit="handleEditModal"
        />
    </div>
</template>

<script>
import { NAlert } from 'naive-ui'
import NavBar from '@/components/NavBar/NavBar.vue'
import PanelDasboard from '@/components/PanelDashboard/PanelDashboard.vue'
import api from '@/api'
import store from '@/store'
import { mapGetters, mapMutations } from 'vuex'
import EditDashboardModal from '../../components/CreateDashboardModal/CreateDashboardModal.vue'

function deepTraversal(obj, callback) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key]
            if (Array.isArray(value)) {
                // Если свойство - массив, обходим его элементы
                for (let i = 0; i < value.length; i++) {
                    if (typeof value[i] === 'object' && value[i] !== null) {
                        // Если элемент массива - объект, рекурсивно вызываем функцию для него
                        deepTraversal(value[i], callback)
                    } else {
                        // Или вызываем callback для каждого элемента массива
                        callback(obj, key, value[i])
                    }
                }
            } else if (typeof value === 'object' && value !== null) {
                // Если свойство - объект, рекурсивно вызываем функцию для него
                deepTraversal(value, callback)
            } else {
                // Или вызываем callback для каждого свойства объекта
                callback(obj, key, value)
            }
        }
    }
}

export default {
    components: {
        NAlert,
        NavBar,
        PanelDasboard,
        EditDashboardModal
    },
    async beforeRouteEnter(to, from, next) {
        try {
            const fetchData = (await api.dashboard.get({ id: to.params.id })).data

            deepTraversal(fetchData.options, (obj, key, value) => {
                if (value === 'true') {
                    obj[key] = true
                } else if (value === 'false') {
                    obj[key] = false
                } else if (!isNaN(+value)) {
                    obj[key] = +value
                }
            })

            store.commit('dashboard/setId', to.params.id)
            store.commit('dashboard/setName', fetchData.name)
            store.commit('dashboard/setRoles', fetchData.roles)
            store.commit('dashboard/setOptions', fetchData.options)

            next()
        } catch (error) {
            if (error.response.status == 403) {
                next((self) => {
                    self.errors[403] = true
                })
            } else if (error.response.status == 404) {
                next((self) => {
                    self.errors[404] = true
                })
            } else {
                console.log(error)
                next(from)
            }
        }
    },
    data() {
        return {
            editModal: {
                show: false
            },
            errors: {
                404: false,
                403: false
            }
        }
    },
    computed: {
        ...mapGetters('dashboard', ['getId', 'getName', 'getRoles'])
    },
    methods: {
        ...mapMutations('dashboard', ['setName', 'setRoles']),
        handleEditNavBar() {
            this.$refs.editModal.setFormValues({
                id: this.getId,
                name: this.getName,
                roles: this.getRoles.map((el) => el._id)
            })
            this.editModal.show = true
        },
        handleEditModal(data) {
            this.setName(data.name)
            this.setRoles(data.roles)
        }
    }
}
</script>
<style scoped>
.alert-block {
    display: flex;
    flex-direction: column;
    width: 99vw;
    margin-top: 86px;
    height: calc(100vh - 86px);
    top: 0;
    position: absolute;
    align-items: center;
    justify-content: center;
}
.link {
    margin-top: 12px;
    font-size: 16px;
    cursor: pointer;
}
.link:hover {
    color: var(--gray);
}
</style>
