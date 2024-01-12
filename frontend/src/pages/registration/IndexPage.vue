<template lang="">
    <div class="main">
        <div class="main-wrapper">
            <h2 class="label">Регистрация</h2>
            <NCard class="card">
                <NForm ref="form" :model="form" :show-require-mark="false">
                    <NFormItem
                        ref="emailFormItem"
                        label="Электронная почта"
                        path="email"
                        :rule="[emailRule, emailErrorRule]"
                    >
                        <NInput
                            v-model:value="form.email"
                            placeholder="example@yandex.ru"
                            :disabled="isLoading"
                        />
                    </NFormItem>
                    <NFormItem
                        ref="passwordFormItem"
                        label="Пароль"
                        path="password"
                        :rule="passwordRule"
                    >
                        <NInput
                            v-model:value="form.password"
                            placeholder="Введите пароль"
                            type="password"
                            show-password-on="click"
                            :disabled="isLoading"
                        />
                    </NFormItem>
                    <NButton
                        strong
                        secondary
                        type="primary"
                        class="w-100 submit-btn"
                        attr-type="submit"
                        :disabled="isLoading"
                        :loading="isLoading"
                        @click="handleSubmit"
                    >
                        Создать аккаунт
                    </NButton>
                </NForm>
            </NCard>
            <NAlert :show-icon="false" class="alert">
                <span>У вас уже есть аккаунт?&nbsp;</span>
                <RouterLink to="/login">Авторизоваться</RouterLink>
            </NAlert>
        </div>
    </div>
</template>
<script>
import { NCard, NInput, NForm, NFormItem, NButton, NAlert } from 'naive-ui'
import { mapMutations } from 'vuex'
export default {
    components: {
        NCard,
        NForm,
        NFormItem,
        NInput,
        NButton,
        NAlert
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            isSubmitError: false,
            isLoading: false
        }
    },
    computed: {
        emailRule() {
            return {
                message: 'Некорректный адрес',
                required: true,
                trigger: this.isSubmitError ? 'input' : '',
                validator(rule, value) {
                    return value.length > 6
                }
            }
        },
        emailErrorRule() {
            return {
                message: 'Адрес электронной почты занят',
                required: true,
                isErrorOnly: true,
                validator() {
                    return false
                }
            }
        },

        passwordRule() {
            return {
                message: 'Длина от 6 до 64 символов',
                required: true,
                trigger: this.isSubmitError ? 'input' : '',
                validator(rule, value) {
                    return value.length >= 6 && value.length <= 64
                }
            }
        }
    },
    methods: {
        ...mapMutations('user', ['setInfo', 'setAuth']),
        async handleSubmit(e) {
            e || e?.preventDefault()

            try {
                await this.$refs.form.validate(
                    () => {},
                    (rule) => !rule.isErrorOnly
                )
            } catch (error) {
                this.isSubmitError = true
                return
            }

            try {
                this.isLoading = true
                const fetchData = (
                    await this.$api.user.auth.registration({
                        email: this.form.email,
                        password: this.form.password
                    })
                ).data
                this.setInfo(fetchData.user)
                this.$router.push('/')
            } catch (error) {
                if (error?.response.data.message == 'Email занят') {
                    this.$refs.emailFormItem.validate({
                        shouldRuleBeApplied: (rule) => rule.isErrorOnly
                    })
                }
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>
<style scoped>
.label {
    margin-bottom: 12px;
}
.main {
    padding-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 340px;
}
.card {
    margin-bottom: 12px;
}
.alert {
    width: 100%;
    text-align: center;
}
.submit-btn {
    margin-top: 6px;
}
</style>
