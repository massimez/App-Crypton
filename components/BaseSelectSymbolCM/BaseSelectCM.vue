<template>
 <select :style="BaseSelectCMStyles" :name="name">
   <option v-for="(item,index) in res" :key="index">
     {{ item }}
   </option>
 </select>
</template>

<script>
import { getSym } from '~/utils/web3';
import { arrayTokkens } from '~/utils/arrayTokkens';

export default {
  name: 'BaseSelectCM',
  data() {
    return { res: [] };
  },
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
    tokkensCM: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.getAllSym(this.res);
  },
  methods: {
    async getAllSym(res) {
      console.log(arrayTokkens);
      arrayTokkens.map(async (token) => {
        res.push(await getSym(token));
        return null;
      });
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
