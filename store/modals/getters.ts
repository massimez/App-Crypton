import { GetterTree } from 'vuex'
import { ModalsState } from '~/store/modals/state'

const getters: GetterTree<ModalsState, ModalsState> = {
  getIsShow: state => state.isShow,
  getCurrentModalKey: state => state.currentModalKey,
  getOptions: state => state.options
}

export default getters
