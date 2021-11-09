import Popup from './Popup.vue'
import type { App } from 'vue'

Popup.install = function(app: App) {
  app.component(Popup.name, Popup)
}

export const _PopupComponent = Popup

export default Popup
