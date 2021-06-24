<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__header ">
        <div class="flex flex--end w-100 mt-40 ">
          <SecondBtn
            v-if="IsWeb3Initialized"
            class="ml-auto"
            btn-text="Disconnect wallet"
            width="187px"
            height="50px"
          />
          <SecondBtn
            v-else
            class="ml-auto"
            btn-text="Connect wallet"
            width="187px"
            height="50px"
            :method="setWeb3Initialized"
          />
        </div>
      </div>
      <div class="template__content">
        <nuxt />
      </div>
      <div class="template__footer">
        Footer
      </div>
    </div>
    <base-modal-container />
    <loader-screen />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getAllCryptoSymbols: 'Wallet/getAllCryptoSymbols',
      IsWeb3Initialized: 'Wallet/getIsWeb3Initialized',
    }),
  },
  mounted() {
    // fake loader
    this.SetLoader(true);
    setTimeout(() => {
      this.SetLoader(false);
    }, 1000);
  },
  methods: {
    ...mapActions({
      setWeb3Initialized: 'Wallet/setWeb3Initialized',
    }),
  },
};
</script>
<style lang="scss" scoped>
.primary {
  height: 100vh;
  overflow-y: auto;
  margin-right: 15%;
  margin-left: 15%;
  &__template {
    height: 100%;
    display: grid;
    grid-template-rows: 100px 1fr auto;
  }
}

.template {
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
}
</style>
