import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: { repositorios: [] },
  mutations: {
    loadRepositorios(state, payload) {
      state.repositorios = payload;
    }
  },
  actions: {
    loadRepo(context) {
      axios.get("https://api.github.com/users/laravel/repos").then(resposta => {

        let reverso = resposta.reverse();
        context.commit("loadRepositorios", reverso);
      });
    }
  },
  getters: { repos: state => state.repositorios }
});
