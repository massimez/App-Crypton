export default {
  SET_WEB3_INITIALIZED(state, payload) {
    state.isWeb3Initialized = payload;
  },
  SET_SELECTED_TOKEN(state, payload) {
    state.selectedToken = payload;
  },
  ADD_ALL_TOKENS_DATA(state, payload) {
    payload.map((item) => {
      state.allTokensData.push(item);
      return null;
    });
  },
  ADD_TRANSACTION_HISTORY(state, payload) {
    const transaction = {
      token: payload.address.toLowerCase(),
      blockNumber: payload.blockNumber,
      event: payload.event,
      from: payload.returnValues[0],
      to: payload.returnValues[1],
      value: payload.returnValues.value,
      transactionHash: payload.transactionHash,
    };
    state.transactionsHistory.push(transaction);
  },
  SET_RECIPIENT(state, payload) {
    state.recipient = payload;
  },
  SET_AMOUNT(state, payload) {
    state.amount = payload;
  },
  SET_ALLOWANCE(state, payload) {
    state.allowance = payload;
  },
  SET_USER_ADDRESS(state, payload) {
    state.userAddress = payload;
  },
  SET_MODAL_ERR_MSG(state, payload) {
    state.modalErr = payload;
  },
};
