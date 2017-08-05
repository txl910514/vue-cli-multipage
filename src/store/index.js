/**
 * Created by txl-pc on 2017/8/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import commonStore from './Common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    commonStore
  }
})
