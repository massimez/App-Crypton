<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="base-modal"
      @mousedown.self="backgroundClick"
    >
      <base-modal-box
        v-if="modals.default === currentModalKey"
      >
        <div class="base-modal__content base-modal__text">
          {{ options.text }}
        </div>
      </base-modal-box>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '@/store/modals/modals';

export default {
  components: {

  },
  data: () => ({
    modals,
  }),
  computed: {
    ...mapGetters({
      isShow: 'modals/getIsShow',
      currentModalKey: 'modals/getCurrentModalKey',
      options: 'modals/getOptions',
    }),
  },
  methods: {
    backgroundClick() {
      if (!this.options.isUnclosable) {
        this.close();
      }
    },
    close() {
      this.$store.dispatch('modals/hide');
    },
  },
};
</script>
<style lang="scss" scoped>
.base-modal {
  @include modalKit;
}
</style>
