import example from '../example'
import Button from '..'
import KuibaButton from '../Button'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'

test('test button example', () => {
    const wrapper = mount(example)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
})

test('test button plugin', () => {
    const app = createApp({}).use(Button)
    expect(app.component(Button.name)).toBeTruthy()
})

test('should emit click event', () => {
    const wrapper = mount(Button)
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
})

test('should not emit click event when disabled', () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
})

test('should not emit click event when loading', () => {
    const wrapper = mount(KuibaButton, { props: { loading: true } })
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
})

test('should render icon in the right side when setting icon-position to right', () => {
    const wrapper = mount(Button, {
        props: {
            icon: 'plus',
            iconPosition: 'right'
        }
    })
    expect(wrapper.html()).toMatchSnapshot()
})
