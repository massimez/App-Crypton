import { GetterTree } from 'vuex'
import { LoaderState } from '~/store/loader/state'

const getters: GetterTree<LoaderState, LoaderState> = {
  // getIsShow: state => state.isShow,
  // getCurrentModalKey: state => state.currentModalKey,
  // getOptions: state => state.options
  getIsLoading: state => state.isLoading
}

export default getters
