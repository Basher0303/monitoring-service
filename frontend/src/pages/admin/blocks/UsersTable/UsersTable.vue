<template lang="">
    <NCard title="Список пользователей">
        <NTable :single-line="true">
            <thead>
                <tr>
                    <th style="width: calc(100% / 3)">Пользователь</th>
                    <th style="width: calc(100% / 3)">Дата регистрации</th>
                    <th style="width: calc(100% / 3)">Роли</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user._id" @click="$emit('select', user)">
                    <td>{{ user.email }}</td>
                    <td>{{ $moment(user.createdAd).format('DD MMMM YYYY в HH:mm') }}</td>
                    <td>
                        <NTag
                            v-for="role in user.roles"
                            :key="role"
                            :type="
                                getRoles.find((el) => el._id == role)?.name == 'Администратор'
                                    ? 'primary'
                                    : 'default'
                            "
                        >
                            {{ getRoles.find((el) => el._id == role)?.name }}
                        </NTag>
                    </td>
                </tr>
            </tbody>
        </NTable>
    </NCard>
</template>
<script>
import { NTable, NCard, NTag } from 'naive-ui'
import { mapGetters } from 'vuex'
export default {
    components: {
        NTable,
        NCard,
        NTag
    },
    data() {
        return {
            users: null
        }
    },
    computed: {
        ...mapGetters('global', ['getRoles'])
    },
    emits: ['select'],
    async created() {
        try {
            const fetchData = (await this.$api.admin.getAllUsers()).data
            this.users = fetchData
        } catch (error) {
            console.log(error)
        }
    }
}
</script>
<style scoped>
tbody tr {
    cursor: pointer;
}
tbody tr:hover td {
    background: var(--n-th-color);
}
</style>
