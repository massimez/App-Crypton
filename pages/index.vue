<template>
  <div class="example">
    <ModalNotification
      v-if="showModal"
      :text-header="textHeader"
      :text-body="textBody"
      :text-footer="textFooter"
      @close="showModal = false"
    />
    <ModalNotification
      v-if="modalErr"
      text-header="Error"
      :text-body="modalErr"
      @close="showModal = false"
    />
    <div class="example__content">
      <div class="example__title" />
      <div>
        <label>Amount:</label>
        <div class="flex flex--space mb-60">
          <input
            v-model="amount"
            class="input__amount"
            type="number"
            onfocus="this.value=''"
            @change="handleAmountInput"
          >

          <BaseSelectCM
            name="SyCm"
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
          <p>{{ getSelectedToken.balance }} {{ getSelectedToken.symbol }}</p>
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
        <div
          v-for="(item, index) in transfersHistory"
          :key="index"
          style="background-color: #F3F5FA;height: 60px;width: 100%;display: grid;grid-template-columns: 1fr 1fr 1fr;align-items: center;padding-left: 10px;padding-right: 10px;justify-items: start"
          class="mt-2"
        >
          <p>{{ index }}-{{ item.event }}--{{ item.blockNumber }}</p>
          <p>{{ item.to }}</p>
          <div style="justify-self: end">
            <div
              v-for="(cryptoData, i) in getAllCryptoSymbols"
              :key="i"
            >
              <p v-if="cryptoData.token === item.token">
                {{ fromBigNumber(item.value, cryptoData.decimal) }} {{ cryptoData.symbol }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
import BigNumber from 'bignumber.js';
import {
  getAllowanceWeb3, setApproveWeb4, setTransferweb4,
} from '~/utils/web3';

export default {
  data() {
    return {
      showModal: false,
      textHeader: '',
      textBody: '',
      textFooter: '',
      amount: '0.0',
    };
  },
  computed: {
    ...mapGetters({
      getAllCryptoSymbols: 'wallet/getAllCryptoSymbols',
      IsWeb3Initialized: 'wallet/getIsWeb3Initialized',
      getSelectedToken: 'wallet/getSelectedToken',
      getUserAddress: 'wallet/getUserAddress',
      getAllowance: 'wallet/getAllowance',
      getRecipient: 'wallet/getRecipient',
      getAmount: 'wallet/getAmount',
      modalErr: 'wallet/getModalErr',
      transfersHistory: 'wallet/getTransfersHistory',
    }),
  },
  mounted() {
    // this.setAllCryptoSymbols();
    console.log(this.getAllCryptoSymbols);
  },
  methods: {
    ...mapActions({
      setWeb3Initialized: 'wallet/setWeb3Initialized',
      setSelectedToken: 'wallet/setSelectedToken',
      setAmount: 'wallet/setAmount',
      setRecipient: 'wallet/setRecipient',
      setAllowance: 'wallet/setAllowance',
      setLoading: 'loader/setLoading',
      setTransfer: 'wallet/setTransfer',
      setApprove: 'wallet/setApprove',
      setHistory: 'wallet/setTransferHistory',
    }),
    fromBigNumber(value, decimal) {
      return new BigNumber(value).shiftedBy(-decimal).toString();
    },
    async handleGetAllowance() {
      try {
        if (this.IsWeb3Initialized) {
          this.setLoading(true);
          const allowance = await getAllowanceWeb3(this.getSelectedToken.token, this.getRecipient);
          // await this.setAllowance(allowance);
          console.log(allowance, 'Allowance');
          if (allowance) {
            this.setLoading(false);
            this.setAllowance(allowance);
          }
        } else {
          this.setLoading(false);
          this.showModal = true;
          this.textBody = 'Error';
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleTransfer() {
      this.setLoading(true);
      console.log(this.getAmount, this.getSelectedToken.decimal, this.getRecipient, 'handletr');
      const transfer = await setTransferweb4(this.getSelectedToken.token, this.getAmount, this.getSelectedToken.decimal, this.getRecipient);
      if (transfer) {
        this.setLoading(false);
        this.showModal = true;
        this.textHeader = 'Succes';
        this.textBody = 'Successful operation';
      } else {
        this.setLoading(false);
        this.showModal = true;
        this.textHeader = 'Error';
        this.textBody = 'Failed operation';
      }
    },
    async handleApprove() {
      this.setLoading(true);
      console.log(this.getSelectedToken, this.getAmount, this.decimal, this.getRecipient, 'handlApprove');
      const transfer = await setApproveWeb4(this.getSelectedToken.token, this.getAmount, this.getSelectedToken.decimal, this.getRecipient);
      if (transfer) {
        this.setLoading(false);
        this.showModal = true;
        this.textHeader = 'Succes';
        this.textBody = 'Successful operation';
      } else {
        this.setLoading(false);
        this.showModal = true;
        this.textHeader = 'Error';
        this.textBody = 'Failed operation';
      }
    },
    handleAmountInput() {
      this.setAmount(this.amount);
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
  .input__amount{
    background-color: #F3F5FA;
    height: 70px;
    width: 80%;
    font-family: Roboto;
    font-weight: 400;
    font-size: 18px;
    text-indent: 10px;
    border: 1px;
  }
}
</style>
