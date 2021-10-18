import example from '../example'
import { mount } from '@vue/test-utils'

test('test button example', () => {
    console.log(example)
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})
