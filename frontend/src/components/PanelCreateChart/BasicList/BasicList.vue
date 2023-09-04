<template lang="">
    <div>
        <div class="group">
            <div class="title">Название карточки</div>
            <NInput v-model:value="labelComp" placeholder="Введите название карточки" />
        </div>
        <div class="group">
            <div class="title">Показать фон карточки</div>
            <NSwitch v-model:value="isCardShowComp" />
            <span v-if="isCardShowComp" class="switch-desc">
                Карточка содержимого будет видна на доске
            </span>
            <span v-else class="switch-desc">
                Карточка содержимого будет иметь прозрачный фон на доске
            </span>
        </div>
    </div>
</template>
<script>
import { NInput, NSwitch } from 'naive-ui'
export default {
    components: {
        NInput,
        NSwitch
    },
    props: {
        label: {
            required: true
        },
        isCardShow: {
            required: true
        }
    },
    computed: {
        labelComp: {
            get() {
                return this.label
            },
            set(value) {
                this.$emit('update:label', value)
                this.$emit('update')
            }
        },
        isCardShowComp: {
            get() {
                return this.isCardShow
            },
            set(value) {
                this.$emit('update:isCardShow', value)
                this.$emit('update')
            }
        }
    }
}
</script>
<style scoped>
.group {
    margin-bottom: 12px;
}
.group .title {
    font-weight: 600;
    margin-bottom: 4px;
}
.switch-desc {
    margin-left: 12px;
    color: var(--gray);
}
</style>
