import { inject, InjectionKey, watch } from 'vue'
export const POPUP_TOGGLE_KEY: InjectionKey<() => boolean> = Symbol()
