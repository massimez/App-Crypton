import loaderModes from '~/store/main/loaderModes';

export default {
  setLoading({ commit }, payload) {
    commit('setLoading', payload);
    commit('setStatusText', '');
    commit('setLoaderMode', loaderModes.default);
    commit('setLoaderProgress', 0);
    commit('setIsLoaderBackgroundHider', false);
  },
  setIsLoaderBackgroundHider({ commit }, payload) {
    commit('setIsLoaderBackgroundHider', payload);
  },
  setStatusText({ commit }, payload) {
    commit('setStatusText', payload);
  },
  setLoaderMode({ commit }, payload) {
    commit('setLoaderMode', payload);
  },
  setLoaderProgress({ commit }, payload) {
    commit('setLoaderProgress', payload);
  },
  setProjects({ commit }, payload) {
    commit('setProjects', payload);
  },
  async getApiData({ dispatch }) {
    await dispatch('rate/getRate', null, { root: true });
  },
};
