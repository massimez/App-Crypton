export default {
  addWeb3Initialized(state, payload) {
    state.isWeb3Initialized = payload;
  },
  addSelectedToken(state, payload) {
    state.selectedToken = payload;
  },
  addAllTokensData(state, payload) {
    payload.map((item) => {
      state.allTokensData.push(item);
      return null;
    });
  },
  addTransfersHistory(state, payload) {
    const transaction = {
      token: payload.address.toLowerCase(),
      blockNumber: payload.blockNumber,
      event: payload.event,
      to: payload.returnValues[1],
      value: payload.returnValues.value,
      transactionHash: payload.transactionHash,
    };
    state.transactionsHistory.push(transaction);
  },
  addRecipient(state, payload) {
    state.recipient = payload;
  },
  addAmount(state, payload) {
    state.amount = payload;
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
