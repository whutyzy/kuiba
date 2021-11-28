import { getCurrentInstance } from 'vue'
import { extend } from '../utils/base'

export function useExpose<T = Record<string, any>>(apis: T) {
    const instance = getCurrentInstance()
    if (instance) {
        console.log(instance)
        extend(instance.proxy, apis)
    }
}
