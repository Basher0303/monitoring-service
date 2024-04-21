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
                    <td>{{ $moment(user.createdAt).format('DD MMMM YYYY в HH:mm') }}</td>
                    <td>
                        <NTag
                            v-for="role in user.roles"
                            :key="role"
                            :type="
                                getRoles.find((el) => el._id == role)?.name == 'Администратор'
                                    ? 'primary'
                                    : 'default'
                            "
                            class="tag"
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
    props: {
        users: Array
    },
    computed: {
        ...mapGetters('global', ['getRoles'])
    },
    emits: ['select']
}
</script>
<style scoped>
tbody tr {
    cursor: pointer;
}
tbody tr:hover td {
    background: var(--n-th-color);
}
.tag {
    margin: 4px 8px 4px 0;
}
</style>
