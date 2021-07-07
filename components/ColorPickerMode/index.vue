<template>
  <button
    @click="toggleDarkMode()"
  >
    <color-scheme
      tag="span"
    >
      <span v-if="$colorMode.value === 'dark'">
        <light-icon style="color: white" />
      </span>
      <span v-else>
        <dark-icon />
      </span>
    </color-scheme>
  </button>
</template>

<script>
import LightIcon from '~/assets/img/icons/light.svg';
import DarkIcon from '~/assets/img/icons/dark.svg';

export default {
  components: { LightIcon, DarkIcon },
  methods: {
    toggleDarkMode() {
      if (this.$colorMode.preference !== 'dark') {
        this.$colorMode.preference = 'dark';
      } else {
        this.$colorMode.preference = 'light';
      }
    },
  },
};

</script>

<style scoped>

</style>
