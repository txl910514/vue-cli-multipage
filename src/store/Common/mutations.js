/**
 * Created by txl-pc on 2017/8/4.
 */
import * as types from '@/store/types'
const mutations = {
  [types.SEARCH_MUSIC] (state, response) {
    if (response.data.success) {
      state.search_data = response.data.data
    }
  }
}
export default mutations
