export default {
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setStatusText(state, payload) {
    state.loaderStatusText = payload;
  },
  setLoaderMode(state, payload) {
    state.loaderMode = payload;
  },
  setLoaderProgress(state, payload) {
    state.loaderProgress = payload;
  },
  setProjects(state, payload) {
    state.projects = payload;
  },
  setIsLoaderBackgroundHider(state, payload) {
    state.isLoaderBackgroundHider = payload;
  },
};
