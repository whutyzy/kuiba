import { createApp, reactive, h, Component, nextTick } from 'vue'
import { extend } from './base'
import { useExpose } from '../composables/use-expose'

export function usePopupState() {
    const state = reactive<{ visible: boolean; [key: string]: any }>({
        visible: false
    })

    const toggle = (visible: boolean) => {
        state.visible = visible
    }

    const open = (props: Record<string, any>) => {
        extend(state, props)
        nextTick(() => toggle(true))
    }
    const close = () => toggle(false)
    useExpose({ open, close, toggle })
    return {
        open,
        close,
        state,
        toggle
    }
}

export function mountComponent(RootComponent: Component) {
    const app = createApp(RootComponent)
    const root = document.createElement('div')
    console.log(root)
    root.className = 'demo'
    document.body.appendChild(root)
    return {
        instance: app.mount(root),
        unmount() {
            app.unmount()
            document.body.removeChild(root)
        }
    }
}

export function mountInstance(
    component: any,
    props: Record<string, any> = {},
    eventListener: Record<string, any> = {}
) {
    const Host = {
        setup() {
            return () => h(component, { ...props, ...eventListener })
        }
    }
    return mountComponent(Host)
}
