<template>
  <button
    class="base-btn"
    :style="btnStyles"
    @click="handleClick"
  >
    {{ btnText }}
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getAllowance } from '~/utils/web3';

export default {
  props: {
    btnText: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '#63BCD8',
    },
    height: {
      type: String,
      default: '50px',
    },
    width: {
      type: String,
      default: '187px',
    },
    methodInitialize: {
      type: Function,
      default: null,
    },
    methodAllowance: {
      type: Function,
      default: () => false,
    },
  },
  computed: {
    btnStyles() {
      return [
        {
          'background-color': this.bgColor,
          height: `${this.height}`,
          width: `${this.width}`,
        },
      ];
    },
    ...mapGetters({
      getAllCryptoSymbols: 'Wallet/getAllCryptoSymbols',
      IsWeb3Initialized: 'Wallet/getIsWeb3Initialized',
      getActiveBalance: 'Wallet/getActiveBalance',
      getSelectedToken: 'Wallet/getSelectedToken',
      getUserAddress: 'Wallet/getUserAddress',
      getRecipient: 'Wallet/getRecipient',
    }),
    ...mapActions({
      setWeb3Initialized: 'Wallet/setWeb3Initialized',
      setAllCryptoSymbols: 'Wallet/setAllCryptoSymbols',
      setSelectedToken: 'Wallet/setSelectedToken',
      setAmount: 'Wallet/setAmount',
      setRecipient: 'Wallet/setRecipient',
      setAllowance: 'Wallet/setAllowance',
      setActiveBalance: 'Wallet/setActiveBalance',
    }),
  },
  methods: {
    async handleClick() {
      return null;
    },
  },
};
</script>

<style lang="scss" >
.base-btn {
  color: #FFFFFF;
  padding: 0 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;

  &:hover {
    color: #91979c;
    background: #5641b3;
  }

  &_disabled {
    pointer-events: none;
  }
}
</style>
