<template>
  <button :disabled="disabled" :class="className" :type="nativeType" @click="onClick">
    <div class="kuiba-button__content">
      <kuiba-icon v-if="icon && iconPosition === 'left'" :name="icon"></kuiba-icon>
      <span><slot /></span>
      <kuiba-icon v-if="icon && iconPosition === 'right'" :name="icon"></kuiba-icon>
    </div>
  </button>
</template>

<script lang="ts">
import Icon from '../icon/index'
import { defineComponent, computed, PropType, ButtonHTMLAttributes } from 'vue'

export default defineComponent({
  name: 'KuibaButton',
  components: { [Icon.name]: Icon },
  props: {
    type: {
      type: String as PropType<'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'>,
      default: 'default',
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
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { type, size, plain, loading, block, disabled } = props
    const className = computed(() => {
      const result = [
        'kuiba-button',
        `kuiba-button--${type}`,
        size ? `kuiba-button--${size}` : '',
        plain ? 'kuiba-button--plain' : '',
        block ? 'kuiba-button--block' : '',
        disabled ? 'kuiba-button--disabled' : '',
      ]
      return result
    })
    const onClick = () => {
      if (loading || disabled) {
        return
      }
      emit('click')
    }
    return { className, onClick }
  },
})
</script>

<style lang="scss">
@import './button.scss';
</style>
