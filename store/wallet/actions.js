import BigNumber from 'bignumber.js';
import {
  getBalance,
  getSym,
  getDecimal,
  initWeb3Wallet,
  getAllowance,
  setTransferweb3,
  setTransferweb4,
  setApproveWeb4,
  getTransaction, getTransactionsWeb3,
} from '~/utils/web3';
import { tokens } from '~/utils/Tokens';

// eslint-disable-next-line import/prefer-default-export
export default {
  async setWeb3Initialized({ commit }, { isInitialised }) {
    // Initialization
    const resSymbols = [];
    let firstBalance;
    let firstSymbol;
    let decimal;
    let resInitialization;
    const fetchTokensData = async () => {
      if (isInitialised) {
        await Promise.all(tokens.map(async (token, i) => {
          decimal = await getDecimal(token);
          const balanceBigNumber = await getBalance(token);
          resSymbols[i] = {
            token,
            symbol: await getSym(token),
            balance: balanceBigNumber,
          };
          return null;
        }));
      }
    };
    await Promise.all([
      resInitialization = await initWeb3Wallet(), await fetchTokensData(),
      firstBalance = await getBalance(tokens[0]), firstSymbol = await getSym(tokens[0]), decimal = await getDecimal(tokens[0]),
    ]);

    if (resInitialization.ok) {
      commit('addWeb3Initialized', isInitialised);
      commit('addAllCryptoSymbols', resSymbols);
      commit('addUserAddress', resInitialization.result);
      commit('addActiveBalance', new BigNumber(firstBalance).shiftedBy(-decimal).toString());
      commit('addActiveSymbol', firstSymbol);
      commit('addSelectedToken', tokens[0]);
      commit('addDecimal', decimal);
      return true;
    }
    commit('addModalErr', resInitialization.msg);
    return false;
  },
  async setTransferHistory({ commit }) {
    commit('cleanTransferHistory');
    let decimal;
    let symbol;
    let resToken;
    tokens.map(async (token) => {
      await Promise.all([decimal = await getDecimal(token), resToken = await getTransactionsWeb3(token)]);
      resToken.map(async (item) => {
        symbol = await getSym(token);
        commit('addTransfersHistory', {
          symbol,
          to: item.returnValues.to,
          value: new BigNumber(item.returnValues.value).shiftedBy(-decimal).toString(),
        });
        return null;
      });
      return null;
    });
  },
  async setSelectedToken({ commit }, payload) {
    commit('addSelectedToken', payload);
    const decimal = await getDecimal(payload);
    commit('addDecimal', decimal);
  },
  async setActiveBalance({ commit }, payload) {
    let balance;
    let decimal;
    await Promise.all([
      balance = await getBalance(payload), decimal = await getDecimal(payload),
    ]);

    commit('addActiveBalance', new BigNumber(balance).shiftedBy(-decimal).toString());
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
