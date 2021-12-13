import { ref, Ref, onMounted } from 'vue'
import { inBrowser } from '../utils'

type ScrollElement = HTMLElement | Window

const overflowScrollReg = /scroll|auto/i
const defaultRoot = inBrowser ? window : undefined

function isElement(node: Element) {
    const ELEMENT_NODE_TYPE = 1
    return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE
}

export function getScrollParent(el: Element, root: ScrollElement | undefined = defaultRoot) {
    let node = el
    while (node && node !== root && isElement(node)) {
        const { overflowY } = window.getComputedStyle(node)
        const scrollRE = /(srcoll|auto)/
        if (overflowScrollReg.test(overflowY)) {
            return node
        }
        node = node.parentNode as Element
    }
    return root
}

export function useScrollParent(el: Ref<Element | undefined>, root: ScrollElement | undefined = defaultRoot) {
    const scrollParent = ref<Element | Window>()
    onMounted(() => {
        if (el.value) {
            scrollParent.value = getScrollParent(el.value, root)
        }
    })
    return scrollParent
}