<template>
  <div class="example">
    <modal-notification
      v-if="showModal"
      :text-header="textHeader"
      :text-body="textBody"
      :text-footer="textFooter"
      @close="showModal = false"
    />
    <modal-notification
      v-if="modalErr"
      text-header="Error"
      :text-body="modalErr"
      @close="showModal = false"
    />
    <div class="example__content">
      <div class="example__title" />
      <div>
        <label>{{ $t("amount") }}:</label>
        <div class="flex flex--space mb-60">
          <input
            v-model="amount"
            class="input__amount"
            type="number"
            onfocus="this.value=''"
            @change="handleAmountInput"
          >

          <select-symbol-crypto-money
            name="SymbolCryptoMoney"
          />
        </div>
        <label>{{ $t("address") }}:</label>
        <base-input
          class="mr-32"
          input-type="text"
          input-name="address"
          :method="setRecipient"
          :required="true"
        />
        <div class="flex mt-32">
          <span class="mr-12">
            <p class="mr-12">
              {{ $t("balance") }}:
            </p>
          </span>
          <p>{{ getSelectedToken.balance }} {{ getSelectedToken.symbol }}</p>
        </div>
        <div class="flex mt-32">
          <p class="mr-12">
            {{ $t("yourAllowance") }}: {{ readBigNumber(getAllowance,getSelectedToken.decimal) }}
          </p>
        </div>
        <div class="flex mt-16">
          <button
            type="submit"
            class="base-btn layout__btn-style mt-8 mr-32"
            @click="handleGetAllowance"
          >
            {{ $t("allowance") }}
          </button>
          <button
            class="base-btn layout__btn-style mt-8 mr-32"
            @click="handleApprove"
          >
            {{ $t("approval") }}
          </button>
          <button
            class="base-btn mt-8 layout__btn-style "
            @click="handleTransfer"
          >
            {{ $t("transfer") }}
          </button>
        </div>
        <div class="mt-32 mb-8">
          <h1> {{ $t("yourTransactions") }} </h1>
        </div>
        <div
          v-for="(element, index) in transfersHistory"
          :key="index"
          class="container__transaction mt-2"
        >
          <p>{{ index }}-{{ element.event }}--{{ element.blockNumber }}</p>
          <p v-if="element.to.toLowerCase() === getUserAddress.toLowerCase()">
            {{ element.from }}
          </p>
          <p v-else>
            {{ element.to }}
          </p>
          <div style="justify-self: end">
            <p>
              <span v-if="element.to.toLowerCase() === getUserAddress.toLowerCase()">+</span>
              {{ readBigNumber(element.value, getTokenData(element.token).decimal) }} {{ getTokenData(element.token).symbol }}
            </p>
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
  getAllowanceWeb3, sendTransferWeb4, sendApproveWeb4,
} from '~/utils/web3';
import ModalNotification from '~/components/ModalNotification';
import SelectSymbolCryptoMoney from '~/components/SelectSymbolCryptoMoney';
import BaseInput from '~/components/BaseInput';

export default {
  components: { BaseInput, SelectSymbolCryptoMoney, ModalNotification },
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
      getAllTokensData: 'wallet/getAllTokensData',
      IsWeb3Initialized: 'wallet/IsWeb3Initialized',
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
  },
  methods: {
    ...mapActions({
      initializeWeb3: 'wallet/initializeWeb3',
      setSelectedToken: 'wallet/setSelectedToken',
      setAmount: 'wallet/setAmount',
      setRecipient: 'wallet/setRecipient',
      setAllowance: 'wallet/setAllowance',
      setLoading: 'loader/setLoading',
    }),
    readBigNumber(value, decimal) {
      if (value && decimal) return new BigNumber(value).shiftedBy(-decimal).toString();
      return '-';
    },
    getTokenData(token) {
      return this.getAllTokensData.find((a) => a.token === token);
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
      const transfer = await sendTransferWeb4(this.getSelectedToken.token, this.getAmount, this.getSelectedToken.decimal, this.getRecipient);
      if (transfer) {
        this.setLoading(false);
        this.showModal = true;
        this.textHeader = 'Success';
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
      const transfer = await sendApproveWeb4(this.getSelectedToken.token, this.getAmount, this.getSelectedToken.decimal, this.getRecipient);
      if (transfer) {
        this.setLoading(false);
        this.showModal = true;
        this.textHeader = 'Success';
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
  background: var(--bg);
  &__content {
    height: 300px;
  }
  &__title {
    font-size: 60px;
  }
  .layout__btn-style{
    background-color: var(--color-primary-btn);
    height:50px ;
    width:187px ;
    color: white;
  }
  .input__amount{
    background-color: var(--color-primary-input);
    color: var(--color);
    height: 70px;
    width: 80%;
    font-family: Roboto;
    font-weight: 400;
    font-size: 18px;
    text-indent: 10px;
    border: 1px;
  }
  .container__transaction {
    background-color: var(--color-primary-input);
    height: 60px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    justify-items: start;
  }
}
</style>
