<template lang="">
    <div class="group">
        <div class="title">Цвет линии</div>
        <NColorPicker
            v-model:value="colorsComp"
            :modes="['hex']"
            default-value="#77B6EA"
            :show-alpha="false"
        />
    </div>
    <div class="group">
        <div class="title">Ширина линии</div>
        <NSlider v-model:value="widthStrokeComp" :step="1" :min="0" :max="10" />
    </div>

    <div class="group">
        <div class="title">Интервал между штрихами</div>
        <NSlider v-model:value="countDashesComp" :step="1" :min="0" :max="30" />
    </div>
    <div class="group">
        <div class="title">Тип сглаживания</div>
        <NRadioGroup v-model:value="typeCurveComp" name="radiobuttongroup2">
            <NRadioButton value="smooth" label="Гладкая" />
            <NRadioButton value="monotoneCubic" label="Монотонная кубическая" />
            <NRadioButton value="straight" label="Прямая" />
            <NRadioButton value="stepline" label="Ступенчатая" />
        </NRadioGroup>
    </div>
</template>
<script>
import { NColorPicker, NSlider, NRadioGroup, NRadioButton } from 'naive-ui'
export default {
    components: {
        NColorPicker,
        NSlider,
        NRadioGroup,
        NRadioButton
    },
    props: {
        colors: {
            reqired: true
        },
        widthStroke: {
            reqired: true
        },
        countDashes: {
            reqired: true
        },
        typeCurve: {
            reqired: true
        }
    },
    emits: [
        'update',
        'update:colors',
        'update:countDashes',
        'update:typeCurve',
        'update:widthStroke'
    ],
    computed: {
        colorsComp: {
            get() {
                return this.colors
            },
            set(value) {
                this.$emit('update:colors', value)
                this.$emit('update')
            }
        },
        widthStrokeComp: {
            get() {
                return this.widthStroke
            },
            set(value) {
                this.$emit('update:widthStroke', value)
                this.$emit('update')
            }
        },
        countDashesComp: {
            get() {
                return this.countDashes
            },
            set(value) {
                this.$emit('update:countDashes', value)
                this.$emit('update')
            }
        },
        typeCurveComp: {
            get() {
                return this.typeCurve
            },
            set(value) {
                this.$emit('update:typeCurve', value)
                this.$emit('update')
            }
        }
    }
}
</script>
<style scoped>
.group {
    margin-bottom: 12px;
}
.group .title {
    font-weight: 600;
    margin-bottom: 4px;
}
</style>
