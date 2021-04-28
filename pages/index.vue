<template>
  <div>
    <base-btn @click="openTestModal()">
      modal default
    </base-btn>
    <base-btn @click="openTestModalStatus()">
      modal status
    </base-btn>
  </div>
</template>
<script>

import modals from '~/store/modals/modals';

export default {
  methods: {
    openTestModal() {
      this.ShowModal({
        text: 'test',
      });
    },
    openTestModalStatus() {
      this.ShowModal({
        text: 'test',
        title: 'error',
        key: modals.status,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
