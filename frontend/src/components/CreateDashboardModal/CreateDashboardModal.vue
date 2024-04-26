<template lang="">
    <NModal
        v-model:show="showComp"
        preset="card"
        :autoFocus="false"
        style="width: 400px"
        :title="`${type == 'create' ? 'Создание' : 'Редактирование'} приборной панели`"
    >
        <NForm ref="form" :model="form">
            <NFormItem label="Название" :rule="ruleName" path="name" class="input">
                <NInput v-model:value="form.name" />
            </NFormItem>
            <NFormItem label="Доступ ролям" class="input">
                <NSelect
                    v-model:value="form.roles"
                    filterable
                    multiple
                    clearable
                    tag
                    :options="
                        getInfo.roles.map((el) => ({
                            value: el._id,
                            label: el.name
                        }))
                    "
                />
            </NFormItem>
            <NButton secondary block type="success" attr-type="submit" @click="handleSubmit">
                <span v-if="type == 'create'">Создать</span>
                <span v-else>Изменить</span>
            </NButton>
        </NForm>
    </NModal>
</template>
<script>
import { NModal, NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
import { mapGetters } from 'vuex'
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
        type: {
            type: String,
            default: 'create'
        },
        show: Boolean
    },
    emits: ['edit', 'update:show'],
    data() {
        return {
            form: {
                id: '',
                name: '',
                roles: []
            },
            isSubmitError: false
        }
    },
    computed: {
        ...mapGetters('user', ['getInfo']),
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
        setFormValues({ id, name, roles }) {
            id && (this.form.id = id)
            name && (this.form.name = name)
            roles && (this.form.roles = roles)
        },
        async handleSubmit(e) {
            e || e.preventDefault()

            try {
                await this.$refs.form.validate()
            } catch (error) {
                this.isSubmitError = true
                return
            }
            if (this.$props.type == 'create') {
                await this.fetchCreate()
            } else {
                await this.fetchEdit()
            }
            this.showComp = false
        },
        async fetchCreate() {
            try {
                const fetchData = (
                    await this.$api.dashboard.create({
                        name: this.form.name,
                        roles: this.form.roles
                    })
                ).data

                this.$router.push('dashboard/' + fetchData._id)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchEdit() {
            try {
                const fetchData = (
                    await this.$api.dashboard.update({
                        id: this.form.id,
                        name: this.form.name,
                        roles: this.form.roles
                    })
                ).data
                this.$emit('edit', fetchData)
            } catch (error) {
                console.error(error)
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
