import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const localDB = {
  page1: [
    { id: 1, date: "20.03.2020", category: "Food", value: 169 },
    { id: 2, date: "21.03.2020", category: "Navigation", value: 50 },
    { id: 3, date: "22.03.2020", category: "Sport", value: 450 },
  ],
  page2: [
    { id: 4, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 5, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 6, date: "25.03.2020", category: "Food", value: 200 },
  ],
  page3: [
    { id: 7, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 8, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 9, date: "25.03.2020", category: "Food", value: 200 },
  ],
  page4: [
    { id: 10, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 11, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 12, date: "25.03.2020", category: "Food", value: 200 },
  ],
};

export default new Vuex.Store({
  state: {
    paymentsList: [],
    // paymentListIDS: [],
    categoryList: [],
  },
  mutations: {
    setPamentsListData(state, payload) {
      state.paymentsList = payload;
      // const newUniqObjs = payload.filter(obj=>{
      //   return state.paymentListIDS.indexOf(obj.id) < 0
      // })

      // const uniqIds = newUniqObjs.map(obj=>obj.id)

      // state.paymentListIDS.push(...uniqIds)
      // state.paymentsList.push(...newUniqObjs)
    },
    addDataToPaymentsList(state, data) {
      state.paymentsList.push(data);
    },
    setCategories(state, payload) {
      state.categoryList = payload;
    },
    // editFirstPyamentItem(state, payload){
    //   Vue.set(state.paymentsList,0, payload)
    //   // state.paymentsList[0] = payload
    //   // state.paymentsList = [...state.paymentsList]
    // }
  },
  actions: {
    // fetchData({commit}, page){
    //   return new Promise((resolve)=>{
    //     setTimeout(()=>{
    //       const items = localDB[`page${page}`]
    //       resolve(items)
    //     }, 1000)
    //   })
    //   .then(res=> commit('setPamentsListData', res))
    // },
    fetchData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = [];
          for (let i = 1; i < 101; i++) {
            items.push({
              date: Date.now(),
              category: "Food",
              id: i,
              value: i,
            });
          }
          resolve(items);
        }, 1500);
      }).then((res) => {
        commit("setPamentsListData", res);
      });
    },
    loadCategories({ commit }) {
      return new Promise((resolve) => {
        // имитируем работу с сетью
        setTimeout(() => {
          resolve(["Food", "Transport", "Education", "Entertainment", "Sport"]);
        }, 1000);
      }).then((res) => {
        // запускаем изменение состояния через commit
        commit("setCategories", res);
      });
    },

    // someAction({commit}, payload){
    //   //.....
    //   commit('', payload)
    // }
  },
  getters: {
    getPaymentList: (state) => state.paymentsList,
    getFullPaymentValue: (state) => {
      return state.paymentsList.reduce((acc, cur) => acc + cur.value, 0);
    },
    getCategoryList: (state) => state.categoryList,
  },
});
