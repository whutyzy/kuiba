import example from '../example'
import Image from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

const IMAGE_URL = 'https://i.loli.net/2021/11/01/jTC5EJK6UrZMkul.jpg'
test('test image example', () => {
    const wrapper = mount(example)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
})

test('test image plugin', () => {
    const app = createApp({}).use(Image)
    expect(app.component(Image.name)).toBeTruthy()
})

test('should emit load event after image loaded', () => {
    const wrapper = mount(Image, { props: { src: IMAGE_URL } })
    wrapper.find('img').trigger('load')
    expect(wrapper.emitted('load')[0][0]).toBeTruthy()
    wrapper.unmount()
})

test('should emit error event whenn load image failed ', () => {
    const wrapper = mount(Image, { props: { src: IMAGE_URL } })
    wrapper.find('img').trigger('error')
    expect(wrapper.emitted('error')[0][0]).toBeTruthy()
    wrapper.unmount()
})
test('should emit onLoad & onEError in lazymode', () => {
    const wrapper = mount(Image, { props: { src: IMAGE_URL, lazy: true } })
    const onLoad = jest.fn()
    const onError = jest.fn()
    const img = wrapper.find('img')
    img.element._lazy.state = 'success'
    img.trigger('load')
    expect(onLoad).toHaveBeenCalledTimes(1)

    img.element._lazy.state = 'error'
    img.trigger('error')
    expect(onError).toHaveBeenCalledTimes(1)

    wrapper.unmount()

})
test('test image fit', async () => {
    const wrapper = mount(Image)

    await wrapper.setProps({ fit: 'fill' })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ fit: 'cover' })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ fit: 'none' })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ fit: 'scale-down' })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ fit: 'contain' })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
})
