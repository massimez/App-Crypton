export default {
  setWeb3Initialized(state, playload) {
    state.isWeb3Initialized = playload;
  },
  setSelectedToken(state, payload) {
    state.selectedToken = (payload);
  },
  setAllCryptoSymbols(state, payload) {
    state.AllCryptoSymbols.push(payload);
  },
  setActiveBalance(state, payload) {
    state.activeBalance = (payload);
  },
};
