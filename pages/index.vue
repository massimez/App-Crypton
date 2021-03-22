<template>
  <div>
    <button @click="openTestModal()">
      modal
    </button>
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
