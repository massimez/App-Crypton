import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import Web4 from '@cryptonteam/web4';
import { output, error } from '~/utils/index';
import { ERC20 } from './abis';

let web3Wallet;
let userAddress;
let chainId;

const contractMethod = async (obj) => {
  try {
    const Contract = new web3Wallet.eth.Contract(obj.contract.abi, obj.contract.address);
    return await Contract.methods[obj.method].apply(this, obj.params).call();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const fetchContractData = async (method, abi, address, params) => {
  try {
    const Contract = new web3Wallet.eth.Contract(abi, address);
    return await Contract.methods[method].apply(this, params).call();
  } catch (err) {
    console.log(err);
    return err;
  }
};

// eslint-disable-next-line import/prefer-default-export
const initWeb3Wallet = async () => {
  try {
    const { ethereum } = window; // ethereum - metamask
    web3Wallet = new Web3(ethereum); // init web3
    if (await web3Wallet.eth.getCoinbase() === null) { // проверяем подключен ли metamask
      await ethereum.enable(); // подключить metamask
    }
    userAddress = await web3Wallet.eth.getCoinbase(); // получить адрес пользователя
    chainId = await web3Wallet.eth.net.getId(); // запись сети
    if (+chainId !== 4) {
      // TODO switch network request
      console.log('Change network');
      return error(500, 'current site work in rinkeby', chainId);
    }
    return null;
  } catch (err) {
    console.log(err);
    return error(500, 'err', err);
  }
};
// eslint-disable-next-line import/prefer-default-export
export async function getSym(addressKwikswapToken) {
  try {
    await initWeb3Wallet();
    const sym = await fetchContractData('symbol', ERC20, addressKwikswapToken);
    return sym;
  } catch (e) {
    console.log(e);
    return e;
  }
}
