import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/DashBoard.vue"),
  },
  {
    path: "/dashboard/:page",
    name: "DashboardPage",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/DashBoard.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/add/payment/:category",
    name: "addpaymentForm",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Home" */ "../components/AddPaymentForm.vue"),
  },
  {
    path: "/404",
    name: "Page404",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Page404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const userAuthExists = true;

const getTitleByRouteName = (routeName) => {
  return {
    dashboard: "Take a look on your payments and add more!",
    About: "Anything about our awesome application!",
    Page404: "Oops! Seems like we lost this page :(",
  }[routeName];
};

router.beforeEach((to, from, next) => {
  if (to.name !== "Page404" && !userAuthExists) {
    next({
      name: "Page404",
    });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = getTitleByRouteName(to.name);
});

export default router;
