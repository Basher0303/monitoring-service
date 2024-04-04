<template lang="">
    <NAlert type="info" :show-icon="false" class="card">
        <div class="name">{{ name || 'Без названия' }}</div>
        <div>
            <span class="option-label">Графиков:</span>
            {{ numsCards }} шт.
        </div>
        <div>
            <span class="option-label">Создатель:</span>
            Вы
        </div>
        <div>
            <span class="option-label">Создана:</span>
            {{ $moment(createdAt).format('DD MMMM YYYY в HH:mm') }}
        </div>
    </NAlert>
</template>
<script>
import { NAlert } from 'naive-ui'
export default {
    components: {
        NAlert
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
        createdAt: {
            type: Number,
            reqired: true
        },
        numsCards: {
            type: Number,
            default: 0
        }
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
</style>
