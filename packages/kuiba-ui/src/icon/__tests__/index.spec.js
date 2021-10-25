import example from '../example'
import Icon from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test icon example', () => {
  const wrapper = mount(example)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
})

test('test icon plugin', () => {
  const app = createApp({}).use(Icon)
  expect(app.component(Icon.name)).toBeTruthy()
})

test('test icon click', () => {
    const clickFn = jest.fn()
    const wrapper = mount({
        template: `<kuiba-icon @click="clickFn"></kuiba-icon>`,
        component: { [ICon.name]: Icon },
        methods: {
            clickFn
        }
    })
    wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
})
