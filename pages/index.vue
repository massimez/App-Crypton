<template>
  <div class="example">
    <div class="example__content">
      <div class="example__title" />
      <div>
        <label>Amount:</label>
        <div class="flex flex--space mb-60">
          <BaseInput
            class=""
            input-type="text"
            input-name="amount"
            width="80%"
            :method="setAmount"
          />
          <BaseSelectCM
            name="SyCm"
            height="70px"
            width="15%"
          />
        </div>
        <label>Address:</label>
        <BaseInput
          class="mr-32"
          input-type="text"
          input-name="address"
          :method="setRecipient"
        />
        <div class="flex mt-32">
          <span class="mr-12">
            <p class="mr-12">
              Your balance:
            </p>
          </span>
          <p>{{ getActiveBalance }} {{ getActiveSymbol }}</p>
        </div>
        <div class="flex mt-32">
          <p class="mr-12">
            Your allowance:
          </p>
        </div>
        <div class="flex mt-32">
          <SecondBtn
            class="ml-32"
            btn-text="Get allowance"
            width="187px"
            height="50px"
            :method-allowance="setAllowance"
          />
          <SecondBtn
            class="ml-32"
            btn-text="Approve"
            width="187px"
            height="50px"
          />
          <SecondBtn
            class="ml-32"
            btn-text="Transfer"
            width="187px"
            height="50px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      getAllCryptoSymbols: 'Wallet/getAllCryptoSymbols',
      IsWeb3Initialized: 'Wallet/getIsWeb3Initialized',
      getActiveBalance: 'Wallet/getActiveBalance',
      getSelectedToken: 'Wallet/getSelectedToken',
      getActiveSymbol: 'Wallet/getActiveSymbol',
      getUserAddress: 'Wallet/getUserAddress',
      getAllowance: 'Wallet/getAllowance',
    }),
  },
  mounted() {
    // this.setAllCryptoSymbols();
    console.log(this.getAllCryptoSymbols);
  },
  methods: {
    ...mapActions({
      setWeb3Initialized: 'Wallet/setWeb3Initialized',
      setAllCryptoSymbols: 'Wallet/setAllCryptoSymbols',
      setSelectedToken: 'Wallet/setSelectedToken',
      setAmount: 'Wallet/setAmount',
      setRecipient: 'Wallet/setRecipient',
      setAllowance: 'Wallet/setAllowance',
    }),

  },
};
</script>

<style lang="scss" scoped>
.example {
  @include container;
  background: #ffffff;
  &__content {
    height: 300px;
  }
  &__title {
    font-size: 60px;
  }
  @include _1199 {
    &__title {
      font-size: 40px;
    }
  }
  @include _767 {
    &__title {
      font-size: 30px;
    }
  }
  @include _575 {
    &__title {
      font-size: 18px;
    }
  }
}
</style>
