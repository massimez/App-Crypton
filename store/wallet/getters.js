export default {
  getIsWeb3Initialized: (state) => state.isWeb3Initialized,
  getSelectedToken: (state) => state.selectedToken,
  getAllCryptoSymbols: (state) => state.allTokensData,
  getRecipient: (state) => state.recipient,
  getUserAddress: (state) => state.userAddress,
  getAllowance: (state) => state.allowance,
  getAmount: (state) => state.amount,
  getTransfersHistory: (state) => [...state.transactionsHistory].sort((a, b) => (a.blockNumber - b.blockNumber)).filter((v, i, a) => a.findIndex((t) => (t.transactionHash === v.transactionHash)) === i),
  getModalErr: (state) => state.modalErr,
};
