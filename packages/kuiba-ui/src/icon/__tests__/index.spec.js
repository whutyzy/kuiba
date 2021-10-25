import example from '../example'
import Icon from '../index'
import KuibaIcon from '../Icon.vue'
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
    components: { [KuibaIcon.name]: KuibaIcon },
    methods: {
      clickFn,
    },
  })
  wrapper.trigger('click')
  expect(clickFn).toHaveBeenCalledTimes(1)
  wrapper.unmount()
})

test('test icon name', () => {
  const wrapper = mount(KuibaIcon, { props: { name: 'arrow-left' } })
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test icon namespace', () => {
  const wrapper = mount(KuibaIcon, { props: { prefixClass: 'iconfont', name: 'arrow-left' } })
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test icon style', () => {
  const wrapper = mount(KuibaIcon, { props: { name: 'arrow-left', color: 'red', size: '12px' } })
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})
