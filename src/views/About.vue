<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="onShowModalAuth">Auth</button>
    <router-link
      :to="{
        name: 'addpaymentForm',
        params: { category: 'Sport' },
        query: { value: '500' },
      }"
      >Sport 500</router-link
    >
  </div>
</template>
<script>
  export default {
    name: "About",
    data() {
      return {
        modalShow: true,
        settings: {
          header: "Auth Form",
          content: "Auth",
        },
      };
    },
    methods: {
      onShowModalAuth() {
        this.$modal.show("Auth", this.settings);
      },
    },
  };
</script>
