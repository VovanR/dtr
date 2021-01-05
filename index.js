import Vue from 'vue'
import App from './src/App.vue'

/* eslint-next-line-disable no-new */
new Vue({
  render: createElement => createElement(App)
}).$mount('#app')
