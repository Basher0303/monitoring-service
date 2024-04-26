<template lang="">
    <NGrid cols="1 s:6 m:9 l:12" x-gap="20" y-gap="20" responsive="screen">
        <NGridItem v-for="item in list" :key="item._id" span="3">
            <DashboardItem
                :id="item._id"
                :name="item.name"
                :roles="item.roles"
                :creator="item.creator.email"
                :createdAt="item.createdAt"
                :numsCards="item.options?.cards?.length"
                @click="$emit('select', item._id)"
            />
        </NGridItem>
    </NGrid>
</template>
<script>
import DashboardItem from './DashboardItem.vue'
import { NGrid, NGridItem } from 'naive-ui'
export default {
    components: {
        NGrid,
        NGridItem,
        DashboardItem
    },
    emits: ['select'],
    props: {
        list: {
            Array,
            default: () => {
                return []
            }
        }
    }
}
</script>
<style lang=""></style>
