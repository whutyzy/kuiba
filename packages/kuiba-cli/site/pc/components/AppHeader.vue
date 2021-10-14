<template>
  <div class="varlet-site-header">
    <div class="varlet-site-header__lead">
      <img class="varlet-site-header__logo" :src="logo" alt="logo" v-if="logo" />
      <div class="varlet-site-header__title" v-if="title">{{ title }}</div>
    </div>

    <div class="varlet-site-header__tail">
      <div
        class="varlet-site-header__language"
        @mouseenter="isOpenMenu = true"
        @mouseleave="isOpenMenu = false"
        v-if="languages"
      >
        <var-icon name="translate" size="26px" color="#666" />
        <var-icon name="chevron-down" color="#666" />
        <transition name="fade">
          <div
            class="varlet-site-header__language-list var-elevation--5"
            v-show="isOpenMenu"
            :style="{ pointerEvents: isOpenMenu ? 'auto' : 'none' }"
          >
            <var-cell
              v-for="(value, key) in nonEmptyLanguages"
              v-ripple
              :key="key"
              :class="{ 'varlet-site-header__language-list--active': language === key }"
              @click="handleLanguageChange(key)"
            >
              {{ value }}
            </var-cell>
          </div>
        </transition>
      </div>
      <a
        class="varlet-site-header__link"
        target="_blank"
        :href="github"
        v-if="github"
      >
        <var-icon name="github" color="#666" :size="28" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import config from '@config'
import { ref, computed } from 'vue'
import { get } from 'lodash'
import { getPCLocationInfo, removeEmpty } from '../../utils'
import { useRouter } from 'vue-router'
import type { Ref, ComputedRef } from 'vue'

export default {
  name: 'AppHeader',
  props: {
    language: {
      type: String
    },
  },
  setup() {
    // config
    const title: Ref<string> = ref(get(config, 'title'))
    const logo: Ref<string> = ref(get(config, 'logo'))
    const languages: Ref<Record<string, string>> = ref(get(config, 'pc.header.i18n'))
    const github: Ref<Record<string, string>> = ref(get(config, 'pc.header.github'))

    const isOpenMenu: Ref<boolean> = ref(false)
    const router = useRouter()
    const nonEmptyLanguages: ComputedRef<Record<string, string>> = computed(() => removeEmpty(languages.value))

    const handleLanguageChange = (language) => {
      const { menuName } = getPCLocationInfo()
      router.replace(`/${language}/${menuName}`)
      isOpenMenu.value = false
    }

    return {
      logo,
      title,
      languages,
      nonEmptyLanguages,
      github,
      isOpenMenu,
      handleLanguageChange
    }
  }
}
</script>


