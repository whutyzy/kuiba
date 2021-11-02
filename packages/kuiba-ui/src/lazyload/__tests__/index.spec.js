import example from '../example'
import Lazyload from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

const Wrapper = {
    directives: { Lazyload },
    data: () => ({
        src: 'https://images.pexels.com/photos/245035/pexels-photo-245035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        error: 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }),
    template: `
    <img
      :lazy-error="error"
      v-lazyload="src"
    >
  `
}
test('test lazyload example', () => {
    const wrapper = mount(example)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
})

test('test lazyload plugin', () => {
    const app = createApp({}).use(Lazyload)
    expect(app.component(Lazyload.name)).toBeTruthy()
})

test('should load when img in viewport', () => {})
test('should attempt to load when  loaderror', () => {})

test('should update img src when binding change', () => {})
