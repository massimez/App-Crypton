<template>
  <input
    :style="baseInputStyles"
    :type="inputType"
    :name="inputName"
    :value="valueIn"
    @change="handleInout($event)"
  >
</template>

<script>
export default {
  name: 'IndexVue',
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
    method: {
      type: Function,
      default: () => {},
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

  methods: {
    handleInout(event) {
      this.method(event.target.value);
    },
  },
};
</script>

<style scoped>

</style>
