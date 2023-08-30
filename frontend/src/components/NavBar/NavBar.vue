<template lang="">
    <div class="main">
        <div class="header">
            <div class="title">Dashboard</div>
        </div>
        <div class="button-group">
            <NButton strong secondary type="success">
                <template #icon>
                    <NIcon><Icon icon="ic:baseline-addchart" /></NIcon>
                </template>
            </NButton>
            <NButton strong secondary type="primary">
                <template #icon>
                    <NIcon><Icon icon="tabler:edit" /></NIcon>
                </template>
            </NButton>
            <NSelect
                :options="selectTimeRangeOptions"
                :consistent-menu-width="false"
                class="select-time-range"
            />
            <NInputGroup class="select-time-update">
                <NButton strong>
                    <template #icon>
                        <NIcon><Icon icon="tabler:reload" /></NIcon>
                    </template>
                </NButton>
                <NSelect :options="selectTimeUpdateOptions" :consistent-menu-width="false" />
            </NInputGroup>
        </div>
    </div>
</template>

<script>
import { NButton, NIcon, NSelect, NInputGroup } from 'naive-ui'
import { Icon } from '@iconify/vue'
export default {
    components: {
        NButton,
        NIcon,
        NSelect,
        NInputGroup,
        Icon
    },
    data() {
        return {}
    },
    created() {
        this.selectTimeRangeOptions = [
            {
                label: 'за 1 час',
                value: '1'
            },
            {
                label: 'за 3 часа',
                value: '2'
            },
            {
                label: 'за 9 часов',
                value: '3'
            }
        ]

        this.selectTimeUpdateOptions = [
            {
                label: '1 минута',
                value: '1'
            },
            {
                label: '5 минут',
                value: '2'
            },
            {
                label: '10 минут',
                value: '3'
            }
        ]
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: space-between;
    padding: 12px 24px;
}
.header {
}

.header .title {
    font-size: 24px;
}
.button-group {
    display: flex;
}
.button-group > :not(:first-child) {
    margin-left: 10px;
}

.button-group .select-time-range {
    width: 150px;
}

.button-group .select-time-update {
    width: 200px;
}
</style>
