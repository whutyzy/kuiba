<template>
    <div class="kuiba-site-sidebar">
        <div
            v-for="(item, index) in menu"
            :key="index"
            :class="[
                'kuiba-site-sidebar__item',
                {
                    'kuiba-site-sidebar__item--active': menuName === item.doc,
                    'kuiba-site-sidebar__title': item.type === menuTypes.TITLE,
                    'kuiba-site-sidebar__link': [menuTypes.DOCUMENTATION, menuTypes.COMPONENT].includes(item.type)
                }
            ]"
            @click="changeRoute(item)"
        >
            <span>{{ item.text[language] }}</span>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import config from '@config'
import { defineComponent, reactive, ref } from 'vue'
import { MenuTypes } from '../../utils'
import type { PropType } from 'vue'
import type { Menu } from '../App.vue'

export default defineComponent({
    props: {
        menu: { type: Array as PropType<Menu[]> },
        menuName: { type: String },
        language: {
            type: String
        }
    },
    emits: ['change'],
    setup(props, { emit }) {
        const menuTypes = reactive(MenuTypes)

        const changeRoute = (item) => {
            if (item.type === MenuTypes.TITLE || props.menuName === item.doc) {
                return
            }

            emit('change', item)
        }
        return { menuTypes, changeRoute }
    }
})
</script>

<style scoped lang="scss">
@import '../../style/var.scss';
.kuiba-site-sidebar {
    padding: 0 0 15px;
    position: fixed;
    width: 220px;

    top: 60px;
    bottom: 0;
    left: 0;
    z-index: 1;
    overflow-y: scroll;
    box-shadow: 0 8px 12px #ebedf0;
    background: #fff;

    &::-webkit-scrollbar {
        display: none;
    }

    &__item {
        margin: 0;
        user-select: none;
        padding: 10px 28px;
        &--active {
            position: relative;
            background: $thrid-color;

            span {
                color: $primary-color;
            }

            &::before {
                display: block;
                content: '';
                background: $primary-color;
                width: 4px;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }

    &__link {
        cursor: pointer;
        font-size: 14px;
        color: #455a64;
        transition: color 0.2s;

        &:hover {
            color: $primary-color;
        }
    }

    &__title {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 600;
        color: #394950;
        line-height: 28px;
    }
}
</style>
