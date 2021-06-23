import {
  getBalance, getSym, getDecimal, initWeb3Wallet,
} from '~/utils/web3';
import { tokens } from '~/utils/Tokens';

// eslint-disable-next-line import/prefer-default-export
export default {
  async setWeb3Initialized({ commit }, payload) {
    await initWeb3Wallet();
    commit('setWeb3Initialized', payload);
  },
  setSelectedToken({ commit }, payload) {
    commit('setSelectedToken', payload);
  },
  setActiveBalance({ commit }, payload) {
    commit('setActiveToken', payload);
  },
  async setAllCryptoSymbols({ commit }) {
    const res = [];
    await Promise.all(tokens.map(async (token) => {
      res.push(await getSym(token));
      return null;
    }));
    console.log(res);
    commit('setAllCryptoSymbols', res);
  },
};
