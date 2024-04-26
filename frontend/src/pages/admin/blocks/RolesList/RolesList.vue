<template lang="">
    <NCard title="Список ролей">
        <NList class="list">
            <NListItem v-for="role in items" :key="role.id">
                <NGrid cols="12" x-gap="20" xresponsive="screen">
                    <NGridItem span="6">{{ role.name }}</NGridItem>
                    <NGridItem span="6" style="color: var(--gray)">
                        {{ $moment(role.date).format('DD MMMM YYYY в HH:mm') }}
                    </NGridItem>
                </NGrid>
            </NListItem>
        </NList>
        <NButton secondary type="success" class="w-100" @click="$emit('clickCreate')">
            Добавить роль
        </NButton>
    </NCard>
</template>
<script>
import { NCard, NButton, NList, NListItem, NGrid, NGridItem } from 'naive-ui'
import { mapGetters } from 'vuex'
export default {
    components: {
        NCard,
        NButton,
        NList,
        NListItem,
        NGrid,
        NGridItem
    },
    emits: ['clickCreate'],
    computed: {
        ...mapGetters('global', ['getRoles']),
        items() {
            return this.getRoles.map((el) => ({
                id: el._id,
                name: el.name,
                date: el.createdAt
            }))
        }
    }
}
</script>
<style scoped>
.list {
    margin-bottom: 20px;
}
</style>
