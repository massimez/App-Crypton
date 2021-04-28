<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__content">
        <nuxt />
      </div>
    </div>
    <transition name="fade">
      <!--      <loader v-if="isLoading" />-->
      <!--      loader-->
    </transition>
    <base-modal-container />
  </div>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.primary {
  height: 100vh;
  overflow-y: auto;
}
.template {
  min-height: 100vh;
  overflow: hidden;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 120;
  }
}

</style>
