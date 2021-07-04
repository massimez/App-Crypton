<template>
  <select
    :style="BaseSelectCMStyles"
    :name="name"
    class="select__symbol"
    @change="handleSelect($event)"
  >
    <option
      v-for="(symbol, index) in getAllTokensData"
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
  name: 'SelectCryptoMoney',
  props: {
    name: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '',
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
      getAllTokensData: 'wallet/getAllTokensData',
    }),
  },
  methods: {
    ...mapActions({
      setSelectedToken: 'wallet/setSelectedToken',
    }),
    handleSelect(event) {
      this.setSelectedToken(this.getAllTokensData[event.target.value]);
    },
  },
};
</script>

<style scoped>
.select__symbol{
  background-color: var(--color-primary-btn);
  color: var(--color);
}
</style>
