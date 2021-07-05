<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__header">
        <Header />
      </div>
      <div class="template__content">
        <Sidebar />
        <div class="template__container">
          <nuxt />
        </div>
      </div>
    </div>
    <base-modal-container />
    <loader-screen />
  </div>
</template>
<script lang="ts">
import MainVue from '~/mixins/MainVue'
import Header from '~/components/ui/BaseHeader/index.vue'
import Sidebar from '~/components/ui/BaseSidebar/index.vue'

export default MainVue.extend({
  components: {
    Header,
    Sidebar
  }
})
</script>
<style lang="scss" scoped>
.primary {
  height: 100vh;
  overflow-y: auto;
  &__template {
    height: 60px;
    display: grid;
    grid-template-rows: 60px 1fr auto;
  }
}
.template {
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
  overflow: auto;
  &__content {
    align-items: center;
    position: relative;
    width: 100%;
    overflow-y: auto;
    color: var(--black);
    background-color: var(--white);
  }
  &__container {
    font-size: 14px;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
  &__header {
    height: 100%;
  }
}
</style>
