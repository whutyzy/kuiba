import example from '../example'
import Loading from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test loading example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test loading plugin', () => {
  const app = createApp({}).use(Loading)
  expect(app.component(Loading.name)).toBeTruthy()
})
