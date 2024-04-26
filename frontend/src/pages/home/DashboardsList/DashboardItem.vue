<template lang="">
    <NAlert type="info" :show-icon="false" class="card">
        <div class="name">{{ name || 'Без названия' }}</div>
        <div>
            <span class="option-label">Графиков:</span>
            {{ numsCards }} шт.
        </div>
        <div>
            <span class="option-label">Роли: </span>
            <template v-if="roles.length">
                <RoleTag
                    v-for="role in roles"
                    :key="role._id"
                    size="small"
                    class="tag"
                    :name="role.name"
                />
            </template>
            <span v-else>Доступен всем</span>
        </div>
        <div>
            <span class="option-label">Создатель: </span>
            <span>{{ creator }}</span>
            <span v-if="creator == getInfo.email"> (Вы)</span>
        </div>
        <div>
            <span class="option-label">Дата создания:</span>
            {{ $moment(createdAt).format('DD MMMM YYYY в HH:mm') }}
        </div>
    </NAlert>
</template>
<script>
import { NAlert } from 'naive-ui'
import RoleTag from '../../../components/RoleTag/RoleTag.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        NAlert,
        RoleTag
    },
    props: {
        id: {
            type: String,
            reqired: true
        },
        name: {
            type: String,
            reqired: true
        },
        creator: {
            type: String,
            reqired: true
        },
        roles: {
            type: Array,
            reqired: true
        },
        createdAt: {
            reqired: true
        },
        numsCards: {
            type: Number,
            default: 0
        }
    },
    computed: {
        ...mapGetters('user', ['getInfo'])
    }
}
</script>
<style scoped>
.card {
    cursor: pointer;
    transition: box-shadow 0.2s;
}
.card:hover {
    box-shadow:
        0 0 #0000,
        0 0 #0000,
        0 0 #0000,
        0 0 #0000,
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
}
.name {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 8px;
}
.option-label {
    color: var(--gray);
}
.tag {
    margin-left: 6px;
}
</style>
