<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__header ">
        <div class="flex flex--space w-100 mt-40">
          <ColorModePicker />
          <button
            v-if="IsWeb3Initialized"
            class="base-btn layout__btn-style ml-auto mb-8"
          >
            Disconnect wallet
          </button>
          <button
            v-else
            class="base-btn layout__btn-style ml-auto mb-8"
            @click="connectWallet"
          >
            Connect wallet
          </button>
        </div>
      </div>
      <div class="template__content">
        <nuxt />
      </div>
      <!--      <div class="template__footer">-->
      <!--        Footer-->
      <!--      </div>-->
    </div>
    <base-modal-container />
    <loader-screen />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ColorModePicker from '~/components/ColorPickerMode';

export default {
  components: { ColorModePicker },
  computed: {
    ...mapGetters({
      IsWeb3Initialized: 'wallet/IsWeb3Initialized',
      getUserAddress: 'wallet/getUserAddress',
    }),
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      initializeWeb3: 'wallet/initializeWeb3',
      setTransactionsHistory: 'wallet/setTransactionsHistory',
    }),
    async connectWallet() {
      this.SetLoader(true);
      if (await this.initializeWeb3({ isInitialised: true })) {
        this.SetLoader(false);
      }
      await this.setTransactionsHistory({ userAddress: this.getUserAddress });
    },
  },
};
</script>
<style lang="scss" scoped>
.primary {
  height: 100vh;
  margin-right: 15%;
  margin-left: 15%;
  &__template {
    height: 100%;
    display: grid;
    grid-template-rows: 130px 1fr auto;
  }
}

.template {
  height: 100%;
  min-height: 100vh;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .layout__btn-style{
    background-color: var(--color-primary-btn);
    height:50px ;
    width:187px ;
    color: white;
  }

}
</style>
