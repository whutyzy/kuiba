import example from '../example'
import Dialog from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test dialog example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test dialog plugin', () => {
  const app = createApp({}).use(Dialog)
  expect(app.component(Dialog.name)).toBeTruthy()
})
