<template lang="">
    <div>
        <NavBar class="main-container" />
        <PanelDasboard class="main-container" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import PanelDasboard from '@/components/PanelDashboard/PanelDashboard.vue'
import api from '@/api'
import store from '@/store'

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
        NavBar,
        PanelDasboard
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

            store.commit('dashboard/setDashboardId', to.params.id)
            store.commit('dashboard/setOptions', fetchData.options)

            next()
        } catch (error) {
            console.log(error)
            next(from)
        }
    }
}
</script>
<style></style>
