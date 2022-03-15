<template>
  <div class="wrapper">
    <input placeholder="Value" v-model.number="value" />
    <div class="select">
      <select v-model="category">
        <option v-for="(option, idx) in options" :key="idx">
          {{ option }}
        </option>
      </select>
    </div>
    <input placeholder="Date" v-model="date" />
    <button @click="onSaveClick">Save</button>
  </div>
</template>

<script>
  export default {
    name: "AddPaymentForm",
    data() {
      return {
        value: 0,
        category: "",
        date: "",
      };
    },
    computed: {
      getCurrentDate() {
        const today = new Date();
        const d = today.getDate();
        const m = today.getMonth() + 1;
        const y = today.getFullYear();
        return `${d}.${m}.${y}`;
      },
      options() {
        return this.$store.getters.getCategoryList;
      },
    },
    methods: {
      onSaveClick() {
        const data = {
          id: Date.now(),
          value: this.value,
          category: this.category,
          date: this.date || this.getCurrentDate,
        };
        this.$emit("addPayment", data);
      },
    },
    async created() {
      if (!this.options.length) {
        await this.$store.dispatch("loadCategories");
        this.category = this.options[0];
      }
    },
    mounted() {
      if (this.$route.params.category) {
        this.category = this.$route.params.category;
      }
      if (this.$route.query.value) {
        this.value = this.$route.query.value;
      }

      if (this.value && this.category) {
        this.date = Date.now();
        this.onSaveClick();
      }
    },
  };
</script>

<style lang="scss" module></style>
