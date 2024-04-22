<template lang="">
    <NTag v-bind="$attrs" :type="name == 'Администратор' ? 'primary' : 'default'">{{ name }}</NTag>
</template>
<script>
import { NTag } from 'naive-ui'
export default {
    components: {
        NTag
    },
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang=""></style>
