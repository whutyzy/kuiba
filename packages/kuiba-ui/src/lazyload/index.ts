import { CacheInstance } from './../utils/base'
import type { App, Directive, Plugin, DirectiveBinding } from 'vue'
import { createCache, removeItem, throttle } from '../utils/base'
import { getAllParentScroller, inViewport } from '../utils/dom'

interface LazyOptions {
    loading?: string
    error?: string
    attempt?: number
    throttleWait?: number
    filter?: (lazy: Lazy) => void
    events?: string[]
}
type LazyState = 'pending' | 'success' | 'error'
type Lazy = LazyOptions & {
    src: string
    currentAttempt: number
    state: LazyState
    attemptLock: boolean
    preloadImage?: HTMLImageElement
    arg: string | undefined
}
export type LazyHTMLElement = HTMLElement & { _lazy: Lazy }

type ListenTarget = Window | HTMLElement

const BACKGROUND_IMAGE_ARG_NAME = 'background-image'
const LAZY_LOADING = 'lazy-loading'
const LAZY_ERROR = 'lazy-error'
const LAZY_ATTEMPT = 'lazy-attempt'
const EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
export const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
const lazyElements: LazyHTMLElement[] = []
const listenTargets: ListenTarget[] = []
const imageCache: CacheInstance<string> = createCache<string>(100)
const defaultLazyOptions: LazyOptions = {
    loading: PIXEL,
    error: PIXEL,
    attempt: 3,
    throttleWait: 300,
    events: EVENTS
}
let checkAllWithThrottle = throttle(checkAll, defaultLazyOptions.throttleWait)

function setLoading(el: LazyHTMLElement) {
    el._lazy.loading && setSRC(el, el._lazy.loading)

    // checkAll()
}
function setSuccess(el: LazyHTMLElement, attemptSRC: string) {
    setSRC(el, attemptSRC)
    el._lazy.state = 'success'
    console.log('success')
    clear(el)
    // checkAll()
}
function setError(el: LazyHTMLElement) {
    el._lazy.error && setSRC(el, el._lazy.error)
    el._lazy.state = 'error'

    clear(el)
}
function createImage(el: LazyHTMLElement, attemptSRC: string) {
    const image: HTMLImageElement = new Image()
    el._lazy.preloadImage = image
    image.addEventListener('load', () => {
        el._lazy.attemptLock = false
        imageCache.add(attemptSRC)
        setSuccess(el, attemptSRC)
    })
    image.addEventListener('error', () => {
        el._lazy.attemptLock = false
        el._lazy.currentAttempt >= (el._lazy.attempt as number) ? setError(el) : attemptLoad(el)
    })
    image.src = attemptSRC
}
function attemptLoad(el: LazyHTMLElement) {
    if (el._lazy.attemptLock) {
        return
    }
    el._lazy.attemptLock = true
    el._lazy.currentAttempt++
    const { src: attemptSRC }: Lazy = el._lazy

    if (imageCache.has(attemptSRC)) {
        setSuccess(el, attemptSRC)
        el._lazy.attemptLock = false
        return
    }

    setLoading(el)
    createImage(el, attemptSRC)
}

function check(el: LazyHTMLElement) {
    if (inViewport(el)) {
        console.log('check')
        attemptLoad(el)
    }
}

function checkAll() {
    lazyElements.forEach((el) => {
        check(el)
    })
}

function clear(el: LazyHTMLElement) {
    removeItem(lazyElements, el)
    lazyElements.length === 0 && unbindEvents()
}

function add(el: LazyHTMLElement) {
    if (!lazyElements.includes(el)) {
        lazyElements.push(el)
    }
    getAllParentScroller(el).forEach(bindEvents)
    check(el)
}

function bindEvents(listenTarget: ListenTarget) {
    if (listenTargets.includes(listenTarget)) {
        return
    }
    listenTargets.push(listenTarget)
    defaultLazyOptions.events?.forEach((eventName) => {
        listenTarget.addEventListener(eventName, checkAllWithThrottle, { passive: true })
    })
}

export function unbindEvents() {
    listenTargets.forEach((listenTarget: ListenTarget) => {
        defaultLazyOptions.events?.forEach((event: string) => {
            listenTarget.removeEventListener(event, checkAllWithThrottle)
        })
    })

    listenTargets.length = 0
}

function setSRC(el: LazyHTMLElement, url: string) {
    if (el._lazy.arg === BACKGROUND_IMAGE_ARG_NAME) {
        console.log(el)
        el.style.backgroundImage = `url(${url})`
    } else {
        el.setAttribute('src', url)
    }
}
function isDiff(el: LazyHTMLElement, binding: DirectiveBinding<string>) {
    return el._lazy.src !== binding.value || el._lazy.arg !== binding.arg
}

function createLazy(el: LazyHTMLElement, binding: DirectiveBinding<string>) {
    const lazyOptions: LazyOptions = {
        loading: el.getAttribute(LAZY_LOADING) ?? defaultLazyOptions.loading,
        error: el.getAttribute(LAZY_ERROR) ?? defaultLazyOptions.error,
        attempt: el.getAttribute(LAZY_ATTEMPT) ? Number(defaultLazyOptions.attempt) : defaultLazyOptions.attempt
    }
    el._lazy = {
        src: binding.value,
        arg: binding.arg,
        currentAttempt: 0,
        state: 'pending',
        attemptLock: false,
        ...lazyOptions
    }
    setSRC(el, PIXEL)
}

function mounted(el: LazyHTMLElement, binding: DirectiveBinding<string>) {
    createLazy(el, binding)
    add(el)
}

function updated(el: LazyHTMLElement, binding: DirectiveBinding<string>) {
    if (isDiff(el, binding)) {
        mounted(el, binding)
    } else {
        lazyElements.includes(el) && check(el)
    }
}

function mergeLazyOptions(lazyOptions: LazyOptions = {}) {
    const { events, loading, error, attempt, throttleWait, filter } = lazyOptions

    defaultLazyOptions.events = events ?? defaultLazyOptions.events
    defaultLazyOptions.loading = loading ?? defaultLazyOptions.loading
    defaultLazyOptions.error = error ?? defaultLazyOptions.error
    defaultLazyOptions.attempt = attempt ?? defaultLazyOptions.attempt
    defaultLazyOptions.throttleWait = throttleWait ?? defaultLazyOptions.throttleWait
    defaultLazyOptions.filter = filter
}

const Lazyload: Directive & Plugin = {
    mounted,
    updated,
    unmounted: clear,
    install(app, lazyOptions) {
        mergeLazyOptions(lazyOptions)

        checkAllWithThrottle = throttle(checkAll, defaultLazyOptions.throttleWait)
        app.directive('lazy', this)
    }
}

export default Lazyload
