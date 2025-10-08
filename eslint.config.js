// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
}, {
  rules: {
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/custom-event-name-casing': 'off',
  },
})
