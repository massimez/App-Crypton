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
      </span>
    </ColorScheme>
  </button>
</template>

<script>
import Light from '~/static/img/light.svg'
import Dark from '~/static/img/dark.svg'

export default {
  name: 'color-mode-picker',
  components: { Light, Dark },
  methods: {
    toggleDarkMode () {
      if (this.$colorMode.preference !== 'dark') {
        this.$colorMode.preference = 'dark'
      } else {
        this.$colorMode.preference = 'light'
      }
    }
  }
}

</script>

<style scoped>

</style>
