export default {
  addWeb3Initialized(state, payload) {
    state.isWeb3Initialized = payload;
  },
  addSelectedToken(state, payload) {
    state.selectedToken = payload;
  },
  addAllCryptoSymbols(state, payload) {
    // eslint-disable-next-line array-callback-return
    payload.map((item) => {
      state.AllCryptoSymbols.push(item);
    });
  },
  addActiveBalance(state, payload) {
    state.activeBalance = payload;
  },
  addRecipient(state, payload) {
    state.recipient = payload;
  },
  addAmount(state, payload) {
    state.amount = payload;
  },
  addActiveSymbol(state, payload) {
    state.activeSymbol = payload;
  },
  addDecimal(state, payload) {
    state.decimal = payload;
  },
  AddAllowance(state, payload) {
    state.allowance = payload;
  },
  addUserAddress(state, payload) {
    state.userAddress = payload;
  },
  addTransfer(state, payload) {
    state.transactionHistory.push(payload);
  },
};
