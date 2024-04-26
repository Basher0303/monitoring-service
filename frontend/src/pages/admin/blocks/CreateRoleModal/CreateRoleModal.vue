<template lang="">
    <NModal
        v-model:show="showComp"
        preset="card"
        :autoFocus="false"
        style="width: 400px"
        title="Создание роли"
    >
        <NForm :model="form">
            <NFormItem ref="form" label="Название" path="name" :rule="ruleName" class="input">
                <NInput v-model:value="form.name" />
            </NFormItem>
            <NButton secondary block type="success" attr-type="submit" @click="handleSubmit">
                Создать
            </NButton>
        </NForm>
    </NModal>
</template>
<script>
import { NModal, NButton, NForm, NFormItem, NInput } from 'naive-ui'
import { mapMutations } from 'vuex'
export default {
    components: {
        NModal,
        NForm,
        NFormItem,
        NButton,
        NInput
    },
    props: {
        show: Boolean
    },
    data() {
        return {
            form: {
                name: ''
            },
            isSubmitError: false
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
        ...mapMutations('global', ['addRoles']),
        async handleSubmit(e) {
            e && e.preventDefault()

            try {
                await this.$refs.form.validate()
            } catch (error) {
                this.isSubmitError = true
                return
            }

            try {
                const fetchData = (await this.$api.roles.create({ name: this.form.name })).data
                this.addRoles(fetchData)
                this.form.name = ''
                this.showComp = false
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
<style scoped>
.input {
    margin-bottom: 5px;
}
</style>
