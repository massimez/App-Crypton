import BigNumber from 'bignumber.js';
import {
  getBalance, getSym, getDecimal, initWeb3Wallet, getAllowance, setTransferweb3, setTransferweb4, setApproveWeb4,
} from '~/utils/web3';
import { tokens } from '~/utils/Tokens';

// eslint-disable-next-line import/prefer-default-export
export default {
  async setWeb3Initialized({ commit }, payload) {
    const userAdsress = await initWeb3Wallet();
    const resSymbol = [];
    if (payload) {
      tokens.map(async (token, i) => {
        const decimal = await getDecimal(token);
        const balanceBigNumber = new BigNumber(await getBalance(token)).shiftedBy(+decimal).toString();
        resSymbol[i] = {
          Token: token,
          symbol: await getSym(token),
          balance: balanceBigNumber,
        };
        return null;
      });
      console.log(resSymbol);
    }
    commit('addWeb3Initialized', payload);
    // Initialization
    const firstBalance = await getBalance(tokens[0]);
    const firstSymbol = await getSym(tokens[0]);
    const decimal = await getDecimal(tokens[0]);
    setTimeout(async () => {
      commit('addAllCryptoSymbols', resSymbol);
      commit('addUserAddress', userAdsress);
      commit('addActiveBalance', firstBalance);
      commit('addActiveSymbol', firstSymbol);
      commit('addSelectedToken', tokens[0]);
      commit('addDecimal', decimal);
    }, 1000);
  },
  async setSelectedToken({ commit }, payload) {
    commit('addSelectedToken', payload);
    const decimal = await getDecimal(payload);
    commit('addDecimal', decimal);
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
