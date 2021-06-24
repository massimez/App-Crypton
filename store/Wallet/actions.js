import BigNumber from 'bignumber.js';
import {
  getBalance, getSym, getDecimal, initWeb3Wallet, getAllowance,
} from '~/utils/web3';
import { tokens } from '~/utils/Tokens';

// eslint-disable-next-line import/prefer-default-export
export default {
  async setWeb3Initialized({ commit }, payload) {
    const userAdsress = await initWeb3Wallet();
    const resSymbol = [];
    if (payload) {
      tokens.map(async (token, i) => {
        resSymbol[i] = {
          Token: token,
          symbol: await getSym(token),
          balance: await getBalance(token),
        };
        return null;
      });
      console.log(resSymbol);
    }
    commit('addWeb3Initialized', payload);
    // Initialization
    const firstBalance = await getBalance(tokens[0]);
    const firstSymbol = await getSym(tokens[0]);
    setTimeout(async () => {
      commit('addAllCryptoSymbols', resSymbol);
      commit('addUserAddress', userAdsress);
      commit('addActiveBalance', firstBalance);
      commit('addActiveSymbol', firstSymbol);
    }, 1000);
  },
  setSelectedToken({ commit }, payload) {
    commit('addSelectedToken', payload);
  },
  async setActiveBalance({ commit }, payload) {
    const balance = await getBalance(payload);
    commit('addActiveBalance', balance);
  },
  setAllCryptoSymbols({ commit }) {
    const resSymbol = [];
    const resSymbolToken = {};
    tokens.map(async (token, i) => {
      resSymbol[i] = {
        Token: token,
        symbol: await getSym(token),
      };
      return null;
    });
    console.log(resSymbol);
    commit('addAllCryptoSymbols', resSymbol);
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
  async setAllowance({ commit }, user, recipient) {
    console.log(user, recipient, 'actions');
    const allowance = await getAllowance(user, recipient);
    commit('AddAllowance', allowance);
  },
};
