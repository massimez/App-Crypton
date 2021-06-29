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
      getAllCryptoSymbols: 'wallet/getAllCryptoSymbols',
      IsWeb3Initialized: 'wallet/getIsWeb3Initialized',
      getActiveBalance: 'wallet/getActiveBalance',
      getSelectedToken: 'wallet/getSelectedToken',
      getUserAddress: 'wallet/getUserAddress',
      getRecipient: 'wallet/getRecipient',
    }),
    ...mapActions({
      setWeb3Initialized: 'wallet/setWeb3Initialized',
      setAllCryptoSymbols: 'wallet/setAllCryptoSymbols',
      setSelectedToken: 'wallet/setSelectedToken',
      setAmount: 'wallet/setAmount',
      setRecipient: 'wallet/setRecipient',
      setAllowance: 'wallet/setAllowance',
      setActiveBalance: 'wallet/setActiveBalance',
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
