import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './index.css'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  Vue.config.devtools = false
  Vue.config.debug = false
  Vue.config.silent = true
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
