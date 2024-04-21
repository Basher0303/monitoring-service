<template lang="">
    <NavBar title="Страница администратора" :options="[]" class="main-container" />
    <div class="main-container">
        <NGrid cols="1 s:12" x-gap="20" y-gap="20" responsive="screen">
            <NGridItem span="3">
                <RolesList @clickCreate="handleClickCreate" />
            </NGridItem>
            <NGridItem span="9">
                <UsersTable :users="users" @select="handleSelectUser" />
            </NGridItem>
        </NGrid>
    </div>
    <EditModal ref="editModal" v-model:show="editModal.show" @edit="handleEditUser" />
    <CreateRoleModal v-model:show="createRoleModal.show" />
</template>
<script>
import { NGrid, NGridItem } from 'naive-ui'
import NavBar from '../../components/NavBar/NavBar.vue'
import UsersTable from './blocks/UsersTable/UsersTable.vue'
import EditModal from './blocks/EditModal/EditModal.vue'
import CreateRoleModal from './blocks/CreateRoleModal/CreateRoleModal.vue'
import RolesList from './blocks/RolesList/RolesList.vue'
export default {
    components: {
        NGrid,
        NGridItem,
        NavBar,
        UsersTable,
        EditModal,
        CreateRoleModal,
        RolesList
    },
    data() {
        return {
            users: [],
            editModal: {
                show: false
            },
            createRoleModal: {
                show: false
            }
        }
    },
    async created() {
        const fetchData = (await this.$api.admin.getAllUsers()).data
        this.users = fetchData
    },
    methods: {
        handleClickCreate() {
            this.createRoleModal.show = true
        },
        handleSelectUser(user) {
            this.$refs.editModal.setFormValues({
                id: user._id,
                email: user.email,
                createdAt: this.$moment(user.createdAt).format('DD MMMM YYYY в HH:mm'),
                roles: user.roles
            })
            this.editModal.show = true
        },
        handleEditUser(user) {
            this.users.find((el) => el._id == user._id).roles = user.roles
        }
    }
}
</script>
<style scoped>
.block {
    margin-bottom: 20px;
}
</style>
