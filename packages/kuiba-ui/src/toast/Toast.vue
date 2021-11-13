<template>
    <kuiba-popup
        v-model:visible="visible"
        :overlay-class="overlayClass"
        :overlay-style="overlayStyle"
        :lock-scroll="false"
        :overlay-visible="overlayVisible"
        :close-on-click-overlay="closeOnClickOverlay"
        :class="toastClassName"
        :teleport="teleport"
        :position="position"
        @click="onClick"
        @closed="clearTimer"
    >
        <kuiba-loading v-if="type === 'loading'" class="kuiba-toast__loading"></kuiba-loading>

        <kuiba-icon v-if="hasIcon" :name="icon || type" class="kuiba-toast__icon"></kuiba-icon>
        <div v-if="message" class="kuiba-toast__text">{{ message }}</div>
    </kuiba-popup>
</template>

<script lang="ts">
import { defineComponent, watch, computed, onUnmounted, onMounted, PropType, CSSProperties, TeleportProps } from 'vue'

// Utils
import { unknownProp } from '../utils'
import { lockClick } from './lock-click'

import Popup from '../popup'
import Icon from '../icon'
import Loading from '../loading'

export type ToastType = 'text' | 'loading' | 'success' | 'fail'
export type ToastPosition = 'top' | 'middle' | 'bottom'

export default defineComponent({
    name: 'KuibaToast',
    components: { [Popup.name]: Popup, [Icon.name]: Icon, [Loading.name]: Loading },
    props: {
        icon: String,
        visible: Boolean,
        overlayVisible: Boolean,
        message: [Number, String],
        iconSize: [Number, String],
        className: unknownProp,
        iconPrefix: String,
        loadingType: String,
        forbidClick: Boolean,
        overlayClass: unknownProp,
        overlayStyle: Object as PropType<CSSProperties>,
        closeOnClick: { type: Boolean, default: false },
        closeOnClickOverlay: Boolean,
        teleport: [String, Object] as PropType<TeleportProps['to']>,
        type: {
            type: String as PropType<ToastType>,
            default: 'text'
        },
        duration: {
            type: Number,
            default: 2000
        },
        position: {
            type: String as PropType<ToastPosition>,
            default: 'middle'
        }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
        let timer: any
        let clickable = false
        const toastClassName = computed(() => [
            'kuiba-toast',
            `kuiba-toast--${props.position}`,
            props.className,
            { 'kuiba-toast--text': props.message }
        ])
        const toggleClickable = () => {
            const newValue = props.visible && props.forbidClick
            if (clickable !== newValue) {
                clickable = newValue
                lockClick(clickable)
            }
        }
        const hasIcon = computed(() => props.icon || ['fail', 'success'].includes(props.type))
        const updateVisible = (visible: boolean) => emit('update:visible', visible)

        const onClick = () => {
            if (props.closeOnClick) {
                updateVisible(false)
            }
        }
        const clearTimer = () => {
            clearTimeout(timer)
        }
        watch(() => [props.visible, props.forbidClick], toggleClickable)
        watch(
            () => [props.visible, props.type, props.message, props.duration],
            () => {
                clearTimer()
                if (props.visible && props.duration > 0) {
                    timer = setTimeout(() => {
                        updateVisible(false)
                    }, props.duration)
                }
            }
        )
        onMounted(toggleClickable)
        onUnmounted(toggleClickable)
        return {
            hasIcon,
            toastClassName,
            onClick,
            clearTimer
        }
    }
})
</script>

<style lang="scss">
@import './toast.scss';
</style>
