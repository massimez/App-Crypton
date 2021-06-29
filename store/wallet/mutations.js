export default {
  addWeb3Initialized(state, payload) {
    state.isWeb3Initialized = payload;
  },
  addSelectedToken(state, payload) {
    state.selectedToken = payload;
  },
  addAllCryptoSymbols(state, payload) {
    payload.map((item) => {
      state.AllCryptoSymbols.push(item);
      return null;
    });
  },
  addTransfersHistory(state, payload) {
    console.log(payload);
    state.transactionsHistory.push(payload);
    return null;
  },
  cleanTransferHistory(state) {
    state.transactionsHistory = [];
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
  addModalErr(state, payload) {
    state.modalErr = payload;
  },
};
