import Loading from './Loading.vue'
import type { App } from 'vue'

Loading.install = function(app: App) {
  app.component(Loading.name, Loading)
}

export const _LoadingComponent = Loading

export default Loading
