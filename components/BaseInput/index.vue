<template>
  <input
    :style="baseInputStyles"
    :type="inputType"
    class="input__address"
    :name="inputName"
    :placeholder="valueIn"
    :step="step"
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
      default: '',
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
    step: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '0.00',
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
          required: `${this.required}`,
          placeholder: `${this.value}`,
          'font-family': 'Roboto',
          'font-weight': 400,
          'font-size': `${this.fontsize}`,
          'text-indent': '10px',
          border: '1px',
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
.input__address{
  background-color: var(--color-primary-input);
  color: var(--color);
}
</style>
