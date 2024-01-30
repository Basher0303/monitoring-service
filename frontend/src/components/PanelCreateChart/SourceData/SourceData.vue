<template lang="">
    <NForm :model="form">
        <div
            v-for="(collection, index) in form.collections"
            :key="index"
            style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid var(--n-border-color);
                padding-top: 24px;
            "
        >
            <NCheckbox style="margin-right: 20px" />
            <NGrid cols="1 s:12" x-gap="20" y-gap="20" responsive="screen">
                <NGridItem span="3">
                    <NFormItem label="Коллекция метрик">
                        <NSelect
                            v-model:value="collection.id"
                            :options="collectionsOptions"
                            @update:value="handleUpdateCollection"
                        />
                    </NFormItem>
                </NGridItem>
                <NGridItem span="4">
                    <NFormItem label="Название графика">
                        <NInput v-model:value="collection.title" />
                    </NFormItem>
                </NGridItem>
                <NGridItem span="5">
                    <NFormItem label="Фильтр">
                        <NInput v-model:value="collection.filter" />
                    </NFormItem>
                </NGridItem>
            </NGrid>
            <NButton
                secondary
                type="error"
                :disabled="form.collections.length == 1"
                style="margin-left: 20px"
                @click="handleClickRemoveCollection(index)"
            >
                <template #icon>
                    <NIcon>
                        <Icon icon="tabler:trash" />
                    </NIcon>
                </template>
            </NButton>
        </div>
        <NButton
            secondary
            type="success"
            style="margin-top: 20px"
            @click="handleClickAddCollection"
        >
            Новая коллекция
        </NButton>
    </NForm>
</template>
<script>
import {
    NGrid,
    NGridItem,
    NInput,
    NForm,
    NFormItem,
    NButton,
    NSelect,
    NIcon,
    NCheckbox
} from 'naive-ui'
import { Icon } from '@iconify/vue'
export default {
    components: {
        NGrid,
        NGridItem,
        NInput,
        NForm,
        NFormItem,
        NButton,
        NSelect,
        NIcon,
        NCheckbox,
        Icon
    },
    emits: ['updateCollections'],
    data() {
        return {
            collectionsOptions: null,
            form: {
                collections: [{ id: null, title: '', filter: '' }]
            }
        }
    },
    async created() {
        try {
            this.collectionsOptions = (await this.$api.metrics.collections.getAll()).data.map(
                (el) => {
                    return { label: el.name, value: el._id }
                }
            )
        } catch (error) {}
    },
    methods: {
        handleClickAddCollection() {
            this.form.collections.push({ id: null, title: '', filter: '' })
        },
        handleUpdateCollection() {
            this.$emit('updateCollections', this.form.collections)
        },
        handleClickRemoveCollection(index) {
            this.form.collections.splice(index, 1)
        }
    }
}
</script>
<style lang=""></style>
