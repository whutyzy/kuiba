import example from '../example'
import Lazyload from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test lazyload example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test lazyload plugin', () => {
  const app = createApp({}).use(Lazyload)
  expect(app.component(Lazyload.name)).toBeTruthy()
})
