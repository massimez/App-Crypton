import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import Web4 from '@cryptonteam/web4';
import { output, error } from '~/utils/index';
import { ERC20 } from './abis';

let web3Wallet;
let userAddress;
let chainId;
let web4 = new Web4();

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
    // if (method === 'allowance') console.log(address, 'fetch');
    const Contract = new web3Wallet.eth.Contract(abi, address);
    return await Contract.methods[method].apply(this, params).call();
  } catch (err) {
    console.log(err);
    return err;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const initWeb3Wallet = async () => {
  try {
    const { ethereum } = window; // ethereum - metamask
    web3Wallet = new Web3(ethereum); // init web3
    if (await web3Wallet.eth.getCoinbase() === null) { // проверяем подключен ли metamask
      await ethereum.enable(); // подключить metamask
    }
    userAddress = await web3Wallet.eth.getCoinbase(); // получить адрес пользователя
    chainId = await web3Wallet.eth.net.getId(); // запись сети
    web4 = new Web4();
    await web4.setProvider(ethereum, userAddress);
    if (+chainId !== 4) {
      // TODO switch network request
      console.log('Change network');
      return error(500, 'current site work in rinkeby', chainId);
    }
    return userAddress;
  } catch (err) {
    console.log(err);
    return error(500, 'err', err);
  }
};
// eslint-disable-next-line import/prefer-default-export
export async function getSym(addressToken) {
  try {
    const symbol = await fetchContractData('symbol', ERC20, addressToken);
    return symbol;
  } catch (e) {
    console.log(e);
    return e;
  }
}
export async function getBalance(addressToken) {
  try {
    const balance = await fetchContractData('balanceOf', ERC20, addressToken, [userAddress]);
    console.log(balance);
    const decimal = await fetchContractData('decimals', ERC20, addressToken);
    console.log(decimal);
    return balance;
  } catch (e) {
    console.log(e);
    return e;
  }
}
export async function getDecimal(addressToken) {
  try {
    const decimal = await fetchContractData('decimals', ERC20, addressToken);
    console.log(decimal);
    return decimal;
  } catch (e) {
    console.log(e);
    return e;
  }
}
// eslint-disable-next-line no-shadow
export async function getAllowanceWeb3(addressToken, recipientAddress) {
  try {
    const allowance = await fetchContractData('allowance', ERC20, addressToken, [userAddress, recipientAddress]);
    return allowance;
  } catch (e) {
    console.log(e);
    return e;
  }
}
export const createInst = async (abi, address) => {
  const abs = web4.getContractAbstraction(abi);
  return await abs.getInstance(address);
};
export async function setTransferweb4(addressToken, amount, decimal, recipient) {
  console.log(addressToken, amount, decimal, recipient, userAddress, 'transfer');
  try {
    const instance = await createInst(ERC20, addressToken);
    const amountInBigNumber = new BigNumber(amount).shiftedBy(+decimal).toString();
    console.log(await instance.symbol(), 'symbol');
    console.log(await instance.decimals(), 'decimals');
    const transfer = await instance.transfer(recipient, amountInBigNumber);
    console.log(transfer, 'transfer');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function setApproveWeb4(addressToken, amount, decimal, recipient) {
  console.log(addressToken, amount, decimal, recipient, 'approve');
  try {
    const instance = await createInst(ERC20, addressToken);
    const amountInBigNumber = new BigNumber(amount).shiftedBy(+decimal).toString();
    const approve = await instance.approve(recipient, amount);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
