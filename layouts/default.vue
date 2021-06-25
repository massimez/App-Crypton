<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__header ">
        <div class="flex flex--end w-100 mt-40 ">
          <button
            v-if="IsWeb3Initialized"
            class="base-btn layout__btn-style ml-auto"
          >
            Disconnect wallet
          </button>
          <button
            v-else
            class="base-btn layout__btn-style ml-auto"
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

export default {
  computed: {
    ...mapGetters({
      getAllCryptoSymbols: 'Wallet/getAllCryptoSymbols',
      IsWeb3Initialized: 'Wallet/getIsWeb3Initialized',
    }),
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      setWeb3Initialized: 'Wallet/setWeb3Initialized',
    }),
    async connectWallet() {
      this.SetLoader(true);
      if (await this.setWeb3Initialized({ isInitialised: true })) {
        this.SetLoader(false);
      }
    },
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
  .layout__btn-style{
  background-color: #63BCD8;
  height:50px ;
    width:187px ;
    color: white;
  }
}
</style>
