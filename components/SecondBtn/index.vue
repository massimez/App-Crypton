<template>
  <button class="base-btn" :style="btnStyles">{{ btnText }}</button>
</template>

<script>
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
      default: '100%',
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
  },
};
</script>

<style lang="scss" scoped>
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
