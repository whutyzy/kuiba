export function isDef<T>(val: T): val is NonNullable<T> {
    return val !== undefined && val !== null
}

export function isNumeric(val: string | number): val is string {
    return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
}

export function isObject(val: unknown): val is Record<string, any> {
    return typeof val === 'object' && val !== null
}

export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
} 

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
