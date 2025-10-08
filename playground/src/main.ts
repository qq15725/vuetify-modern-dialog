import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createDialog } from 'vuetify-modern-dialog'
import { aliases } from 'vuetify/iconsets/mdi-svg'
import App from './App.vue'
import 'vuetify/styles'

createApp(App)
  .use(createVuetify({
    defaults: {
      VCard: {
        class: 'rounded-2xl',
      },
    },
    icons: {
      aliases,
    },
  }))
  .use(createDialog())
  .mount('#root')
