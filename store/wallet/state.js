export default () => ({
  isWeb3Initialized: false,
  selectedToken: {
    token: '', balance: '', symbol: '', decimal: '',
  },
  allTokensData: [],
  recipient: '',
  amount: 0,
  allowance: '',
  userAddress: '',
  transactionsHistory: [],
  modalErr: null,
});
