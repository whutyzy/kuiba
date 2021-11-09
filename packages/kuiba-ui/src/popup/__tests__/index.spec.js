import example from '../example'
import Popup from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test popup example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test popup plugin', () => {
  const app = createApp({}).use(Popup)
  expect(app.component(Popup.name)).toBeTruthy()
})
