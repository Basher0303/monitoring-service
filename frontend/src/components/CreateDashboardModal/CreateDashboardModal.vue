<template lang="">
    <NModal
        v-model:show="showComp"
        preset="card"
        :autoFocus="false"
        style="width: 400px"
        title="Создание приборной панели"
    >
        <NForm ref="form" :model="form">
            <NFormItem label="Название" :rule="ruleName" path="name" class="input">
                <NInput v-model:value="form.name" />
            </NFormItem>
            <NFormItem label="Доступ ролям" class="input">
                <NSelect
                    v-model:value="multipleSelectValue"
                    filterable
                    multiple
                    clearable
                    tag
                    :options="selectOptions"
                />
            </NFormItem>
            <NButton secondary block type="success" attr-type="submit" @click="handleSubmit">
                Создать
            </NButton>
        </NForm>
    </NModal>
</template>
<script>
import { NModal, NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
export default {
    components: {
        NModal,
        NInput,
        NSelect,
        NButton,
        NForm,
        NFormItem
    },
    props: {
        show: Boolean
    },
    data() {
        return {
            form: {
                name: ''
            },
            isSubmitError: false,
            selectOptions: [
                {
                    label: 'Отдел тестирования',
                    value: 0
                },
                {
                    label: 'Отдел продаж',
                    value: 1
                },
                {
                    label: 'Отдел разработки',
                    value: 2
                },
                {
                    label: 'Администратор',
                    value: 3
                }
            ]
        }
    },
    computed: {
        showComp: {
            get() {
                return this.show
            },
            set(value) {
                this.$emit('update:show', value)
            }
        },
        ruleName() {
            return {
                validator(rule, value) {
                    return value.length > 3
                },
                trigger: this.isSubmitError ? 'input' : '',
                message: 'Длина должна быть больше 3 символов'
            }
        }
    },
    methods: {
        async handleSubmit(e) {
            e || e.preventDefault()

            try {
                await this.$refs.form.validate()
            } catch (error) {
                this.isSubmitError = true
                return
            }

            try {
                const fetchData = (await this.$api.dashboard.create({ name: this.form.name })).data

                this.$router.push('dashboard/' + fetchData._id)
            } catch (error) {
                console.error(error)
            }
            this.showComp = false
        }
    }
}
</script>
<style scoped>
.input {
    margin-bottom: 5px;
}
</style>
