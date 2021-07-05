import { MutationTree } from 'vuex'
import { ModalsState } from '~/store/modals/state'

const mutations: MutationTree<ModalsState> = {
  SET_IS_SHOW: (state, payload: boolean) => (state.isShow = payload),
  SET_CURRENT_MODAL_KEY: (state, payload: string) => (state.currentModalKey = payload),
  SET_OPTIONS: (state, payload: Record<string, unknown>) => (state.options = payload),
  SET_UNCLOSABLE (state) {
    state.options = {
      ...state.options,
      isUnclosable: true
    }
  }
}

export default mutations
