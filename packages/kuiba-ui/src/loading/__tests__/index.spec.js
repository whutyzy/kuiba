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

test('circle-props', () => {
    const wrapper = mount(Loading, { props: { type: 'circle', color: '#efefef', size: '24px' } })
    expect(wrapper.html()).toMatchSnapshot()
})

test('spinner-props', () => {
    const wrapper = mount(Loading, { props: { type: 'spinner', color: '#efefef', size: '24px' } })
    expect(wrapper.html()).toMatchSnapshot()
})
