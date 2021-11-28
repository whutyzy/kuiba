import { ref, App, h, TeleportProps, getCurrentInstance, watch } from 'vue'
// @ts-ignore
import KuibaToast, { ToastType, ToastPosition } from './Toast.vue'
import { extend, isObject, ComponentInstance } from '../utils'
import { mountComponent, usePopupState } from '../utils/mount-components'
import { parserOptions } from '@vue/compiler-dom'
export type ToastOptions = {
    visible?: boolean
    icon?: string
    type?: ToastType
    message?: string | number
    onClose?: () => void
    onOpened?: () => void
    overlayVisible?: boolean
    duration?: number
    teleport?: TeleportProps['to']
    iconSize?: number | string
    position?: ToastPosition
    className?: unknown
    transition?: string
    iconPrefix?: string
    loadingType?: string
    forbidClick?: boolean
    closeOnClick?: boolean
    overlayClass?: unknown
    overlayStyle?: Record<string, any>
    closeOnClickOverlay?: boolean
}

const defaultToastOptions: ToastOptions = {
    visible: false,
    icon: '',
    type: 'text',
    message: '',
    className: '',
    overlayVisible: false,
    onClose: undefined,
    onOpened: undefined,
    duration: 2000,
    teleport: 'body',
    iconSize: undefined,
    iconPrefix: undefined,
    position: 'middle',
    transition: 'van-fade',
    forbidClick: false,
    loadingType: undefined,
    overlayClass: '',
    overlayStyle: undefined,
    closeOnClick: false,
    closeOnClickOverlay: false
}

let queue: ComponentInstance[] = []
let allowMultiple = false
let currentOptions = extend({}, defaultToastOptions)

const defaultOptionsMap = new Map<string, ToastOptions>()

function parseOptions(message: string | ToastOptions) {
    if (isObject(message)) {
        return message
    }
    return { message: message }
}

function createInstance() {
    const Host = {
        setup() {
            const message = ref('')
            const { open, toggle, close, state } = usePopupState()
            const onClosed = () => {
                if (allowMultiple) {
                    queue = queue.filter((item) => item !== instance)
                    unmount()
                }
            }
            const eventListeners = {
                onClosed,
                'onUpdate:visible': toggle
            }
            watch(message, (val) => {
                state.message = val
            })
            const render = () => h(KuibaToast, { ...state, ...eventListeners })
            ;(getCurrentInstance() as any).render = render
            return { open, clear: close, message }
            // return render
        }
    }
    const { instance, unmount } = mountComponent(Host)
    console.log(instance)
    return instance
}

function getInstance() {
    if (queue.length === 0 || allowMultiple) {
        const instance = createInstance()
        queue.push(instance)
    }
    return queue[queue.length - 1]
}

export function Toast(options: string | ToastOptions = {}) {
    const toast = getInstance()
    const parsedOptions = parseOptions(options)
    toast.open(
        extend({}, currentOptions, defaultOptionsMap.get(parsedOptions.type || currentOptions.type!), parsedOptions)
    )
    return toast
}

const createMethod = function (type: ToastType) {
    return function (options: string | ToastOptions) {
        return Toast(extend({ type }, parseOptions(options)))
    }
}
Toast.loading = createMethod('loading')
Toast.success = createMethod('success')
Toast.fail = createMethod('fail')

function setDefaultOptions(options: ToastOptions): void
function setDefaultOptions(type: ToastType, options: ToastOptions): void
function setDefaultOptions(type: ToastType | ToastOptions, options?: any) {
    if (typeof type === 'string') {
        defaultOptionsMap.set(type, options)
    } else {
        extend(currentOptions, type)
    }
}

Toast.setDefaultOptions = setDefaultOptions

Toast.resetDefaultOptions = (type?: ToastType) => {
    if (typeof type === 'string') {
        defaultOptionsMap.delete(type)
    } else {
        currentOptions = extend({}, defaultToastOptions)
        defaultOptionsMap.clear()
    }
}

Toast.allowMultiple = (value = true) => {
    allowMultiple = value
}
Toast.clear = (all?: boolean) => {
    if (queue.length) {
        if (all) {
            queue.forEach((toast) => {
                toast.clear()
            })
            queue = []
        } else if (!allowMultiple) {
            queue[0].clear()
        } else {
            queue.shift()!.clear()
        }
    }
}
Toast.install = (app: App) => {
    app.component(KuibaToast.name, KuibaToast)
    app.config.globalProperties.$toast = Toast
}

export default Toast
