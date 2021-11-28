import Notify from './Notify.vue'
import type { App } from 'vue'

Notify.install = function(app: App) {
  app.component(Notify.name, Notify)
}

export const _NotifyComponent = Notify

export default Notify
