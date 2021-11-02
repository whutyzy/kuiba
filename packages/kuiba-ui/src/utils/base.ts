export const removeItem = (arr: Array<unknown>, item: unknown) => {
    if (arr.length) {
        const index: number = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

export interface CacheInstance<T> {
    cache: T[]
    has: (value: T) => boolean
    add: (value: T) => void
    remove: (value: T) => void
    clear: () => void
}

export const throttle = (method: any, delay = 200, leading = true, trailing = true) => {
    let start: number = 0
    let timer: any
    return function (this: unknown, ...args: any[]) {
        const now = Date.now()
        const context = this
        if (!start && !leading) start = now
        if (now - start >= delay) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            start = now
            method.apply(context, args)
        } else if (!timer && trailing !== false) {
            timer = setTimeout(() => {
                start = leading === false ? Date.now() : 0
                method.apply(context, args)
                timer = null
            }, delay - (now - start))
        }
    }
}

export function debounce(method: any, delay: number = 200, immediate: boolean = false) {
    let timer: any
    return function (this: unknown) {
        let context = this
        if (timer) {
            clearTimeout(timer)
        }
        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay);
            if (callNow) {
                method.call(context)
            }
        } else {
            timer = setTimeout(() => {
                method.call(context)
                timer = null
            }, delay)
        }
    }
}

export function createCache<T>(max: number): CacheInstance<T> {
    const cache: T[] = []
    return {
        cache,
        has(value: T) {
            return this.cache.includes(value)
        },
        add(value: T) {
            if (this.has(value)) {
                return
            }
            this.cache.length === max && cache.shift()
            this.cache.push(value)
        },
        remove(value: T) {
            this.has(value) && removeItem(this.cache, value)
        },
        clear() {
            this.cache.length = 0
        }
    }
}
