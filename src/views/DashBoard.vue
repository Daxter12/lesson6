<template>
  <div id="app">
    <header>
      <div class="title">My personal costs</div>
      <!-- <div class="goToDetailAbout" @click="goToDetailAbout"></div> -->
    </header>

    <main>
      TOTAL: {{ getFullPaymentValue }}
      <br />
      <button @click="onShowModal">ShowModal</button>
      <hr />
      <payments-display :items="currentElements" />
      <pagination
        :length="paymentsList.length"
        :cur="curPage"
        :n="n"
        @paginate="onChangePage"
      />
    </main>
  </div>
</template>

<script>
  // import AddPaymentForm from "../components/AddPaymentForm.vue";
  // import PaymentsDisplay from "../components/PaymentsDisplay.vue";
  // import MyPages from "../components/MyPages.vue";
  import { mapActions, mapGetters } from "vuex";

  // import { mapMutations, mapActions, mapGetters } from "vuex";

  export default {
    name: "App",
    components: {
      PaymentsDisplay: () => import("../components/PaymentsDisplay.vue"),
      Pagination: () => import("../components/Pagination.vue"),
    },
    data() {
      return {
        curPage: 1,
        n: 10,
        show: false,
      };
    },
    computed: {
      ...mapGetters(["getFullPaymentValue"]),

      paymentsList() {
        return this.$store.getters.getPaymentList;
      },

      currentElements() {
        return this.paymentsList.slice(
          this.n * (this.curPage - 1),
          this.n * (this.curPage - 1) + this.n
        );
        // return this.paymentsList.slice(3 * (this.curPage - 1), 3 * (this.curPage - 1) + 3)
      },

      // paymentsListPage() {
      //   let start = (this.pageNum - 1) * this.strMax;
      //   let end = start + this.strMax;
      //   return this.$store.getters.getPaymentsList.slice(start, end);
      // },
    },
    methods: {
      // ...mapMutations({
      //   myMutation: "setPaymentsListData",
      // }),
      ...mapActions(["presetData"]),
      add(data) {
        this.$store.commit("addDataToPaymentsList", data);
        // this.paymentsList = [...this.paymentsList, data];
      },

      onShowModal() {
        this.$modal.show("AddPaymentForm", {
          header: "Add payment form",
          content: "AddPaymentForm",
        });
      },

      onChangePage(page) {
        this.curPage = page;
      },
    },
    created() {
      const { page } = this.$route.params;
      if (page) {
        this.curPage = Number(page);
      }
    },
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
