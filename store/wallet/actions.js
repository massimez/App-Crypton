import BigNumber from 'bignumber.js';
import {
  getBalance,
  getSymbol,
  getDecimal,
  initWeb3Wallet,
  initContract,
} from '~/utils/web3';
import { tokens } from '~/utils/Tokens';
import { ERC20 } from '~/utils/abis';

export default {
  async setWeb3Initialized({ commit }, { isInitialised }) {
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
      commit('addWeb3Initialized', isInitialised);
      commit('addAllTokensData', resSymbols);
      commit('addUserAddress', resInitialization.result);
      commit('addSelectedToken', {
        token: resSymbols[0].token, balance: resSymbols[0].balance, symbol: resSymbols[0].symbol, decimal: resSymbols[0].decimal,
      });
      return true;
    }
    commit('addModalErr', resInitialization.msg);
    return false;
  },
  async setTransactionsHistory({ commit, getters }, payload) {
    tokens.map(async (token) => {
      const contract = initContract(token);
      await contract.events.Transfer({
        fromBlock: 0,
        filter: { from: payload.userAddress },
      }, (err, event) => {
        if (token.toLowerCase() === event.address.toLowerCase()) {
          commit('addTransfersHistory', event);
        }
      });
      await contract.events.Approval({
        fromBlock: 0,
        filter: { owner: payload.userAddress },
      }, (err, event) => {
        if (token.toLowerCase() === event.address.toLowerCase()) {
          commit('addTransfersHistory', event);
        }
      });
    });
  },
  async setSelectedToken({ commit }, payload) {
    commit('addSelectedToken', payload);
  },
  setRecipient({ commit }, payload) {
    commit('addRecipient', payload);
  },
  setAmount({ commit }, payload) {
    commit('addAmount', payload);
  },
  setActiveSymbol({ commit }, payload) {
    commit('addActiveSymbol', payload);
  },
  setAllowance({ commit }, payload) {
    commit('AddAllowance', payload);
  },
  setTransfer({ commit }, payload) {
    commit('addTransfer', payload);
  },
  setApprove({ commit }, payload) {
    commit('addApprove', payload);
  },

};
