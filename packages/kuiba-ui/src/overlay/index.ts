import Overlay from './Overlay.vue'
import type { App } from 'vue'

Overlay.install = function(app: App) {
  app.component(Overlay.name, Overlay)
}

export const _OverlayComponent = Overlay

export default Overlay
