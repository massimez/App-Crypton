import { ActionTree } from 'vuex'
import { LoaderState } from '~/store/loader/state'

const actions: ActionTree<LoaderState, LoaderState> = {
  setLoading ({ commit }, payload) {
    commit('SET_IS_LOADING', payload)
    commit('SET_STATUS_TEXT', '')
    commit('SET_IS_BG_HIDER', false)
  },
  setIsBgHider ({ commit }, payload) {
    commit('SET_IS_BG_HIDER', payload)
  },
  setStatusText ({ commit }, payload) {
    commit('SET_STATUS_TEXT', payload)
  }
}

export default actions
