import BigNumber from 'bignumber.js';
import {
  getBalance, getSym, getDecimal, initWeb3Wallet, getAllowance, setTransferweb3, setTransferweb4, setApproveWeb4,
} from '~/utils/web3';
import { tokens } from '~/utils/Tokens';

// eslint-disable-next-line import/prefer-default-export
export default {
  async setWeb3Initialized({ commit }, { isInitialised }) {
    // Initialization
    const resSymbol = [];
    let userAddress;
    let firstBalance;
    let firstSymbol;
    let decimal;
    await Promise.all([
      userAddress = await initWeb3Wallet(),
    ]);
    if (isInitialised) {
      await Promise.all(tokens.map(async (token, i) => {
        decimal = await getDecimal(token);
        const balanceBigNumber = new BigNumber(await getBalance(token)).shiftedBy(+decimal).toString();
        resSymbol[i] = {
          token,
          symbol: await getSym(token),
          balance: balanceBigNumber,
        };
        return null;
      }));
      console.log(resSymbol, 'ssss');
    }
    commit('addWeb3Initialized', isInitialised);
    await Promise.all([firstBalance = await getBalance(tokens[0]), firstSymbol = await getSym(tokens[0]), decimal = await getDecimal(tokens[0])]);
    commit('addAllCryptoSymbols', resSymbol);
    commit('addUserAddress', userAddress);
    commit('addActiveBalance', firstBalance);
    commit('addActiveSymbol', firstSymbol);
    commit('addSelectedToken', tokens[0]);
    commit('addDecimal', decimal);
    return true;
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
