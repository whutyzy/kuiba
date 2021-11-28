import example from '../example'
import Notify from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test notify example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test notify plugin', () => {
  const app = createApp({}).use(Notify)
  expect(app.component(Notify.name)).toBeTruthy()
})
