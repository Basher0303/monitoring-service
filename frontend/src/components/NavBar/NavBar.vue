<template lang="">
    <div class="main">
        <div class="header">
            <div class="title">Dashboard</div>
        </div>
        <div class="button-group">
            <NButton secondary type="success" @click="$router.push('/create')">
                <template #icon>
                    <NIcon><Icon icon="ic:baseline-addchart" /></NIcon>
                </template>
                <template #default><span style="font-weight: 600">Добавить</span></template>
            </NButton>
            <NSelect
                :options="selectTimeRangeOptions"
                :consistent-menu-width="false"
                placeholder="Временной интервал"
                class="select-time-range"
            />
            <NInputGroup class="select-time-update">
                <NButton strong>
                    <template #icon>
                        <NIcon><Icon icon="tabler:reload" /></NIcon>
                    </template>
                </NButton>
                <NSelect
                    v-model:value="timeUpdateValue"
                    :options="selectTimeUpdateOptions"
                    :consistent-menu-width="false"
                    placeholder="Период обновления"
                />
            </NInputGroup>
            <NButton strong secondary type="error" @click="handleClickLogout"> Выйти </NButton>
        </div>
    </div>
</template>

<script>
import { NButton, NIcon, NSelect, NInputGroup } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
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
                value: 60 * 1000
            },
            {
                label: '5 минут',
                value: 5 * 60 * 1000
            },
            {
                label: '10 минут',
                value: 10 * 60 * 1000
            }
        ]
    },
    computed: {
        ...mapGetters('dashboard', ['getOptions']),
        timeUpdateValue: {
            get() {
                return this.getOptions.timeUpdate
            },
            set(value) {
                this.updateOptions({ key: 'timeUpdate', value: value })
            }
        }
    },
    methods: {
        ...mapMutations('user', ['clearInfo']),
        ...mapActions('dashboard', ['updateOptions']),
        async handleClickLogout() {
            try {
                await this.$api.user.auth.logout()
                this.clearInfo()
                this.$router.push('/login')
            } catch (error) {}
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    padding-bottom: 24px;
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
    width: 200px;
}

.button-group .select-time-update {
    width: 250px;
}
</style>
