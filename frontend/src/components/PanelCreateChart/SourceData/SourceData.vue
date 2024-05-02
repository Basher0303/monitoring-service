<template lang="">
    <NForm :model="form">
        <NRadioGroup
            v-model:value="form.selected"
            name="selected-group"
            class="w-100"
            @update:value="$emit('updateSelectedCollection', $event)"
        >
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
                <NRadio :value="index" style="margin-right: 20px" />
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
                            <NInput
                                v-model:value="collection.title"
                                @blur="handleUpdateCollection"
                            />
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
        </NRadioGroup>
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
    NRadio,
    NRadioGroup
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
        NRadio,
        NRadioGroup,
        Icon
    },
    emits: ['updateCollections', 'updateSelectedCollection'],
    data() {
        return {
            collectionsOptions: null,
            form: {
                selected: 0,
                collections: [{ id: null, title: '', filter: '', type: 'area' }]
            }
        }
    },
    async created() {
        this.handleUpdateCollection()
        try {
            this.collectionsOptions = (await this.$api.metrics.collections.getAll()).data.map(
                (el) => {
                    return { label: el.name, value: el._id }
                }
            )
            this.form.collections[0].id = this.collectionsOptions?.[0].value
            this.handleUpdateCollection()
        } catch (error) {}
    },
    methods: {
        handleClickAddCollection() {
            this.form.collections.push({ id: null, title: '', filter: '', type: 'area' })
            this.form.selected = this.form.collections.length - 1
        },
        handleUpdateCollection() {
            this.$emit('updateCollections', this.form.collections)
        },
        handleClickRemoveCollection(index) {
            this.form.collections.splice(index, 1)
            if (this.form.selected > this.form.collections.length - 1) {
                this.form.selected = this.form.collections.length - 1
            }
            this.handleUpdateCollection()
        }
    }
}
</script>
<style lang=""></style>
