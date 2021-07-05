<template>
  <div />
</template>
<script lang="ts">

import MainVue from '~/mixins/MainVue'

export default MainVue.extend({
  mounted () {
    this.$router.push('/docs/markdown-example')
  }
})

</script>
<style lang="scss" scoped>
.example {
  @include container;
}
</style>
