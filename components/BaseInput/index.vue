<template>
  <input :style="baseInputStyles"  :type="inputType" :name= "inputName" :value="valueIn" >
</template>

<script>
export default {
  name: 'index.vue',
  props: {
    inputName: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '#F3F5FA',
    },
    height: {
      type: String,
      default: '70px',
    },
    width: {
      type: String,
      default: '100%',
    },
    fontsize: {
      type: String,
      default: '18px',
    },
    valueIn: {
      type: String,
      default: '',
    },
  },
  computed: {
    baseInputStyles() {
      return [
        {
          'background-color': this.bgColor,
          height: `${this.height}`,
          width: `${this.width}`,
          'font-family': 'Roboto',
          'font-weight': 400,
          'font-size': `${this.fontsize}`,
          'text-indent': '10px',
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
