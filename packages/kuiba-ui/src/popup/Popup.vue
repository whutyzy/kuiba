<template>
    <Teleport v-if="teleport" :to="teleport">
        <kuiba-overlay
            v-if="overlayVisible"
            :custom-style="overlayStyle"
            :class="overlayClass"
            :visible="visible"
            :z-index="popupZIndex"
            @click="onClickOverlay"
        ></kuiba-overlay>
        <Transition :name="transitionName" @after-enter="onOpened" @after-leave="onClosed">
            <div v-show="visible" :class="popupClass" :style="style" ref="popupRef" @click="onClick" v-bind="$attrs">
                <div v-show="closeIconVisible || title" class="kuiba-popup__head">
                    <h6 class="kuiba-popup__title">{{ title }}</h6>
                    <kuiba-icon
                        v-if="closeIconVisible"
                        class="kuiba-popup__close-icon"
                        name="close"
                        @click="onClickCloseIcon"
                    ></kuiba-icon>
                </div>
                <div class="kuiba-popup__content">
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
    <template v-else>
        <kuiba-overlay
            v-if="overlayVisible"
            :custom-style="overlayStyle"
            :class="overlayClass"
            :visible="visible"
            :z-index="popupZIndex"
            @click="onClickOverlay"
        ></kuiba-overlay>
        <Transition :name="transitionName" @after-enter="onOpened" @after-leave="onClosed">
            <div v-show="visible" :class="popupClass" :style="style" ref="popupRef" @click="onClick" v-bind="$attrs">
                <div v-show="closeIconVisible || title" class="kuiba-popup__head">
                    <h6 class="kuiba-popup__title">{{ title }}</h6>
                    <kuiba-icon
                        v-if="closeIconVisible"
                        class="kuiba-popup__close-icon"
                        name="close"
                        @click="onClickCloseIcon"
                    ></kuiba-icon>
                </div>
                <div class="kuiba-popup__content">
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </template>
</template>

<script lang="ts">
import {
    ref,
    watch,
    provide,
    computed,
    PropType,
    onMounted,
    onActivated,
    onDeactivated,
    defineComponent,
    CSSProperties
} from 'vue'
import { popupSharedProps } from './shared'
import { extend, callInterceptor } from '../utils'

// Components
import Icon from '../icon'
import Overlay from '../overlay'
// Composables
import { useExpose } from '../composables/use-expose'
import { useLockScroll } from '../composables/use-lock-scroll'
import { POPUP_TOGGLE_KEY } from '../composables/on-popup-reopen'
export type PopupPosition = 'top' | 'left' | 'bottom' | 'right' | 'middle' | ''
let globalZIndex = 2000

export default defineComponent({
    name: 'KuibaPopup',
    components: {
        [Icon.name]: Icon,
        [Overlay.name]: Overlay
    },
    props: extend({}, popupSharedProps, {
        title: String,
        closeIconVisible: Boolean,
        closeOnPopstate: Boolean,
        position: {
            type: String as PropType<PopupPosition>,
            default: 'middle'
        }
    }),
    emits: ['open', 'close', 'click', 'opened', 'closed', 'update:visible', 'click-overlay', 'click-close-icon'],

    setup(props, { emit }) {
        let opened: boolean
        let shouldReopen: boolean

        const popupZIndex = ref<number>(0)
        const popupRef = ref<HTMLElement>()

        const style = computed(() => {
            return { zIndex: popupZIndex.value } as CSSProperties
        })

        const open = () => {
            if (!opened) {
                opened = true
                if (props.zIndex !== undefined) {
                    globalZIndex = +props.zIndex
                }
                popupZIndex.value = ++globalZIndex
                emit('open')
            }
        }
        const close = () => {
            callInterceptor({
                interceptor: props.beforeClose,
                done: () => {
                    emit('update:visible', false)
                    opened = false
                    emit('close')
                }
            })
        }
        const onClickOverlay = (event: MouseEvent) => {
            emit('click-overlay', event)
            if (props.closeOnClickOverlay) {
                close()
            }
        }
        const onClick = (event: MouseEvent) => emit('click', event)
        const onOpened = () => emit('opened')
        const onClosed = () => emit('closed')
        const onClickCloseIcon = (event: MouseEvent) => {
            close()
            emit('click-close-icon', event)
        }
        const transitionName = computed(() => {
            return props.position === 'middle' ? 'kuiba-fade' : `kuiba-popup-slide-${props.position}`
        })
        const popupClass = computed(() => {
            return ['kuiba-popup', `kuiba-popup--${props.position}`]
        })

        watch(
            () => props.visible,
            (value) => {
                if (value) {
                    open()
                } else {
                    opened = false
                    emit('closed')
                }
            }
        )
        useExpose({ popupRef })
        useLockScroll(popupRef, () => props.visible && props.lockScroll)

        onMounted(() => {
            if (props.visible) {
                open()
            }
        })
        onActivated(() => {
            if (shouldReopen) {
                emit('update:visible', true)
                shouldReopen = false
            }
        })
        onDeactivated(() => {
            if (props.visible) {
                close()
                shouldReopen = true
            }
        })

        provide(POPUP_TOGGLE_KEY, () => props.visible)
        return {
            popupZIndex,
            popupClass,
            transitionName,
            style,
            popupRef,
            onClick,
            onClickOverlay,
            onOpened,
            onClosed,
            onClickCloseIcon
        }
    }
})
</script>

<style lang="scss">
@import './popup.scss';
</style>
