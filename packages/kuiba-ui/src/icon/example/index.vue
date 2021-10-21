<template>
  <app-type></app-type>
  <kuiba-icon/>
</template>

<script>
import Icon from '..'
import AppType from '@kuiba/cli/site/mobile/components/AppType'
import { watchLang } from '@kuiba/cli/site/utils'
import { use, pack } from './locale'

export default {
  name: 'IconExample',
  components: {
    [Icon.name]: Icon,
    AppType
  },
  setup() {

     watchLang(use)

     return {
       pack
     }
  }
}
</script>
