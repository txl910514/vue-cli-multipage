/**
 * Created by txl-pc on 2017/7/21.
 */
import 'lib-flexible'
import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import http from './utils/http'
// import './assets/css/index.scss'
Vue.use(MintUI)
Vue.use(http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
