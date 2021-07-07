import BigNumber from 'bignumber.js';
import {
  getBalance,
  getSymbol,
  getDecimal,
  initWeb3Wallet,
  initContract,
} from '~/utils/web3';
import { tokens } from '~/utils/tokens';

export default {
  async initializeWeb3({ commit }, { isInitialised }) {
    const resSymbols = [];
    let resInitialization;
    const fetchTokensData = async () => {
      if (isInitialised) {
        await Promise.all(tokens.map(async (token, i) => {
          const decimal = await getDecimal(token);
          const balance = await getBalance(token);
          resSymbols[i] = {
            token: token.toLowerCase(),
            symbol: await getSymbol(token),
            balance: new BigNumber(balance).shiftedBy(-decimal).toString(),
            decimal,
          };
          return null;
        }));
      }
    };
    await Promise.all([resInitialization = await initWeb3Wallet(), await fetchTokensData()]);
    if (resInitialization.ok) {
      commit('SET_WEB3_INITIALIZED', isInitialised);
      commit('ADD_ALL_TOKENS_DATA', resSymbols);
      commit('SET_USER_ADDRESS', resInitialization.result);
      commit('SET_SELECTED_TOKEN', {
        token: resSymbols[0].token, balance: resSymbols[0].balance, symbol: resSymbols[0].symbol, decimal: resSymbols[0].decimal,
      });
      return true;
    }
    commit('SET_MODAL_ERR_MSG', resInitialization.msg);
    return false;
  },
  async fetchTransactionsHistory({ commit }, payload) {
    tokens.map(async (token) => {
      const contract = initContract(token);
      await contract.events.Transfer({
        fromBlock: 0,
        filter: { from: payload.userAddress },
      }, (err, event) => {
        commit('ADD_TRANSACTIONS_HISTORY', event);
      });
      await contract.events.Transfer({
        fromBlock: 0,
        filter: { to: payload.userAddress },
      }, (err, event) => {
        commit('ADD_TRANSACTION_HISTORY', event);
      });
      await contract.events.Approval({
        fromBlock: 0,
        filter: { owner: payload.userAddress },
      }, (err, event) => {
        commit('ADD_TRANSACTION_HISTORY', event);
      });
    });
  },
  async setSelectedToken({ commit }, payload) {
    commit('SET_SELECTED_TOKEN', payload);
  },
  setRecipient({ commit }, payload) {
    commit('SET_RECIPIENT', payload);
  },
  setAmount({ commit }, payload) {
    commit('SET_AMOUNT', payload);
  },
  setAllowance({ commit }, payload) {
    commit('SET_ALLOWANCE', payload);
  },
};
