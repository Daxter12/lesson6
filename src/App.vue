<template>
  <div id="app">
    <div id="nav">
      <router-link to="/dashboard">DashBoard</router-link> /
      <router-link to="/about">About</router-link>
    </div>
    <div class="main">
      <router-view />
    </div>
    <transition name="fade">
      <modal-window :settings="settings" v-if="modalWindowName" />
    </transition>

    <!-- <dash-board v-if="false" />
    <about v-if="false" /> -->

    <!-- <dash-board v-if="page === 'dashboard'" />
    <about v-if="page === 'about'" /> -->
  </div>
</template>

<script>
  export default {
    components: {
      ModalWindow: () =>
        import(/* webpackChunkName: 'Modal' */ "./components/ModalWindow.vue"),
    },
    name: "App",
    data() {
      return {
        modalWindowName: "",
        settings: {},
      };
    },
    methods: {
      onShown(settings) {
        this.modalWindowName = settings.name;
        this.settings = settings;
      },
      onHide() {
        this.modalWindowName = "";
        this.settings = {};
      },
    },
    created() {
      this.$store.dispatch("fetchData");
    },
    mounted() {
      console.log(2);
      this.$modal.EventBus.$on("show", this.onShown);
      this.$modal.EventBus.$on("hide", this.onHide);
    },
    beforeDestroy() {
      this.$modal.EventBus.$off("show", this.onShown);
      this.$modal.EventBus.$off("hide", this.onHide);
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
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
