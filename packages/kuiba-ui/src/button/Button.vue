<template>
    <button :disabled="disabled" :class="className" :type="nativeType" @click="onClick">
        <div class="kuiba-button__content">
            <kuiba-icon v-if="icon && iconPosition === 'left'" :name="icon"></kuiba-icon>
            <kuiba-loading v-if="loading" :type="loadingType" size="16"></kuiba-loading>
            <span><slot /></span>
            <kuiba-icon v-if="icon && iconPosition === 'right'" :name="icon"></kuiba-icon>
        </div>
    </button>
</template>

<script lang="ts">
import Icon from '../icon/index'
import Loading from '../loading/index'
import { defineComponent, computed,  PropType, ButtonHTMLAttributes } from 'vue'

export default defineComponent({
    name: 'KuibaButton',
    components: { [Icon.name]: Icon, [Loading.name]: Loading },
    props: {
        type: {
            type: String as PropType<'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'>,
            default: 'default'
        },
        size: { type: String as PropType<'normal' | 'mini' | 'small'>, default: 'normal' },
        nativeType: { type: String as PropType<ButtonHTMLAttributes['type']>, default: 'button' },
        icon: { type: String },
        iconPrefix: { type: String },
        iconPosition: { type: String as PropType<'left' | 'right'>, default: 'left' },
        block: { type: Boolean, default: false },
        plain: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        loadingType: { type: String as PropType<'circle' | 'spinner'>, default: 'circle' }
    },
    emits: ['click'],
    setup(props, { emit }) {
        const className = computed(() => {
            const result = [
                'kuiba-button',
                `kuiba-button--${props.type}`,
                props.size ? `kuiba-button--${props.size}` : '',
                props.plain ? 'kuiba-button--plain' : '',
                props.block ? 'kuiba-button--block' : '',
                props.disabled ? 'kuiba-button--disabled' : ''
            ]
            return result
        })
        const onClick = (event: MouseEvent) => {
            if (props.loading || props.disabled) {
                event.preventDefault()
            } else {
                emit('click', event)
            }
        }
        return { className, onClick }
    }
})
</script>

<style lang="scss">
@import './button.scss';
</style>
