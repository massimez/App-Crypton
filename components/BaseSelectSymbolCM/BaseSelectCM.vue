<template>
  <select
    :style="BaseSelectCMStyles"
    :name="name"
  >
    <option
      v-for="(item,index) in tokensSymbol"
      :key="index"
    >
      {{ item }}
    </option>
  </select>
</template>

<script>
import { getSym } from '~/utils/web3';
import { tokens } from '~/utils/Tokens';

export default {
  name: 'BaseSelectCM',
  props: {
    name: {
      type: String,
      default: '',
    },
    tokensSymbol: {
      type: Array,
      default: () => [],
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
  },

};
</script>

<style scoped>

</style>
