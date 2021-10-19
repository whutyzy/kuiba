import example from '../example/index.vue'
import { mount } from '@vue/test-utils'

test('test button example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})
