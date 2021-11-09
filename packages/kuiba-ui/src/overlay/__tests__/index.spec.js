import example from '../example'
import Overlay from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test overlay example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test overlay plugin', () => {
  const app = createApp({}).use(Overlay)
  expect(app.component(Overlay.name)).toBeTruthy()
})
