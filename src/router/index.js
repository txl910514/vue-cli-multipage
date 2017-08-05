/**
 * Created by txl-pc on 2017/7/22.
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
function _ (name) {
  return () => System.import(`@/pages/${name}.vue`)
}
const routes = [
  { path: '/', component: _('index') }
]
const router = new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes // （缩写）相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
