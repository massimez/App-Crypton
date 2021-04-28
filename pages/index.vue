<template>
  <div>
    <button @click="openTestModal()">
      modal
    </button>
    <base-btn>Base btn</base-btn>
  </div>
</template>
<script>

export default {
  methods: {
    openTestModal() {
      this.ShowModal({
        text: 'test',
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
