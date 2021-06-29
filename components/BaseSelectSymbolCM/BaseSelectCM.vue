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
      default: '70px',
    },
    width: {
      type: String,
      default: '15%',
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
      getAllCryptoSymbols: 'wallet/getAllCryptoSymbols',
      IsWeb3Initialized: 'wallet/getIsWeb3Initialized',
    }),
  },
  mounted() {
    // console.log(this.getAllCryptoSymbols);

  },
  methods: {
    ...mapActions({
      setWeb3Initialized: 'wallet/setWeb3Initialized',
      setAllCryptoSymbols: 'wallet/setAllCryptoSymbols',
      setSelectedToken: 'wallet/setSelectedToken',
      setActiveBalance: 'wallet/setActiveBalance',
      setActiveSymbol: 'wallet/setActiveSymbol',
    }),
    handleSelect(event) {
      this.getAllCryptoSymbols.forEach((symbol, index) => {
        if (index === parseInt(event.target.value, 10)) {
          this.setActiveBalance(symbol.token);
          this.setActiveSymbol(symbol.symbol);
          this.setSelectedToken(symbol.token);
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
