import { MutationTree } from 'vuex'
import { LoaderState } from '~/store/loader/state'

const mutations: MutationTree<LoaderState> = {
  SET_IS_LOADING: (state, payload: boolean) => (state.isLoading = payload),
  SET_STATUS_TEXT: (state, payload: string) => (state.loaderStatusText = payload),
  SET_IS_BG_HIDER: (state, payload: boolean) => (state.isBgHider = payload)
}

export default mutations
