<template lang="">
    <NModal
        v-model:show="showComp"
        preset="card"
        :autoFocus="false"
        style="width: 400px"
        title="Редактирование"
    >
        <NFormItem label="Пользователь">
            <NInput :value="form.email" disabled />
        </NFormItem>
        <NFormItem label="Дата регистрации">
            <NInput :value="form.createdAt" disabled />
        </NFormItem>
        <NFormItem label="Роли">
            <NSelect
                v-model:value="form.roles"
                filterable
                multiple
                clearable
                tag
                :options="
                    getRoles.map((el) => ({
                        value: el._id,
                        label: el.name
                    }))
                "
            />
        </NFormItem>
        <NButton secondary block type="success" attr-type="submit" @click="handleSubmit">
            Сохранить
        </NButton>
    </NModal>
</template>
<script>
import { NModal, NButton, NFormItem, NSelect, NInput } from 'naive-ui'
import { mapGetters } from 'vuex'
export default {
    components: {
        NModal,
        NSelect,
        NFormItem,
        NButton,
        NInput
    },
    props: {
        show: Boolean
    },
    emits: ['update:show', 'edit'],
    data() {
        return {
            form: {
                id: '',
                email: '',
                createdAt: '',
                roles: []
            }
        }
    },
    computed: {
        ...mapGetters('global', ['getRoles']),
        showComp: {
            get() {
                return this.show
            },
            set(value) {
                this.$emit('update:show', value)
            }
        }
    },
    methods: {
        setFormValues({ id, email, createdAt, roles }) {
            this.form.id = id
            this.form.email = email
            this.form.createdAt = createdAt
            this.form.roles = roles
        },
        async handleSubmit() {
            try {
                const fetchData = (
                    await this.$api.admin.editUser({
                        user: this.form.id,
                        roles: this.form.roles
                    })
                ).data

                this.$emit('edit', fetchData)
                this.showComp = false
            } catch (error) {}
        }
    }
}
</script>
<style scoped>
.input {
    margin-bottom: 5px;
}
</style>
