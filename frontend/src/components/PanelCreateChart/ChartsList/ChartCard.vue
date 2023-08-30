<template lang="">
    <div class="main">
        <img src="https://quickchart.io/images/bar_chart_logo.svg" class="icon" />
        <div>
            <div class="title">{{ title }}</div>
            <div class="desc">{{ desciprion }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            required: true
        },
        desciprion: {
            required: true
        }
    }
}
</script>
<style scoped>
.main {
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 6px 12px;
    transition: background-color 0.1s;
}
.main:hover {
    cursor: pointer;
    background-color: #eeeeee;
}

.icon {
    margin-right: 15px;
    width: 30px;
}

.title {
}
.desc {
    font-size: 14px;
    color: var(--gray);
}
</style>
