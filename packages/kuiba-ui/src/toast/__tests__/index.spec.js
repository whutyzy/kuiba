import example from '../example'
import Toast from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test toast example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test toast plugin', () => {
  const app = createApp({}).use(Toast)
  expect(app.component(Toast.name)).toBeTruthy()
})
