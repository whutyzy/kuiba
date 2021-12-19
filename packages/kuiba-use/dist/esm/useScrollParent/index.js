import { ref, onMounted } from 'vue';
import { inBrowser } from '../utils';
var overflowScrollReg = /scroll|auto/i;
var defaultRoot = inBrowser ? window : undefined;

function isElement(node) {
  var ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
}

export function getScrollParent(el, root) {
  if (root === void 0) {
    root = defaultRoot;
  }

  var node = el;

  while (node && node !== root && isElement(node)) {
    var _window$getComputedSt = window.getComputedStyle(node),
        overflowY = _window$getComputedSt.overflowY;

    var scrollRE = /(srcoll|auto)/;

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}
export function useScrollParent(el, root) {
  if (root === void 0) {
    root = defaultRoot;
  }

  var scrollParent = ref();
  onMounted(function () {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });
  return scrollParent;
}