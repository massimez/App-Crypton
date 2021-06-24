<template>
  <select
    :style="BaseSelectCMStyles"
    :name="name"
    @change="handleSelect($event)"
  >
    <option
      v-for="(symbol, index) in getAllCryptoSymbols"
      :key="index"
      :value="index"
      :selected="index === 0"
    >
      {{ symbol.symbol }}
    </option>
  </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'BaseSelectCM',
  props: {
    name: {
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
      default: '120px',
    },
  },
  data() {
    return {
      indexActiveToken: '',
    };
  },

  computed: {
    BaseSelectCMStyles() {
      return [
        {
          'background-color': this.bgColor,
          height: `${this.height}`,
          width: `${this.width}`,
          'text-align-last': 'center',
          'font-weight': 700,
          'font-size': '24px',
          'text-indent': '10px',
          color: 'white',
        },
      ];
    },
    ...mapGetters({
      getAllCryptoSymbols: 'Wallet/getAllCryptoSymbols',
      IsWeb3Initialized: 'Wallet/getIsWeb3Initialized',
    }),
  },
  mounted() {
    // console.log(this.getAllCryptoSymbols);

  },
  methods: {
    ...mapActions({
      setWeb3Initialized: 'Wallet/setWeb3Initialized',
      setAllCryptoSymbols: 'Wallet/setAllCryptoSymbols',
      setSelectedToken: 'Wallet/setSelectedToken',
      setActiveBalance: 'Wallet/setActiveBalance',
      setActiveSymbol: 'Wallet/setActiveSymbol',
    }),
    handleSelect(event) {
      this.getAllCryptoSymbols.forEach((symbol, index) => {
        if (index === parseInt(event.target.value, 10)) {
          this.setActiveBalance(symbol.Token);
          this.setActiveSymbol(symbol.symbol);
          this.setSelectedToken(symbol.Token);
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
