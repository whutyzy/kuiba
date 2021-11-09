import * as logger from '../shared/logger'
import { bigCamelize } from '../shared/fsUtils'
import { outputFile, pathExistsSync } from 'fs-extra'
import { resolve } from 'path'
import { get } from 'lodash'
import { DOCS_DIR_NAME, EXAMPLE_DIR_NAME, EXAMPLE_LOCALE_DIR_NAME, SRC_DIR, TESTS_DIR_NAME } from '../shared/constant'
import { getKuibaConfig } from '../config/kuiba.config'

const kuibaConfig = getKuibaConfig()

export async function add(name: string) {
    const namespace = get(kuibaConfig, 'namespace')
    const bigCamelizeName = bigCamelize(name)
    const vueTemplate = `\
<template>
  <div class="${namespace}-${name}"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '${bigCamelize(namespace)}${bigCamelizeName}'
})
</script>

<style lang="scss">
@import "./${name}.scss"
</style>
`
    const scssTemplate = `\
.${namespace}-${name} {
    
}`

    const indexTemplate = `\
import ${bigCamelizeName} from './${bigCamelizeName}.vue'
import type { App } from 'vue'

${bigCamelizeName}.install = function(app: App) {
  app.component(${bigCamelizeName}.name, ${bigCamelizeName})
}

export const _${bigCamelizeName}Component = ${bigCamelizeName}

export default ${bigCamelizeName}
`

    const testsTemplate = `\
import example from '../example'
import ${bigCamelizeName} from '../index'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test ${name} example', () => {
  const wrapper = mount(example)
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('test ${name} plugin', () => {
  const app = createApp({}).use(${bigCamelizeName})
  expect(app.component(${bigCamelizeName}.name)).toBeTruthy()
})
`

    const exampleTemplate = `\
<template>
  <kuiba-demo-block>
    <${namespace}-${name}/>
  </kuiba-demo-block>
 
</template>

<script>
import ${bigCamelizeName} from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'



export default {
  name: '${bigCamelizeName}Example',
  components: {
    [${bigCamelizeName}.name]: ${bigCamelizeName},
    'kuiba-demo-block': DemoBlock
  },
  setup() {
     return {}
  }
}
</script>
`

    const componentDir = resolve(SRC_DIR, name)
    const testsDir = resolve(SRC_DIR, name, TESTS_DIR_NAME)
    const exampleDir = resolve(SRC_DIR, name, EXAMPLE_DIR_NAME)
    const exampleLocalDir = resolve(SRC_DIR, name, EXAMPLE_DIR_NAME, EXAMPLE_LOCALE_DIR_NAME)
    const docsDir = resolve(SRC_DIR, name, DOCS_DIR_NAME)

    if (pathExistsSync(componentDir)) {
        logger.error('component directory is existed')
        return
    }

    await Promise.all([
        outputFile(resolve(componentDir, `${bigCamelizeName}.vue`), vueTemplate),
        outputFile(resolve(componentDir, `${name}.scss`), scssTemplate),
        outputFile(resolve(componentDir, 'index.ts'), indexTemplate),
        outputFile(resolve(testsDir, 'index.spec.js'), testsTemplate),
        outputFile(resolve(exampleDir, 'index.vue'), exampleTemplate),
        outputFile(resolve(docsDir, 'zh-CN.md'), ''),
        outputFile(resolve(docsDir, 'en-US.md'), '')
    ])

    logger.success(`Create ${name} success!`)
    logger.success(`----------------------------`)
    logger.success(`${name}/`)
    logger.success(`|- __tests__/ # Unit test folder`)
    logger.success(`|- docs/ # Internationalized document folder`)
    logger.success(`|- example/ # Mobile phone example code`)
    logger.success(`|- example/locale # Example locale`)
    logger.success(`|- ${bigCamelizeName}.vue # Sfc component, You can also use jsx or tsx`)
    logger.success(`|- index.ts # Component entry, the folder where the file exists will be exposed to the user`)
}
