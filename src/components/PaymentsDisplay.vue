<template>
  <div class="wrapper">
    <div class="item" v-for="item in items" :key="item.id">
      {{ item.id }} - {{ item }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "PaymentsDisplay",
    props: {
      items: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style lang="scss" module></style>
