<template>
  <div class="example">
    <ModalNotification
      v-if="showModal"
      :text-header="textHeader"
      :text-body="textBody"
      :text-footer="textFooter"
      @close="showModal = false"
    />
    <div class="example__content">
      <div class="example__title" />
      <div>
        <label>Amount:</label>
        <div class="flex flex--space mb-60">
          <BaseInput
            class=""
            input-type="number"
            input-name="amount"
            width="80%"
            :method="setAmount"
            step="0.01"
            value="0.00"
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
          :required="true"
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
            Your allowance: {{ getAllowance }}
          </p>
        </div>
        <div class="flex mt-32">
          <button
            class="base-btn layout__btn-style mr-32"
            @click="handleGetAllowance"
          >
            Get allowance
          </button>
          <button
            class="base-btn layout__btn-style mr-32"
            @click="handleApprove"
          >
            Approve
          </button>
          <button
            class="base-btn layout__btn-style "
            @click="handleTransfer"
          >
            Transfer
          </button>
        </div>
        <div class="mt-32 mb-8">
          <h1>Your Transactions</h1>
        </div>
        <div class="mt-2 flex " />
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
import { getAllowanceWeb3, setApproveWeb4, setTransferweb4 } from '~/utils/web3';

export default {
  data() {
    return {
      showModal: false,
      textHeader: '',
      textBody: '',
      textFooter: '',
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
      getRecipient: 'Wallet/getRecipient',
      getAmount: 'Wallet/getAmount',
      decimal: 'Wallet/getDecimal',
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
      setLoading: 'loader/setLoading',
      setTransfer: 'Wallet/setTransfer',
      setApprove: 'Wallet/setApprove',
    }),
    async handleGetAllowance() {
      try {
        if (this.IsWeb3Initialized) {
          console.log(this.getSelectedToken, this.getRecipient, 'getAllo');
          const allowance = await getAllowanceWeb3(this.getSelectedToken, this.getRecipient);
          // await this.setAllowance(allowance);
          console.log(allowance, 'Allowance');
          if (allowance) this.setAllowance(allowance);
        } else {
          this.showModal = true;
          this.textBody = 'Error';
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleTransfer() {
      console.log(this.getAmount, this.decimal, this.getRecipient, 'handletr');
      const transfer = await setTransferweb4(this.getSelectedToken, this.getAmount, this.decimal, this.getRecipient);
      if (transfer) {
        this.showModal = true;
        this.textHeader = 'Succes';
        this.textBody = 'Successful operation';
      } else {
        this.showModal = true;
        this.textHeader = 'Error';
        this.textBody = 'Failed operation';
      }
    },
    async handleApprove() {
      console.log(this.getSelectedToken, this.getAmount, this.decimal, this.getRecipient, 'handlApprove');
      const transfer = await setApproveWeb4(this.getSelectedToken, this.getAmount, this.decimal, this.getRecipient);
      if (transfer) {
        this.showModal = true;
        this.textHeader = 'Succes';
        this.textBody = 'Successful operation';
      } else {
        this.showModal = true;
        this.textHeader = 'Error';
        this.textBody = 'Failed operation';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction {

}
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
  .layout__btn-style{
    background-color: #63BCD8;
    height:50px ;
    width:187px ;
    color: white;
  }
}
</style>
