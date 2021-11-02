export function getParentScroller(el: HTMLElement) {
    let element = el
    while (element) {
        if (!element.parentNode) {
            break
        }
        element = element.parentNode as HTMLElement
        if (element === document.body || element === document.documentElement) {
            break
        }
        const { overflow, overflowY } = window.getComputedStyle(element)
        const scrollRE = /(scroll|auto)/
        if (scrollRE.test(overflowY) || scrollRE.test(overflow)) {
            return element
        }
    }
    return window
}

export function getAllParentScroller(el: HTMLElement) {
    const allParentScroller: Array<HTMLElement | Window> = []
    let element: HTMLElement | Window = el
    while (element !== window) {
        element = getParentScroller(element as HTMLElement)
        allParentScroller.push(element)
    }
    return allParentScroller
}

export function inViewport(element: HTMLElement) {
    const { top, bottom, left, right } = element.getBoundingClientRect()

    const yInView = top >= 0 && bottom <= window.innerHeight
    const xInView = left >= 0 && right <= window.innerWidth
    return xInView && yInView
}

export function doubleRaf() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve)
        })
    })
}
