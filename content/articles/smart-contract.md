---
title: Интеграция смарт контрактов
description: Интеграция смарт контрактов
---

## Payable и view функции

todo

## ABI

ABI это json объект в котором перечисленны все доступные функции и ивенты смарт контракта и их аргументы

## Что такое Metamask

todo

## Пример как подключать Metamask

```js
let web4;
let web3Wallet;
let userAddress;
let chainId;

export const connectWallet = async () => {
  try {
    const { ethereum } = window; // ethereum - metamask
    if (!ethereum) {
      console.log('metamask is not install')
      return false;
    }
    web3Wallet = new Web3(ethereum); // init web3
    if (await web3Wallet.eth.getCoinbase() === null) { // проверяем подключен ли metamask
      await ethereum.enable(); // подключить metamask
    }
    userAddress = await web3Wallet.eth.getCoinbase(); // получить адрес пользователя
    chainId = await web3Wallet.eth.net.getId(); // запись сети
    if (+chainId !== 4) {
      console.log('current project work on rinkeby network')
      return false;
    }

    web4 = new Web4();
    await web4.setProvider(ethereum, userAddress);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
```

## Infura

Если ваше приложение работает через metamask то пока пользователь не подключил его к сайту - у вас нет доступа к ноде, поэтому вы не сможете отображать никакую информацию с блокчейна до того как пользователь не нажмет “connect wallet”.
Для решения этой проблемы, в режиме гостя можно использовать стороннюю ноду, в случае эфира можно использовать сервис **Infura**

```js
let web3Guest
export const connectNode = () => {
  try {
    let bscUrl
    if (process.env.IS_MAINNET === 'true') {
      bscUrl = 'wss://mainnet.infura.io/ws/v3/*тут ключ инфуры*'
    } else {
      bscUrl = 'wss://rinkeby.infura.io/ws/v3/*тут ключ инфуры*'
    }
    const provider = new Web3.providers.WebsocketProvider(bscUrl)
    web3Guest = new Web3(provider)
    return true
  } catch (e) {
    return false
  }
}
```

## Пример как вызвать view функцию

```js
export const fetchContractData = async (method, abi, address, params) => {
  try {
    const contract = new web3Guest.eth.Contract(abi, address)
    return await contract.methods[method].apply(this, params).call()
  } catch (e) {
    console.log(e)
    return ''
  }
}

const example = async () => {
  const symbol = await fetchContractData('symbol', ERC20Abi, '0x4b107a23361770534bd1839171bbf4b0eb56485c')
  console.log('symbol', symbol)
}
```

## Decimals, BigNumber и примеры

Для работы с числами из смарт контрата используйте библиотеку BigNubmer.js
```shell
$ npm i bignumber.js
```
В смарт контрактах не используют не целые числа, поэтому числа которые предполагаются делить на нецелые части хранят в виде больших чисел, например у вас есть 0.5 токенов BUSD то в смарт контракте этого токена эта сумма будет записана как 500000000000000000 (0.5 * 10 ** 18),
тк у этого токена точность(decimals) 18.

Поэтому, например перед тем как получить баланс токена в вашем приложении, вам сначала нужно узнать чему равно decimals у выбранного токена.

```js
// обертка для web3 чтобы получать данные у смарт контракта
export const fetchContractData = async (method, abi, address, params) => {
  try {
    const contract = new web3Guest.eth.Contract(abi, address)
    return await contract.methods[method].apply(this, params).call()
  } catch (e) {
    console.log(e)
    return ''
  }
}

const start = async () => {
  const exampleTokenAddress = '0x4b107a23361770534bd1839171bbf4b0eb56485c'
  const userAddress = '0xBC6ae91F55af580B4C0E8c32D7910d00D3dbe54d'
  const decimals = await fetchContractData('decimals', ERC20Abi, exampleTokenAddress)
  let balance = await fetchContractData(
    'balanceOf',
    ERC20Abi,
    exampleTokenAddress,
    [userAddress]
  )
  balance = new BigNumber(balance).shiftedBy(-decimals).toString()
  console.log('Баланс: ', balance)
}

start()
```
