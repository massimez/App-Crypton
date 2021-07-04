<template>
  <button
    @click="toggleDarkMode()"
  >
    <ColorScheme
      tag="span"
    >
      <span v-if="$colorMode.value === 'dark'">
        <Light style="color: white" />
      </span>
      <span v-else>
        <Dark />
      </span><span v-if="$colorMode.preference === 'system'">(<i>{{ $colorMode.value }}</i> mode detected)</span>
    </ColorScheme>
  </button>
</template>

<script>
import Light from '~/assets/img/light.svg';
import Dark from '~/assets/img/dark.svg';

export default {
  name: 'ColorModePicker',
  components: { Light, Dark },
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
